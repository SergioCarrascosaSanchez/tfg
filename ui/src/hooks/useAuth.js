export const useAuth = () => {
  return (
    localStorage.getItem("username") !== null &&
    localStorage.getItem("token") !== null
  );
};
