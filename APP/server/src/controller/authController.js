const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config({ path: "./.env" });
const nodemailer = require('nodemailer');
const createError = require("http-errors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const home = async (req, reply) => {
    try {
        reply.type('text/html');
        if (req.session.authenticated) {
            reply.send({ state: true })
        } else {
            reply.send({ state: false })
        }
    } catch (error) {
        throw createError(400, "Error : " + error);
    }
}

const postRegister = async (req, reply) => {
    try {
        let { name, email, password } = req.body;
        const user = await prisma.users.findFirst({
            where: { email }
        });
        if (!user) {
            const newUser = await prisma.users.create({
                data: {
                    name,
                    email,
                    password: await bcrypt.hash(password, 10)
                }
            });
            reply.send({ state: true });
            //email bağlantısı gönderilecek.
        } else {
            throw createError(401, "Sistemde bu E-Mail adresine kayıtlı kullanıcı bulunmaktadır.");
        }
    } catch (error) {
        throw createError(400, "Kullanıcı kayıt olurken bir hata oluştu. " + error);
    }
}

const getLogin = async (req, reply) => {
    try {
        if (req.session.authenticated) {
            reply.send({ state: true, name: req.session.user.name });
        }
    } catch (error) {
        throw createError(400, "Bir hata oluştu. " + error);
    }

}

const postLogin = async (req, reply) => {
    try {
        let { email, password } = req.body;
        const user = await prisma.users.findFirst({
            where: { email }
        });
        let result = await bcrypt.compare(password, user.password)
        if (!user) {
            throw createError(401, "Şifre veya E-Posta hatalı.");
        }
        if (!result) {
            throw createError(401, "Şifre veya E-Posta hatalı.");
        } else {
            if (user.isVerified !== true) {
                throw createError(401, "Lütfen E-Mail adresinize gönderdiğimiz bağlantıdan hesabınızı onaylayın! ( Daha Aktif Değil :D )");
            } else {
                req.session.authenticated = true;
                req.session.user = user;
                reply.send({ state: true, name: user.name });
            }
        }
    } catch (error) {
        throw createError(401, "Kullanıcı giriş yaparken hata oluştu. " + error);
    }
}

const logOut = async (req, reply) => {
    try {
        req.session.authenticated = false;
        await req.session.destroy();
        reply.send({ state: true });
    } catch (error) {
        throw createError(400, "Kullanıcı çıkış yaparken hata oluştu. " + error);
    }
}

const postResetPassword = async (req, reply) => {
    try {
        let { email } = req.body;
        const reset = await prisma.users.findFirst({
            where: { email }
        });
        if (!reset) {
            throw createError(401, "Bu E-Mail'e kayıtlı kullanıcı bulunamadı.");
        } else {
            let random = Math.floor(Math.random() * 90000) + 10000;
            let dbRandom = await bcrypt.hash(random.toString(), 10);

            const change = await prisma.reset_password.create({
                data: {
                    userID: reset.id,
                    resetCode: dbRandom,
                }
            });
            reply.send({ state: true }); //!

            let transporter = nodemailer.createTransport({
                service: process.env.NODEMAILER_SERVICE,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS
                }
            });

            let mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: 'Password Reset',
                html: `<h1>Reset Code: ${random}</h1>`
            };

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Mail Gönderildi : ' + data.response);
                }
            });
        }
    } catch (error) {
        throw createError(400, "Şifre sıfırlanırken hata oluştu. " + error);
    }
}

const patchChangePassword = async (req, reply) => {
    try {
        let { email, resetCode, password, verfyPassword } = req.body;
        if (password !== verfyPassword) {
            throw createError(401, "Şifreler eşleşmemektedir. ");
        } else {
            const user = await prisma.users.findFirst({
                where: { email }
            });
            const change = await prisma.reset_password.findFirst({
                where: { userID: user.id }
            });
            let result = await bcrypt.compare(resetCode, change.resetCode);
            if (!result && user.id !== change.userID && change.isUsed === false && change.isActive === true) {
                throw createError(400, "Şifre sıfırlanırken hata oluştu. " + error);
            } else {
                const updateUser = await prisma.users.update({
                    where: { email },
                    data: { password: await bcrypt.hash(password, 10) }
                })
                const updateCode = await prisma.reset_password.updateMany({
                    where: { userID: user.id, resetCode: change.resetCode },
                    data: { isActive: false, isUsed: true }
                })
                reply.send({ state: true });
            }
        }
    } catch (error) {
        throw createError(400, "Şifre değiştirilirken hata oluştu. " + error);
    }
}

module.exports = {
    getLogin,
    postLogin,
    postRegister,
    postResetPassword,
    home,
    patchChangePassword,
    logOut
}