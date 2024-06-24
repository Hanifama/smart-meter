import React from "react";
import FormForgotPassword from "../components/Fragments/FormForgotPassword";
import AuthLayouts from "../components/Layouts/AuthLayouts";

const ForgotPasswordPage = () => {
    return (
        <AuthLayouts
            title="Lupa Password"
            desc="Masukkan email Anda untuk mendapatkan kode reset kata sandi."
            type="forgotPassword"
        >
            <FormForgotPassword />
        </AuthLayouts>
    );
};

export default ForgotPasswordPage;
