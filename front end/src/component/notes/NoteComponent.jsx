import React, { useState } from "react";
import NoteFormComponent from "./NoteFormComponent/NoteFormComponent";
import NoteListComponent from "./NoteListComponent/NoteListComponent";
import noteData from "../../data/noteData";

function NoteComponent() {
  const [notes, setNotes] = useState(noteData);

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const addNote = (title, body) => {
    let note = { title, body };
    note.isCompleted = false;
    let newArr = [...notes, note];
    setNotes(newArr);
  };

  function noteStrike(index, newNote) {
    let updatedNotes = [...notes];
    updatedNotes[index] = newNote;
    setNotes(updatedNotes);
  }

  return (
    <>
      <NoteListComponent
        notes={notes}
        onDeleteNote={deleteNote}
        onStrikeNote={noteStrike}
      />
      <NoteFormComponent onAddNote={addNote} />
    </>
  );
}

export default NoteComponent;
