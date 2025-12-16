const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const { isAuthenticated } = require('../middleware/authMiddleware')

// blog create btn to create form
router.get("/blog/create",isAuthenticated, blogController.blogsCreate);

// blog save btn to mainInterface
router.post("/create-note",isAuthenticated, blogController.blogsSave);

// view btn to view page
router.get("/note/:id/view",isAuthenticated, blogController.noteView);

// all blogs view btn to onlyView page
router.get("/blog/:id/onlyView", blogController.blogOnlyView);

// back btn to mainInterface
router.get("/blog/:id/back",isAuthenticated, blogController.backBTN);

// edit btn to edit page
router.get("/blog/:id/edit",isAuthenticated, blogController.editPage);

// save edit btn to view page
router.post("/note/:id/save-edit",isAuthenticated, blogController.saveEditToView);

// edit cancel btn to view page
router.get("/blog/:id/edit/cancel",  isAuthenticated,(req, res) => {
  res.redirect(`/blog/${req.params.id}/view`);
});

// markDone btn to refresh view page and markDone complete
router.post("/blog/:id/markDone",isAuthenticated, blogController.markDone);

// delete btn to refresh mainInterface and delete item
router.post("/note/:id/delete",isAuthenticated, blogController.deleteBTN);

// create cancel btn to mainInterface
router.get("/blog/create/cancel", isAuthenticated, (req, res) => {
  res.redirect("/mainInterface");
});

module.exports = router;
