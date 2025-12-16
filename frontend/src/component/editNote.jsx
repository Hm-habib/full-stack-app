import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);

  // Fetch existing note
  const fetchNote = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/note/${id}/view`,
        { withCredentials: true }
      );
      setNote(res.data.note);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch note:", err);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  // Update note
  const updateNote = async () => {
    try {
      await axios.post(
        `http://localhost:3000/note/${id}/save-edit`,
        note,
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  if (loading) {
    return <h2 className="mt-10 text-center text-xl">Loading...</h2>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-4 text-black">Edit Note 📝</h2>

        {/* Title Field */}
        <label className="block mb-2 font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="w-full p-3 border rounded mb-4"
        />

        {/* Body Field */}
        <label className="block mb-2 font-medium text-gray-700">Body</label>
        <textarea
          value={note.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
          className="w-full p-3 border rounded h-40 mb-4"
        />

        {/* Action Buttons */}
        <div className="flex  gap-30">

          <button
            onClick={updateNote}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate(`/note/${note._id}/view`)}
            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}

export default EditNote;
