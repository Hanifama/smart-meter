import React, { useState } from 'react';

const ProfileCard = ({ name, username, email, phone, website, company }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActivation = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`max-w-xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white ${isActive ? 'border-green-500' : 'border-gray-300'}`}>
      <div className="sm:flex sm:items-center px-6 py-4">
        <img
          className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 w-24 rounded-full sm:mr-6 sm:mb-0 mb-4"
          src={`https://avatars.dicebear.com/api/male/${username}.svg`}
          alt="Profile"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-gray-600">@{username}</p>
          <p className="text-sm text-gray-600">{email}</p>
          <p className="text-sm text-gray-600">{phone}</p>
          <p className="text-sm text-gray-600">{website}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <p className="text-sm text-gray-600">{company.name}</p>
            <p className="text-sm text-gray-600">{company.catchPhrase}</p>
            <p className="text-sm text-gray-600">{company.bs}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-4">
        <label className="flex items-center cursor-pointer">
          <div className={`w-10 h-5 bg-gray-300 rounded-full p-1 duration-300 ${isActive ? 'bg-green-500' : ''}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isActive ? 'translate-x-5' : ''}`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">Activate Account</div>
          <input
            type="checkbox"
            className="hidden"
            checked={isActive}
            onChange={toggleActivation}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileCard;
