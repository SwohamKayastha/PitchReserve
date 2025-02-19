export const checkAuthStatus = () => {
  const accessToken = localStorage.getItem('access_token');
  const userType = localStorage.getItem('user_type'); // 'owner' or 'user'
  
  if (!accessToken) {
    return { isAuthenticated: false };
  }

  // Here you could also add JWT expiration check if needed
  return {
    isAuthenticated: true,
    userType
  };
};

export const handleProfileClick = (navigate) => {
  const { isAuthenticated, userType } = checkAuthStatus();

  if (!isAuthenticated) {
    navigate('/login');
    return;
  }

  if (userType === 'owner') {
    navigate('/ownerProfile');
  } else {
    navigate('/playerProfile');
  }
};
