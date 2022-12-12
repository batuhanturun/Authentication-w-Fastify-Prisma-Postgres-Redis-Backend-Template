const authController = require("../controller/authController");
const jwtVerify = require("../middleware/authTokenVerify");

const routers = [
    {
        method: "GET",
        url: "/api/",
        handler: authController.home
    },
    {
        method: "GET",
        url: "/api/admin",
        handler: authController.admin
    },
    {
        method: "GET",
        url: "/api/logout",
        handler: authController.logOut
    },
    {
        method: "GET",
        url: "/api/adminlogout",
        handler: authController.adminLogOut
    },
    {
        method: "GET",
        url: "/api/login",
        handler: authController.getLogin
    },
    {
        method: "GET",
        url: "/api/adminlogin",
        handler: authController.getAdminLogin
    },
    {
        method: "GET",
        url: "/api/:id/verify/:verifyCode",
        handler: authController.getVerifyAccount
    },
    {
        method: "GET",
        url: "/api/:id/reset/:resetCode",
        handler: authController.getResetPassword
    },
    {
        method: "PATCH",
        url: "/api/:id/reset/:resetCode",
        handler: authController.patchResetPassword
    },
    {
        method: "PATCH",
        url: "/api/changepassword",
        handler: authController.patchChangePassword
    },
    {
        method: "PATCH",
        url: "/api/verificationuser",
        handler: authController.patchVerificationUser
    },
    {
        method: "POST",
        url: "/api/register",
        handler: authController.postRegister
    },
    {
        method: "POST",
        url: "/api/login",
        handler: authController.postLogin
    },
    {
        method: "POST",
        url: "/api/adminlogin",
        handler: authController.postAdminLogin
    },
    {
        method: "POST",
        url: "/api/resetpassword",
        handler: authController.postResetPassword
    },
    {
        method: "POST",
        url: "/api/resendverificationmail",
        handler: authController.postResendVerificationMail
    }
]

module.exports = routers;