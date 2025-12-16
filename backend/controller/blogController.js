const blogModel = require("../model/blogModel");

const blogsCreate = (req, res) => {
  res.render("blogs/create");
};

const blogsSave = async (req, res) => {
  try {
    const { title, body } = req.body;
    const user = req.session.user;

    if (!user) return res.status(401).send("Unauthorized");

    const newNote = new blogModel({
      title,
      body,
      userId: user._id,
    });
    await newNote.save();
    res.status(200).json(newNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to create note");
  }
};

const noteView = async (req, res) => {
  try {
    const runningUser = req.session.user;
    const note = await blogModel.findById(req.params.id);

    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json({
      note: note,
      user: runningUser,
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const blogOnlyView = async (req, res) => {
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/onlyView", { blog: blog });
};

const backBTN = (req, res) => {
  res.redirect("/mainInterface");
};

const editPage = async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/edit", { editBlog: blog, user: runningUser });
};

const saveEditToView = async (req, res) => {
  try {
    const { title, body } = req.body;
    const noteId = req.params.id;

    // Find blog
    const note = await blogModel.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Update fields
    note.title = title;
    note.body = body;
    note.done = false;

    await note.save();

    // Send success for frontend
    res.status(200).json({
      message: "Blog updated successfully",
      note: note,
    });

  } catch (err) {
    console.error("Edit error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const markDone = async (req, res) => {
  let blog = await blogModel.findByIdAndUpdate(req.params.id);
  blog.done = true;
  await blog.save();
  res.redirect(`/blog/${req.params.id}/view`);
};

const deleteBTN = async (req, res) => {
  try {
    const runningUser = req.session.user;
    if (!runningUser) {
      return res.status(401).send("Please log in");
    }

    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");

    // Admin can delete any blog OR user can delete their own blog
    if (
      runningUser.role !== "admin" &&
      blog.userId.toString() !== runningUser._id.toString()
    ) {
      return res.status(403).send("Unauthorized to delete this blog");
    }

    await blogModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).send("Internal Server Error");
  }

res.status(200).json({ message: "Note deleted successfully" });

};

module.exports = {
  blogsCreate,
  blogsSave,
  noteView,
  blogOnlyView,
  backBTN,
  editPage,
  saveEditToView,
  markDone,
  deleteBTN,
};
