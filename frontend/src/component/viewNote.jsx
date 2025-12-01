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
        const res = await axios.get(
          `http://localhost:3000/note/${id}/view`,
          { withCredentials: true }
        );
        setNote(res.data.note);
      } catch (err) {
        console.error("Error loading note:", err);
      }
    };
    fetchNote();
  }, [id]);

  if (!note) return <h2>Loading...</h2>;

  return (
    <div className="max-w-xl mx-auto font-normal text-lg text-start p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <p className="text-gray-600 text-justify">{note.body}</p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-4  py-2 w-132 bg-blue-600 text-white rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default ViewNote;
