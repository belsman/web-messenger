const getTokenFromCookie = (cookieString) => {
  const splitCookie = cookieString.split("; ");
  const parsedToken = splitCookie.find(cookie => cookie.slice(0, 5) === "token");
  if (parsedToken) {
    return parsedToken.split("=")[1];
  }
  return false;
};

module.exports = { getTokenFromCookie }
