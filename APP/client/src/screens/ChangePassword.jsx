/*
Bu kısım gelecekte çalışacak. ResetPassword'de sadece mail adresine link gönderilecek. Gönderilen link'e tıklanınca bu sayfada 2 kutudan oluşan (password, verifypassword)
bir sayfa açılacak. Butona tıklandığında şifreler eşleşiyorsa güncelleme olacak.
*/

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postData, patchData } from '../functions';

export default function ChangePassword() {

    let [password, setPassword] = useState("");
    let [verifyPassword, setVerifyPassword] = useState("");
    const nav = useNavigate();

    async function submitChangePassword(e) {
        e.preventDefault();
        const response = await patchData("/changepassword", { email: email, resetCode: resetCode, password: password, verifyPassword: verifyPassword });
        if (response.state === true) {
            console.log("Password Successfuly Changed! ", response);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

  return (
    <div>ChangePassword</div>
  )
}
