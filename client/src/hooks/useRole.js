import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  return {
    isAdmin:
      user?.role === "Admin",

    isUser:
      user?.role === "User",

    role: user?.role,
  };
};

export default useRole;