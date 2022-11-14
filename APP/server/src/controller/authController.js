const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config({ path: "./.env" });
const nodemailer = require('nodemailer');
const createError = require("http-errors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const home = async (req, reply) => {
    try {
        reply.type('text/html');
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
            return newUser;
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
            req.session.authenticated = true;
            req.session.user = user;
            reply.send({ state: true, name: user.name });
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
        next();
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

            let random = Math.floor(Math.random() * 10000);
            let dbRandom = bcrypt.hash(random, 10);

            let transporter = nodemailer.createTransport({
                service: process.env.NODEMAILER_SERVICE,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS
                }
            });

            let mailOptions = {
                from: transporter.auth.user,
                to: email,
                subject: 'Password Reset',
                html: `<h1>Reset Code: ${random}</h1>`
            };

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Mail Gönderildi');
                }
            });
        }
    } catch (error) {
        throw createError(400, "Şifre sıfırlanırken hata oluştu. " + error);
    }
}

const postChangePassword = async (req, reply) => {
    try {
        
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
    postChangePassword,
    logOut
}