import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateNote from "../component/createNote/createNote";


function UserDashboard() {
  const [notes, setNotes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user-dashboard", {
        withCredentials: true,
      });
      setNotes(res.data);
     
    } catch (err) {
      console.error("Failed to fetch notes:", err.message);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);


  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user-logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.log("Logout failed", err);
    }
  };
  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      
      {!showCreate && (
        <div>
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl text-start font-bold mb-3 text-gray-800">
                Title: {note.title}
              </h2>
              <p className="text-gray-600 text-start mb-4"> <span className="text-black font-bold"> Description:</span> {note.body}</p>
              <p className="text-gray-600 text-start mb-4">Created at: {note.updatedAt}</p>
            </div>
          ))}

          <button
            onClick={() => setShowCreate(true)}
            className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded my-6 block mx-auto"
          >
            Create a note
          </button>
        </div>
      )}

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
