import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Elements/Loader/Index";
import img from "../../assets/react.svg";

const Navigation = ({ type }) => {
    if (type === "login") {
        return (
            <p className="text-sm mt-5 text-center">
                Don't have an account? {""}
                <Link to="/register" className="font-bold text-blue-500">
                    Sign Up
                </Link>
            </p>
        );
    } else {
        return (
            <p className="text-sm mt-5 text-center">
                Already have an account? {""}
                <Link to="/login" className="font-bold text-blue-500">
                    Sign In
                </Link>
            </p>
        );
    }
};

const AuthLayouts = (props) => {
    const { children, title, desc, type, isLoading } = props;
    return (
        <div className="flex h-screen justify-center items-center w-full relative">
            {isLoading && <Loader />}
            {type === 'login' && (
                <>
                    <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
                        <h1 className="text-blue-600 block antialiased tracking-normal font-sans text-4xl leading-[1.3] text-inherit font-bold mb-4">{title}</h1>
                        <p className="block antialiased font-sans text-blue-gray-900 text-lg font-normal text-slate-500 mb-8">
                            {desc}
                        </p>
                        {children}
                        <Navigation type={type} />
                    </div>
                    <div className="w-2/5 h-full hidden lg:block order-1 lg:order-2">
                        <img
                            src={img}
                            className="h-full w-full object-cover rounded-3xl" />
                    </div>
                </>
            )}
            {type === 'register' && (
                <>
                    <div className="w-2/5 h-full hidden lg:flex lg:justify-start">
                        <img src={img}
                            className="h-full w-full object-cover rounded-3xl" />
                    </div>
                    <div className="w-full lg:w-3/5 flex flex-col items-center justify-center order-2 lg:order-1">
                        <h1 className="text-blue-600 block antialiased tracking-normal font-sans text-4xl leading-[1.3] text-inherit font-bold mb-4">{title}</h1>
                        <p className="block antialiased font-sans text-blue-gray-900 text-lg font-normal text-slate-500 mb-8">
                            {desc}
                        </p>
                        {children}
                        <Navigation type={type} />
                    </div>
                </>
            )}
        </div>
    );
};

export default AuthLayouts;
