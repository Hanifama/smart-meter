import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Elements/Loader/Index";
import img from "../../assets/headerauth.png";
import logo from "../../assets/logo.png";

const Navigation = ({ type }) => {
    const linkText = type === 'login' ? 'Register Disini!' : 'Login Disini!';
    const linkTo = type === 'login' ? '/register' : '/login';

    const navigationText = type === 'login' ? 'Belum Punya Akun?' : 'Sudah Punya Akun?';

    return (
        <p className="text-sm mt-5 text-center">
            {navigationText} {""}
            <Link to={linkTo} className="font-bold text-primary">
                {linkText}
            </Link>
        </p>
    );
};

const AuthLayouts = ({ children, title, desc, type, isLoading }) => {
    const isLogin = type === 'login';
    const isRegister = type === 'register';
    const isForgotPassword = type === 'forgotPassword';
    const isUpdatePassword = type === 'updatePassword';
    const isUpdateProfile = type == 'updateProfile';

    return (
        <div className="flex h-screen justify-center items-center w-full relative">
            {isLoading && <Loader />}
            
            {isLogin || isRegister ? (
                <>
                    {isLogin && (
                        <>
                            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
                                <img src={logo} alt="logo" className="h-[50px] w-[50px]" />
                                <h1 className="text-primary block antialiased tracking-normal font-sans text-4xl leading-[1.3] text-inherit font-bold mb-2">{title}</h1>
                                <p className="block antialiased font-sans text-blue-gray-900 text-lg font-normal text-slate-500 mb-8">
                                    {desc}
                                </p>
                                {children}
                                <Navigation type={type} />
                            </div>
                            <div className="w-3/5 h-full hidden lg:block order-1 lg:order-2">
                                <img
                                    src={img}
                                    className="h-full w-full object-cover"
                                    alt="illustration"
                                />
                            </div>
                        </>
                    )}
                    {isRegister && (
                        <>
                            <div className="w-3/5 h-full hidden lg:flex lg:justify-start">
                                <img src={img} className="h-full w-full object-cover" alt="illustration" />
                            </div>
                            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
                                <img src={logo} alt="logo" className="h-[55px] w-[55px]" />
                                <h1 className="text-primary block antialiased tracking-normal font-sans text-4xl leading-[1.3] text-inherit font-bold">{title}</h1>
                                <p className="block antialiased font-sans text-blue-gray-900 text-lg font-normal text-slate-500 mb-8">
                                    {desc}
                                </p>
                                {children}
                                <Navigation type={type} />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    {isForgotPassword && (
                        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
                            <h1 className="text-primary block antialiased tracking-normal font-sans text-5xl leading-[1.3] text-inherit font-bold mb-2">{title}</h1>
                            <p className="block antialiased font-sans text-blue-gray-900 text-sm font-normal text-slate-500 mb-2">
                                {desc}
                            </p>
                            {children}
                        </div>
                    )}
                    {isUpdatePassword && (
                        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
                            <h1 className="text-primary block antialiased tracking-normal font-sans text-4xl leading-[1.3] text-inherit font-bold mb-2">{title}</h1>
                            <p className="block antialiased font-sans text-blue-gray-900 text-lg font-normal text-slate-500 mb-8">
                                {desc}
                            </p>
                            {children}
                        </div>
                    )}
                    {isUpdateProfile && (
                        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
                            <h1 className="text-primary block antialiased tracking-normal font-sans text-4xl leading-[1.3] text-inherit font-bold mb-2">{title}</h1>
                            <p className="block antialiased font-sans text-blue-gray-900 text-lg font-normal text-slate-500 mb-8">
                                {desc}
                            </p>
                            {children}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


export default AuthLayouts;
