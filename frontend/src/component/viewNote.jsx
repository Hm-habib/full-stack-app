import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/note/${id}/view`, {
          withCredentials: true,
        });
        setNote(res.data.note);
      } catch (err) {
        console.error("Error loading note:", err);
      }
    };
    fetchNote();
  }, [id]);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user-logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  if (!note) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl p-6 bg-white rounded-lg shadow">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <h1 className="text-2xl text-start font-bold mb-4 text-black">
          {" "}
          Title: {note.title}
        </h1>

        <p className="text-gray-600 font-bold text-justify">
          Description: {note.body}
        </p>

        <div className="mt-6 flex justify-between gap-30">
          <button
            onClick={() => navigate(`/edit-note/${id}`)}
            className="py-2 w-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Edit Note
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="py-2 w-sm  bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
