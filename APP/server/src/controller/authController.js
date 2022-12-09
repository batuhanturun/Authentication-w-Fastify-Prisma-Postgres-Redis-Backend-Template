const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const dotenv = require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sendMail = require("../utils/sendMail");

const home = async (req, reply) => { //! 
    try {
        if (req.session.authenticated) {
            reply.send({ state: true })
        } else {
            reply.send({ state: false })
        }
    } catch (error) {
        throw createError(400, "Error : " + error);
    }
}

const admin = async (req, reply) => { //! jwt check! aktif değil ise misafir sayfası gösterilecek.
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
            const newUser = await prisma.users.create({
                data: {
                    name,
                    email,
                    password: await bcrypt.hash(password, 10)
                }
            });
            let random = Math.floor(Math.random() * 90000) + 10000;
            let dbRandom = await bcrypt.hash(random.toString(), 10); //! bcrypt yerine crypto-js ile kod oluştur. 
            const verifyCode = await prisma.verify_account.create({
                data: {
                    userID: newUser.id,
                    verifyCode: dbRandom
                }
            });
            let url = 'Hello ' + newUser.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/' + newUser.id + '\/verify\/' + verifyCode.verifyCode + '\n\nThank You!\n'
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

const patchVerificationUser = async (req, reply) => { //! crpyto-js ile oluşturulan kod veri tabanına hash'lenerek yazılacak. Bu koda basınca üyelik aktifleştirelecek.
    try {

        const verifyCode = await prisma.verify_account.findFirst({
            where: { verifyCode: req.params.verifyCode }
        })
        if (!verifyCode) {
            throw createError(400, "Your verification link may have expired.");
        } else {
            const user = await prisma.users.findFirst({
                where: { email: req.params.email }
            });
            if (!user) {
                throw createError(400, "We were unable to find a user for this verification.");
            } else if (user.isVerified) {
                throw createError(400, "User has been already verified.");
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
            throw createError(400, "Bu posta adresine kayıtlı kullanıcı bulunamadı!");
        } else if (user.isVerified === true) {
            throw createError(400, "This account has been already verified.");
        } else {
            let random = Math.floor(Math.random() * 90000) + 10000;
            let dbRandom = await bcrypt.hash(random.toString(), 10); //!
            const find = await prisma.verify_account.findFirst({
                where: { userID: user.id }
            });
            const reset = await prisma.verify_account.updateMany({
                where: { userID: find.id },
                data: {
                    verifyCode: dbRandom,
                    isActive: true,
                    isUsed: false
                }
            });
            let url = 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + dbRandom + '\n\nThank You!\n';
            sendMail(email, "Verify Email", url)
            if (sendMail) {
                reply.send({ state: true });
            } else {
                console.log("Hata oluştu!");
            }
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
                reply.send({ state: true, token: token });
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
        reply.send({ state: true });
    } catch (error) {
        throw createError(400, "Kullanıcı çıkış yaparken hata oluştu. " + error);
    }
}

const adminLogOut = async (req, reply) => {
    try {
        req.session.authenticated = false;
        req.session.isAdmin = false;
        await req.session.destroy();
        reply.send({ state: true });
    } catch (error) {
        throw createError(400, "Kullanıcı çıkış yaparken hata oluştu. " + error);
    }
}

const postResetPassword = async (req, reply) => { //! crpyto-js ile oluşturulan kod veri tabanına hash'lenerek yazılacak. Bu koda basınca resetpassword yönlendirelecek.
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
            let url = `Reset Code: ${random}`; //! Link gönder.
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

const patchChangePassword = async (req, reply) => {
    try {
        let { email, resetCode, password, verifyPassword } = req.body;
        if (password !== verifyPassword) {
            throw createError(401, "Şifreler eşleşmemektedir.");
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

const getVerifyAccount = async (req, reply) => { //! crpyto-js ile oluşturulan kod veri tabanına hash'lenerek yazılacak. Bu koda basınca üyelik aktifleştirelecek.
    try {
        let { email, verifyCode } = req.params;
        const verify = await prisma.verify_account.findFirst({
            where: { verifyCode }
        });
        const user = await prisma.users.findFirst({
            where: { id: verify.userID, email: email }
        });
        if (!user) {
            throw createError(401, "We were unable to find a user for this verification. Please Register!");
        } else {
            if (!verify) {
                throw createError(401, "We were unable to find a user for this verification. Please Register!");
            } else if (verify.isUsed || user.isVerified) {
                throw createError(401, "User has been already verified. Please Login!");
            } else if (!verify.isActive) {
                throw createError(401, "Link geçerliliğini kaybetmiştir.");
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
        }
    } catch (error) {
        throw createError(400, "Onaylama işleminde bir hata oluştu. " + error);
    }
}

const getResetPassword = async (req, reply) => { //! crpyto-js ile oluşturulan kod veri tabanına hash'lenerek yazılacak. Bu koda basınca üyelik aktifleştirelecek.
    try {
        let { resetCode, email } = req.params;
        const reset = await prisma.reset_password.findFirst({
            where: { resetCode }
        });
        const user = await prisma.users.findFirst({
            where: { id: reset.userID, email: email }
        });
        if (!user) {
            throw createError(401, "We were unable to find a user for this verification. Please Register!");
        } else {
            if (!reset) {
                throw createError(401, "We were unable to find a user for this verification. Please Register!");
            } else if (reset.isUsed || user.isVerified) {
                throw createError(401, "Bu sıfırlama bağlantısı kullanılmış!");
            } else if (!reset.isActive) {
                throw createError(401, "Link geçerliliğini kaybetmiştir.");
            } else {
                const updateUser = await prisma.users.update({
                    where: { id: reset.userID },
                    data: { isVerified: true }
                });
                const updateVerify = await prisma.reset_password.update({
                    where: { resetCode },
                    data: { isUsed: true, isActive: false }
                });
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
    getResetPassword,
    getVerifyAccount,
    getAdminLogin,
    adminLogOut,
    logOut,
    patchChangePassword,
    patchVerificationUser,
    postLogin,
    postAdminLogin,
    postRegister,
    postResetPassword,
    postResendVerificationMail
}