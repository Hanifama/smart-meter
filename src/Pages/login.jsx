import FormLogin from "../components/Fragments/FormLogin"
import AuthLayouts from "../components/Layouts/AuthLayouts"

const LoginPage = () => {
    return (
        <AuthLayouts
            title="Selamat Datang Kembali"
            desc="Silahkan Masukan Email Anda Untuk Melanjutkan"
            type="login">
            <FormLogin />
        </AuthLayouts>
    )
}

export default LoginPage