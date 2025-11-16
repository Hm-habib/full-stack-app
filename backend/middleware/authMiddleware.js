const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) return next();

  return res.status(401).send({ message: "User is not logged in" });
};

module.exports = { isAuthenticated };
