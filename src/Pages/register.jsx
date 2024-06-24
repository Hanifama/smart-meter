import FormLogin from "../components/Fragments/FormLogin"
import FormRegister from "../components/Fragments/FormRegister"
import AuthLayouts from "../components/Layouts/AuthLayouts"

const RegisterPage = ( ) =>{
    return(
        <AuthLayouts 
        title="Selamat Datang " 
        desc="Silahkan isi data register anda Untuk Melanjutkan" 
        type="register">
            <FormRegister/>
        </AuthLayouts>
    )
}

export default RegisterPage