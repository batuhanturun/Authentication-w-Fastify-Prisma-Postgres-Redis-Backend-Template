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
            let random = Math.floor(Math.random() * 90000) + 10000;
            let dbRandom = await bcrypt.hash(random.toString(), 10);
            const verifyCode = await prisma.verify_account.create({
                data: {
                    userID: newUser.id,
                    verifyCode: dbRandom
                }
            })

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
                subject: 'Account Verification',
                text: 'Hello ' + newUser.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + newUser.email + '\/' + verifyCode.verifyCode + '\n\nThank You!\n'
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Mail Gönderildi : ' + data.response);
                }
            });
            reply.send({ state: true });
        } else {
            throw createError(401, "Sistemde bu E-Mail adresine kayıtlı kullanıcı bulunmaktadır.");
        }
    } catch (error) {
        throw createError(400, "Kullanıcı kayıt olurken bir hata oluştu. " + error);
    }
}

const patchVerificationUser = async (req, reply) => {
    try {

        const verifyCode = await prisma.verify_account.findFirst({
            where: { verifyCode: req.params.verifyCode }
        })
        if (!verifyCode) {
            throw createError(400, "Your verification link may have expired. " + error);
        } else {
            const user = await prisma.users.findFirst({
                where: { email: req.params.email }
            });
            if (!user) {
                throw createError(400, "We were unable to find a user for this verification. " + error);
            } else if (user.isVerified) {
                throw createError(400, "User has been already verified. " + error);
            } else {
                const updateUser = await prisma.users.update({
                    where: { email: user.email },
                    data: { isVerified: true }
                })
            }
        }
    } catch (error) {
        throw createError(400, "Bir hata oluştu. " + error);
    }
}

const postResendVerificationMail = async (req, reply) => { 
    try {
        let { email } = req.body;
        const user = await prisma.users.findFirst({
            where: { email }
        });
        if (!user) {
            throw createError(400, "Bu posta adresine kayıtlı kullanıcı bulunamadı! " + error);
        } else if (user.isVerified) {
            throw createError(400, "This account has been already verified. " + error);
        } else {
            let random = Math.floor(Math.random() * 90000) + 10000;
            let dbRandom = await bcrypt.hash(random.toString(), 10);
            const reset = await prisma.verify_account.update({
                where: { userID: user.id },
                data: { verifyCode: dbRandom }
            });
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
                subject: 'Account Verification',
                text: 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + reset.verifyCode + '\n\nThank You!\n'
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Mail Gönderildi : ' + data.response);
                }
            });
            reply.send({ state: true });
        }
    } catch (error) {
        throw createError(400, "Bir hata oluştu. " + error);
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
                throw createError(401, "Lütfen E-Mail adresinize gönderdiğimiz bağlantıdan hesabınızı onaylayın!");
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

            const check = await prisma.reset_password.findFirst({
                where: { userID: reset.id }
            });

            if (!check) {
                const change = await prisma.reset_password.create({
                    data: {
                        userID: reset.id,
                        resetCode: dbRandom,
                    }
                });
            } else {
                const reChange = await prisma.reset_password.updateMany({
                    where: { userID: reset.id },
                    data: {
                        resetCode: dbRandom,
                        isActive: true,
                        isUsed: false
                    }
                })
            }

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
            reply.send({ state: true });
        }
    } catch (error) {
        throw createError(400, "Şifre sıfırlanırken hata oluştu. " + error);
    }
}

const patchChangePassword = async (req, reply) => {
    try {
        let { email, resetCode, password, verifyPassword } = req.body;
        if (password !== verifyPassword) {
            throw createError(401, "Şifreler eşleşmemektedir. ");
        } else {
            const user = await prisma.users.findFirst({
                where: { email }
            });
            const change = await prisma.reset_password.findFirst({
                where: { userID: user.id }
            });
            let result = await bcrypt.compare(resetCode, change.resetCode);
            if (result && user.id === change.userID && !change.isUsed && change.isActive) {
                const updateUser = await prisma.users.update({
                    where: { email },
                    data: { password: await bcrypt.hash(password, 10) }
                })
                const updateCode = await prisma.reset_password.updateMany({
                    where: { userID: user.id, resetCode: change.resetCode },
                    data: { isActive: false, isUsed: true }
                })
                reply.send({ state: true });
            } else {
                throw createError(400, "Kod geçerliliğini kaybetmiştir.");
            }
        }
    } catch (error) {
        throw createError(400, "Şifre değiştirilirken hata oluştu. " + error);
    }
}

const patchChangePassword2 = async (req, reply) => {  // ileride password reset için link gönderildiğinde kullanılacak. Şimdilik deneme.
    try {
        let { password, verifyPassword } = req.body;
        let resetCode = req.params.resetCode;
        if (!resetCode) {
            throw createError(400, "resetCode'da hata oluştu! " + error);
        } else {
            if (password !== verifyPassword) {
                throw createError(401, "Şifreler eşleşmemektedir. ");
            } else {
                const user = await prisma.users.findFirst({
                    where: { email: req.params.email }
                });
                const change = await prisma.reset_password.findFirst({
                    where: { userID: user.id }
                });
                let result = await bcrypt.compare(resetCode, change.resetCode);
                if (result && user.id === change.userID && !change.isUsed && change.isActive) {
                    const updateUser = await prisma.users.update({
                        where: { email: user.email },
                        data: { password: await bcrypt.hash(password, 10) }
                    })
                    const updateCode = await prisma.reset_password.updateMany({
                        where: { userID: user.id, resetCode: change.resetCode },
                        data: { isActive: false, isUsed: true }
                    })
                    reply.send({ state: true });
                } else {
                    throw createError(400, "Şifre sıfırlanırken hata oluştu. " + error);
                }
            }
        }
    } catch (error) {
        throw createError(400, "Şifre değiştirilirken hata oluştu. " + error);
    }
}

const postVerifyAccount = async (req, reply) => {
    try {
        let { verifyCode } = req.params;
        const verify = await prisma.verify_account.findFirst({
            where: { verifyCode }
        });
        const user = await prisma.users.findFirst({
            where: { id: verify.userID }
        });
        let email = user.email;
        if (!verify) {
            throw createError(401, "We were unable to find a user for this verification. Please Register! " + error);
        } else if (verify.isUsed || user.isVerified) {
            throw createError(401, "User has been already verified. Please Login! " + error);
        } else if (!verify.isActive) {
            throw createError(401, "Link geçerliliğini kaybetmiştir. " + error);
        } else {
            const updateUser = await prisma.users.update({
                where: { id: verify.userID },
                data: { isVerified: true }
            });
            const updateVerify = await prisma.verify_account.update({
                where: { verifyCode },
                data: { isUsed: true, isActive: false }
            });
            reply.send({ state: true });
        }
    } catch (error) {
        throw createError(400, "Onaylama işleminde bir hata oluştu. " + error);
    }
}

module.exports = {
    home,
    getLogin,
    logOut,
    patchChangePassword,
    patchVerificationUser,
    postLogin,
    postRegister,
    postResetPassword,
    postVerifyAccount,
    postResendVerificationMail
}