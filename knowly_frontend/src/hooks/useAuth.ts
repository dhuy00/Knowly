import useAuthStore from "../stores/auth.store";

const useAuth = () => {
  const {
    user,
    token,
    loading,
    isAuthenticated,

    login,
    register,
    logout,
    fetchMe,
  } = useAuthStore();

  return {
    user,
    token,
    loading,
    isAuthenticated,

    login,
    register,
    logout,
    fetchMe,
  };
};

export default useAuth;
