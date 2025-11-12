const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { isAuthenticated } = require("../middleware/authMiddleware");

//log-in btn to mainInterface
router.post("/user/login", userController.loggedInUser);

// signup done to loginPage
router.post("/user-signup-ok", userController.signupToLogin);

// mainInterface = blogs/index
router.get("/mainInterface", userController.mainInterface);

// login btn to login form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// signup btn to signup form
router.get("/signup-user", (req, res) => {
  res.render("users/signup");
});

router.get("/user-dashboard", isAuthenticated, userController.userDashboard);

// logout btn to homePage
router.post("/user-logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed!");
    }
    res.clearCookie('connect.sid')
    res.status(200).send({ message: "user logout successful" });
  });
});

router.post("/is-Authenticated", isAuthenticated, (req, res) => {
  res.status(200).send({ message: "user is authenticated" });
});
module.exports = router;
