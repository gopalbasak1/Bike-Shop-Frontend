export const isAuthenticated = () => {
  return typeof window !== "undefined" && localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth/login"; // Redirect to login page after logout
};
