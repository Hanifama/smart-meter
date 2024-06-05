import React, { useState } from "react";
import FormRegister from "../components/Fragments/FormRegister";
import AuthLayouts from "../components/Layouts/AuthLayouts";

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthLayouts title="Selamat Datang" desc="Silahkan Register Disini" type="register" isLoading={isLoading}>
            <FormRegister setIsLoading={setIsLoading} />
        </AuthLayouts>
    );
};

export default RegisterPage;
