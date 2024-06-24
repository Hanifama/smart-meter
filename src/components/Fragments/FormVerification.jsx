import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { activateAccount, DEFAULT_GUID_APPLICATION } from "../../server/index";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    setIsLoading(true);
    setError("");

    try {
      const response = await activateAccount({
        email: email,
        guidAplication: DEFAULT_GUID_APPLICATION,
        otp: otpValue
      });
      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Failed to verify OTP. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (index, value) => {
    if (!isNaN(value) && value !== "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1 && value !== "") {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Verification</h2>
      <p className="text-gray-600 text-center">Masukkan kode OTP yang dikirimkan ke email:</p>
      <p className="text-blue-600 mb-4 text-center">{email}</p>
      <form onSubmit={handleOtpSubmit} className="space-y-4">
        <div className="flex justify-center">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={inputRefs.current[index]}
              type="text"
              maxLength="1"
              className="w-12 h-12 px-4 py-2 border rounded-md text-center mr-2 focus:outline-none focus:border-blue-500"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-md focus:outline-none focus:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Submit OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
