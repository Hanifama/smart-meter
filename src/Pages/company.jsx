import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Company = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [pageRange] = useState(10);

  const getProfileData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://sso.pptik.id/api/v1/users/company', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setProfileData(responseData);
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Error fetching profile data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = profileData?.data.data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(profileData.data.data.length / usersPerPage);
    let pages = [];

    if (totalPages <= pageRange) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= pageRange - 1) {
        for (let i = 1; i <= pageRange; i++) {
          pages.push(i);
        }
        pages.push('...');
      } else if (currentPage + pageRange - 1 >= totalPages) {
        pages.push('...');
        for (let i = totalPages - pageRange + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        for (let i = currentPage - Math.floor(pageRange / 2); i <= currentPage + Math.floor(pageRange / 2); i++) {
          pages.push(i);
        }
        pages.push('...');
      }
    }

    return pages.map((number, index) => (
      <span
        key={index}
        onClick={() => number !== '...' && paginate(number)}
        className={`cursor-pointer px-2 py-1 ${currentPage === number ? 'bg-gray-300' : 'hover:bg-gray-200'} rounded-full mx-1`}
      >
        {number}
      </span>
    ));
  };

  const handleButton = (route) => {
    navigate(route);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {profileData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Data GET User by Company</h2>
          <div className="flex justify-center">
          <button
            className="bg-primary text-white px-4 py-2 rounded mb-4"
            onClick={() => handleButton('/user/add')}
          >
            <FontAwesomeIcon icon={faPlus} /> Tambah
          </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-max">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Profile</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Kontak</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border px-4 py-2">
                      <img src={user.imageProfile} alt={user.name} className="h-10 w-10 rounded-full" />
                    </td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phoneNumber}</td>
                    <td className="border px-4 py-2 whitespace-nowrap">{user.address}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button className="bg-red-500 text-white px-2 py-1 rounded">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </button>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded mr-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(profileData.data.data.length / usersPerPage)}
              className={`px-3 py-1 border rounded ${currentPage === Math.ceil(profileData.data.data.length / usersPerPage) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;
