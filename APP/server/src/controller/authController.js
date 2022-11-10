const bcrypt = require("bcrypt");
const createError = require("http-errors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const home = async (req, reply) => {
    try {
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Access-Control-Allow-Methods", "GET");
        reply.type('text/html');
    } catch (error) {
        throw createError(400, "Error : " + error);
    }
}

const postRegister = async (req, reply) => {
    try {
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Access-Control-Allow-Methods", "POST");
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
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");

    if(req.session.authenticated){
        reply.send({state:true, name:req.session.user.name});
    }
}

const postLogin = async (req, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");
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
            reply.send({state:true, name:user.name});
        }
    } catch (error) {
        throw createError(401, "Kullanıcı giriş yaparken hata oluştu. " + error);
    }
}


const logOut = async (req, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    try {
        reply.send("Başarıyla çıkış yaptınız.");
        req.destroySession((err) => {
            if (err) {
                throw createError(500, "Internal Server Error");
            } else {
                reply.redirect('/');
            }
        });
        next();
    } catch (error) {
        throw createError(400, "Kullanıcı çıkış yaparken hata oluştu. " + error);
    }
}

const postResetPassword = async (req, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");
    try {
        let { email } = req.body;
        const reset = await prisma.users.findFirst({
            where: { email }
        });
        if (!reset) {
            throw createError(401, "Bu E-Mail'e kayıtlı kullanıcı bulunamadı.");
        } else {
            reply.send("Şifre sıfırlama bağlantısı E-Mail hesabınıza gönderildi.");
            return reset;
        }
    } catch (error) {
        throw createError(400, "Şifre sıfırlanırken hata oluştu. " + error);
    }
}

module.exports = {
    getLogin,
    postLogin,
    postRegister,
    postResetPassword,
    home,
    logOut
}