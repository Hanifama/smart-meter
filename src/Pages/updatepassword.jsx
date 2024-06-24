import React from "react";
import FormUpdatePassword from "../components/Fragments/FormUpdatePassword";
import AuthLayouts from "../components/Layouts/AuthLayouts";

const UpdatePasswordPage = () => {
    return (
        <AuthLayouts
            title="Update Password"
            desc="Masukkan email dan password saat ini, serta password baru Anda."
            type="updatePassword"
        >
            <FormUpdatePassword />
        </AuthLayouts>
    );
};

export default UpdatePasswordPage;
