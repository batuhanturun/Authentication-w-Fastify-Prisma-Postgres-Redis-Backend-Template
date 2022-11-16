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
        url: "/api/login",
        handler: authController.getLogin
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
        url: "/api/resetpassword",
        handler: authController.postResetPassword
    },
    {
        method: "PATCH",
        url: "/api/changepassword",
        handler: authController.patchChangePassword
    }
]

module.exports = routers;