import { useState } from "react";
import axios from "axios";

function CreateNote({ onNoteCreated, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please provide both title and content.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/create-note",
        { title, body },
        { withCredentials: true }
      );
      setTitle("");
      setBody("");
      onNoteCreated();
      onClose();
    } catch (err) {
      console.error("Create note error:", err);
      alert("Failed to save note");
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">Create a Note</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="border px-3 text-black py-2 w-full mb-4 rounded"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border px-3 text-black  py-2 w-full mb-4 rounded"
          placeholder="Note Content"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            save note
          </button>

          <button
            type="button"
            onClick={() => onClose()}
            className="bg-gray-200 hover:bg-red-600 hover:text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
