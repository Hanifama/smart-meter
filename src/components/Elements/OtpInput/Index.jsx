import React, { useState } from 'react';

const OTPInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Enter OTP</h2>
        <div className="flex space-x-2">
          {otp.map((data, index) => (
            <input
              className="w-12 h-12 text-center border rounded shadow-sm focus:outline-none focus:border-blue-500"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded shadow-lg hover:bg-blue-600"
          onClick={() => alert('Entered OTP is ' + otp.join(''))}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
