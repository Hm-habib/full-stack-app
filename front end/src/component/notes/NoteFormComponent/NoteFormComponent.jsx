import React, { useState } from "react";
import styles from "./noteFormStyles.module.css";

function NoteFormComponent({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);

  const showNoteCreationForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setBody("");
    onAddNote(title, body);
    setShowForm(false);
  };

  return (
    <div className={styles["create-note-container"]}>
      <button onClick={showNoteCreationForm}>Create New Note</button>
      <form
        className={`${styles.noteForm} ${showForm ? styles.showNoteForm : ""}`}
        action=""
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Tittle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          name=""
          id=""
          value={body}
          placeholder="Note Description"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <div className={styles.formButton}>
          <button type="submit">Add Note</button>
          <button>Cancel</button>
        </div>
      </form>

      <br />
      <br />
    </div>
  );
}

export default NoteFormComponent;
