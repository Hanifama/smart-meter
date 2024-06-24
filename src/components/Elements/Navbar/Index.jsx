import React, { useState } from 'react';
import img from "../../../assets/logo.png"

const Navbar = () => {
    return (
        <div className="md:fixed md:w-full md:top-0 md:z-10 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
            <div className="flex-none w-56 flex flex-row items-center">
                <img src={img} className="w-10 flex-none" alt="logo" />
                <strong className="text-secondary capitalize ml-1 flex-1">Smart Meter</strong>
                <button id="sliderBtn" className="flex-none text-right text-gray-900 hidden md:block">
                    <i className="fad fa-list-ul"></i>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
