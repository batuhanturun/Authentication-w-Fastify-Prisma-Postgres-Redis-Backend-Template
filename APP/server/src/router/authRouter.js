const authController = require("../controller/authController");

const routers = [
    {
        method: "GET",
        url: "/api/",
        handler: authController.home
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
        url: "/api/loginadmin",
        handler: authController.getAdminLogin
    },
    {
        method: "GET",
        url: "/api/:email/:verifycode",
        handler: authController.getVerifyAccount
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
        url: "/api/loginadmin",
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