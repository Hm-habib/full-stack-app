import { React, useState } from "react";
import styles from "./NoteListComponent.module.css";

function NoteListComponent({ notes, onDeleteNote, onStrikeNote }) {
  const [openRows, setOpenRows] = useState([]);

  const toggleExpandedRow = (index) => {
    if (openRows.includes(index)) {
      let newArr = openRows.filter((item) => item != index);
      setOpenRows(newArr);
      return;
    }
    setOpenRows([...openRows, index]);
  };

  function toggleIsCompleted(index, noteItem) {
    noteItem.isCompleted = !noteItem.isCompleted;
    onStrikeNote(index, noteItem);
  }

  return (
    <div className={styles.tableWidthAll}>
      <h3>Note list</h3>
      {notes.length > 0 ? (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className={styles.tableWidth}>
            {notes.map((item, index) => {
              return (
                <tr key={index}>
                  <td> {index + 1} </td>
                  <td
                    onClick={() => toggleIsCompleted(index, item)}
                    className={`text-left ${
                      item.isCompleted ? styles.strike : undefined
                    }`}
                  >
                    <h5>Title: {item.title}</h5>
                    <div
                      className={`${styles.noteDetails} ${
                        openRows.includes(index) ? styles.expanded : null
                      }`}
                    >
                      <p>Body: {item.body} </p>
                    </div>
                  </td>

                  <td className={styles.buttonTd}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm m-1"
                      onClick={() => {
                        toggleExpandedRow(index);
                      }}
                    >
                      {openRows.includes(index) ? (
                        <span>&#8896;</span>
                      ) : (
                        <span>&#9013;</span>
                      )}
                    </button>

                    <button type="button" className="btn btn-info btn-sm m-1">
                      Edit
                    </button>

                    <button
                      type="button"
                      id={`delete-btn-${index}`}
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => onDeleteNote(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Note notes available</p>
      )}
    </div>
  );
}

export default NoteListComponent;
