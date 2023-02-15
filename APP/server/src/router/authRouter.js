const authController = require("../controller/authController");

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
        url: "/api/verify/:id/:verifyCode",
        handler: authController.getVerifyAccount
    },
    {
        method: "GET",
        url: "/api/reset/:id/:resetCode",
        handler: authController.getResetPassword
    },
    {
        method: "GET",
        url: "/api/profile/paymentmethods",
        handler: authController.getPaymentMethods
    },
    {
        method: "PATCH",
        url: "/api/reset/:id/:resetCode",
        handler: authController.patchResetPassword
    },
    {
        method: "PATCH",
        url: "/api/verificationuser",
        handler: authController.patchVerificationUser
    },
    {
        method: "PATCH",
        url: "/api/profile/paymentmethods/:id",
        handler: authController.patchPaymentMethods
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
    },
    {
        method: "POST",
        url: "/api/contact",
        handler: authController.postMessage
    },
    {
        method: "POST",
        url: "/api/profile/changepassword",
        handler: authController.postProfileChangePassword
    },
    {
        method: "GET",
        url: "/api/patchnotes",
        handler: authController.getPatchNotes
    },
    {
        method: "GET",
        url: "/api/admin/patchnotes",
        handler: authController.getAdminPatchNotes
    },
    {
        method: "POST",
        url: "/api/admin/patchnotes",
        handler: authController.postPatchNotes
    },
    {
        method: "POST",
        url: "/api/profile/addpaymentmethod",
        handler: authController.postAddPaymentMethod
    },
    {
        method: "GET",
        url: "/api/patchnotes/:id",
        handler: authController.getNote
    },
    {
        method: "GET",
        url: "/api/admin/patchnotes/:id",
        handler: authController.getNoteOption
    },
    {
        method: "GET",
        url: "/api/admin/services",
        handler: authController.getAdminServices
    },
    {
        method: "GET",
        url: "/api/services",
        handler: authController.getServices
    },
    {
        method: "PATCH",
        url: "/api/admin/patchnotes/:id",
        handler: authController.patchPatchNotes
    },
    {
        method: "DELETE",
        url: "/api/admin/patchnotes/:id",
        handler: authController.deletePatchNotes
    },
    {
        method: "DELETE",
        url: "/api/profile/paymentmethods/:id",
        handler: authController.deletePaymentMethods
    }
]

module.exports = routers;