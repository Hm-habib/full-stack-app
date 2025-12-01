import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateNote from "../component/createNote/createNote";

function UserDashboard() {
  const [notes, setNotes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user-dashboard", {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.post(
        `http://localhost:3000/note/${id}/delete`,
        {},
        { withCredentials: true }
      );
      fetchNotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

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

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {!showCreate && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-black">Your Notes</h2>

            <table className="w-full border-collapse shadow-md">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="p-3 border w-70">Title</th>
                  <th className="p-3 border">Body</th>
                  <th className="p-3 border text-center w-40">Actions</th>
                </tr>
              </thead>

              <tbody>
                {notes.map((note) => (
                  <tr
                    key={note._id}
                    className="hover:bg-gray-100 transition text-black"
                  >
                    <td className="p-3 text-start border w-70">{note.title}</td>
                    <td className="p-3 border text-start">
                      {note.body.slice(0, 60)}...
                    </td>

                    <td className="p-3 border text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/note/${note._id}/view`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          View
                        </button>

                        <button
                          onClick={() => deleteNote(note._id)}
                          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {!showCreate && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded my-6 block mx-auto"
          >
            Create a Note
          </button>
        )}

        {selectedNote && (
          <ViewNoteModal
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
          />
        )}
      </div>

      {showCreate && (
        <CreateNote
          onNoteCreated={fetchNotes}
          onClose={() => setShowCreate(false)}
        />
      )}
    </>
  );
}

export default UserDashboard;
