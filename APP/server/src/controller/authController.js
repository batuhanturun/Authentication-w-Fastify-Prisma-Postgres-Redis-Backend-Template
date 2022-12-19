const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sendMail = require("../utils/sendMail");
const host = "localhost:3000";

//! session veya jwt geçerken reply.send'leri düzeltmeyi unutma.
//! Verification'a 2 defa gidiliyor, hata veriyor.
//! Error mesajlarını timer ile göster, timer bitince yönlendir.
//! Client App.js'deki user ve admin parametrelerindeki bağımlılığı kaldır. Her sayfa için useEffect dön.

const home = async (req, reply) => {
    try {
        if (req.session.authenticated) {
            reply.send({ state: true });
        } else {
            reply.send({ state: false })
        }
    } catch (error) {
        throw createError(400, "Error : " + error);
    }
}

const admin = async (req, reply) => {
    try {
        if (req.session.authenticated && req.session.isAdmin) {
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
            let random = Math.floor(Math.random() * 90000) + 10000;
            let sendLink = CryptoJS.SHA256(random.toString()).toString();
            let dbSave = CryptoJS.SHA256(sendLink.toString()).toString();

            const newUser = await prisma.users.create({
                data: {
                    name,
                    email,
                    password: await bcrypt.hash(password, 10)
                }
            });
            const verifyCode = await prisma.verify_account.create({
                data: {
                    userID: newUser.id,
                    verifyCode: dbSave
                }
            });
            let url = 'Hello ' + newUser.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/verify\/' + newUser.id + '\/' + sendLink + '\n\nThank You!\n';
            await sendMail(email, "Verify Email", url);
            if (sendMail) {
                reply.send({ state: true });
            } else {
                console.log("Hata oluştu!");
            }
        } else {
            throw createError(401, "Sistemde bu E-Mail adresine kayıtlı kullanıcı bulunmaktadır.");
        }
    } catch (error) {
        throw createError(400, "Kullanıcı kayıt olurken bir hata oluştu. " + error);
    }
}

const patchVerificationUser = async (req, reply) => {
    try {
        let encrypt = req.params.verifyCode;
        let verifyCode = CryptoJS.SHA256(encrypt.toString()).toString();

        let id = req.params.id;
        const checkCode = await prisma.verify_account.findFirst({
            where: { verifyCode: verifyCode }
        });
        if (!checkCode) {
            throw createError(400, "Your verification link may have expired.");
        } else {
            const user = await prisma.users.findFirst({
                where: { id: parseInt(id) }
            });
            if (!user) {
                throw createError(400, "We were unable to find a user for this verification.");
            } else if (user.isVerified) {
                throw createError(400, "User has been already verified.");
            } else {
                const updateUser = await prisma.users.update({
                    where: { id: user.id },
                    data: { isVerified: true }
                })
                reply.send({ state: true });
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
            throw createError(400, "User not found.");
        } else if (user.isVerified === true) {
            throw createError(400, "This account has been already verified.");
        } else {
            let random = Math.floor(Math.random() * 90000) + 10000;
            let sendLink = CryptoJS.SHA256(random.toString()).toString();
            let dbSave = CryptoJS.SHA256(sendLink.toString()).toString();

            const find = await prisma.verify_account.findFirst({
                where: { userID: user.id }
            });
            const reset = await prisma.verify_account.updateMany({
                where: { userID: find.id },
                data: {
                    verifyCode: dbSave,
                    isActive: true,
                    isUsed: false
                }
            });
            let url = 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/verify\/' + user.id + '\/' + sendLink + '\n\nThank You!\n';
            sendMail(email, "Verify Email", url)
            if (sendMail) {
                reply.send({ state: true });
            } else {
                console.log("Error!");
            }
        }
    } catch (error) {
        throw createError(400, "Error: " + error);
    }
}

const getLogin = async (req, reply) => {
    try {
        if (req.session.authenticated) {
            reply.send({ state: true, name: req.session.user.name });
        } else {
            reply.send({ state: false });
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
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    isVerified: user.isVerified,
                    isAdmin: user.isAdmin,
                },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30d"
                    }
                );
                req.session.authenticated = true;
                req.session.user = user;
                reply.send({ state: true, authenticated: true, token: token });
            }
        }
    } catch (error) {
        throw createError(401, "Kullanıcı giriş yaparken hata oluştu. " + error);
    }
}

const getAdminLogin = async (req, reply) => {
    try {
        if (req.session.authenticated && req.session.isAdmin) {
            reply.send({ state: true, name: req.session.user.name, isAdmin: req.session.user.isAdmin });
        } else {
            reply.send({ state: false });
        }
    } catch (error) {
        throw createError(400, "Bir hata oluştu. " + error);
    }
}

const postAdminLogin = async (req, reply) => {
    try {
        let { email, password } = req.body;
        const admin = await prisma.users.findFirst({
            where: { email }
        });
        let result = await bcrypt.compare(password, admin.password);
        if (!admin) {
            throw createError(401, "Şifre veya E-Posta hatalı.");
        } else if (!result) {
            throw createError(401, "Şifre veya E-Posta hatalı.");
        } else if (!admin.isAdmin) {
            throw createError(401, "Şifre veya E-Posta hatalı.");
        } else {
            req.session.authenticated = true;
            req.session.user = admin;
            req.session.isAdmin = true;
            reply.send({ state: true, name: admin.name, isAdmin: true });
        }
    } catch (error) {
        throw createError(401, "Kullanıcı giriş yaparken hata oluştu. " + error);
    }
}

const logOut = async (req, reply) => {
    try {
        req.session.authenticated = false;
        await req.session.destroy();
        reply.send({ logout: true });
    } catch (error) {
        throw createError(400, "Kullanıcı çıkış yaparken hata oluştu. " + error);
    }
}

const adminLogOut = async (req, reply) => {
    try {
        req.session.authenticated = false;
        req.session.isAdmin = false;
        await req.session.destroy();
        reply.send({ logout: true });
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
            let sendLink = CryptoJS.SHA256(random.toString()).toString();
            let dbSave = CryptoJS.SHA256(sendLink.toString()).toString();

            const check = await prisma.reset_password.findFirst({
                where: { userID: reset.id }
            });

            if (!check) {
                const change = await prisma.reset_password.create({
                    data: {
                        userID: reset.id,
                        resetCode: dbSave,
                    }
                });
            } else {
                const reChange = await prisma.reset_password.updateMany({
                    where: { userID: reset.id },
                    data: {
                        resetCode: dbSave,
                        isActive: true,
                        isUsed: false
                    }
                });
            }
            let url = 'Hello ' + reset.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/reset\/' + reset.id + '\/' + sendLink + '\n\nThank You!\n';
            sendMail(email, "Reset Password", url)
            if (sendMail) {
                reply.send({ state: true });
            } else {
                console.log("Hata oluştu!");
            }
        }
    } catch (error) {
        throw createError(400, "Şifre sıfırlanırken hata oluştu. " + error);
    }
}

const patchResetPassword = async (req, reply) => {
    try {
        let encrypt = req.params.resetCode;
        let resetCode = CryptoJS.SHA256(encrypt.toString()).toString();
        let id = parseInt(req.params.id);
        let { password, verifyPassword } = req.body;
        if (password !== verifyPassword) {
            throw createError(401, "Şifreler eşleşmemektedir.");
        } else {
            const change = await prisma.reset_password.findFirst({
                where: { resetCode: resetCode, userID: id }
            });
            const user = await prisma.users.findFirst({
                where: { id: change.userID }
            });
            if (change && user) {
                if (user.id === change.userID && !change.isUsed && change.isActive) {
                    const updateUser = await prisma.users.update({
                        where: { id: id },
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
            } else {
                throw createError(400, "Kullanıcı bulunamadı.");
            }
        }
    } catch (error) {
        throw createError(400, "Şifre değiştirilirken hata oluştu. " + error);
    }
}

const getVerifyAccount = async (req, reply) => {
    try {
        let encrypt = req.params.verifyCode;
        let verifyCode = CryptoJS.SHA256(encrypt.toString()).toString();
        let id = req.params.id;
        let parse = parseInt(id);
        const verify = await prisma.verify_account.findFirst({
            where: { verifyCode: verifyCode, userID: parse }
        });
        const user = await prisma.users.findFirst({
            where: { id: parse }
        });
        if (user.id !== verify.userID) {
            throw createError(401, "We were unable to find a user for this verification. Please Register!");
        } else {
            if (!user) {
                throw createError(401, "We were unable to find a user for this verification. Please Register!");
            } else {
                if (!verify) {
                    throw createError(401, "We were unable to find a user for this verification. Please Register!");
                } else if (verify.isUsed) {
                    throw createError(401, "User has been already verified. Please Login!");
                } else if (user.isVerified) {
                    throw createError(401, "User has been already verified. Please Login!");
                } else if (!verify.isActive) {
                    throw createError(401, "Link status expired.");
                } else {
                    const updateUser = await prisma.users.update({
                        where: { id: verify.userID },
                        data: { isVerified: true }
                    });
                    const updateVerify = await prisma.verify_account.updateMany({
                        where: { verifyCode: verify.verifyCode, userID: verify.userID },
                        data: { isUsed: true, isActive: false }
                    });
                    reply.send({ state: true });
                }
            }
        }
    } catch (error) {
        throw createError(400, "Onaylama işleminde bir hata oluştu. " + error);
    }
}

const getResetPassword = async (req, reply) => {
    try {
        let encrypt = req.params.resetCode;
        let resetCode = CryptoJS.SHA256(encrypt.toString()).toString();
        let id = parseInt(req.params.id);
        const reset = await prisma.reset_password.findFirst({
            where: { resetCode: resetCode, userID: id }
        });
        const user = await prisma.users.findFirst({
            where: { id: reset.userID }
        });
        if (user.id !== reset.userID) {
            throw createError(401, "We were unable to find a user. Please Register!");
        } else {
            if (!reset.isActive) {
                throw createError(400, "Kod geçerliliğini kaybetmiştir.");
            } else if (reset.isUsed) {
                throw createError(400, "Kod geçerliliğini kaybetmiştir.");
            } else {
                reply.send({ state: true });
            }
        }
    } catch (error) {
        throw createError(400, "Şifre sıfırlama işleminde bir hata oluştu. " + error);
    }
}

module.exports = {
    admin,
    home,
    getLogin,
    getVerifyAccount,
    getAdminLogin,
    getResetPassword,
    adminLogOut,
    logOut,
    patchVerificationUser,
    patchResetPassword,
    postLogin,
    postAdminLogin,
    postRegister,
    postResetPassword,
    postResendVerificationMail
}