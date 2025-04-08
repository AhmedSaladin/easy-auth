import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getHome } from '../services/auth';

const ApplicationPage: React.FC = () => {
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getHome();
        setTime(response.data.serverUpTime);
      } catch (error) {
        console.error('Failed to load user profile', error);
        // If token is invalid, logout and redirect
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden'>
        <div className='px-4 py-5 sm:px-6 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Welcome! The server has been working since {time ? time : ''}
          </h1>
          <button
            onClick={handleLogout}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
            Logout
          </button>
        </div>
        <div className='border-t border-gray-200'>
          <div className='px-4 py-5 sm:p-6'>
            <p className='text-gray-700'>You have successfully signed in to the protected area of the application.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
