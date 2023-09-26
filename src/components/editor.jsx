//import Quill from "quill";
import "../Editor.css";
import { useQuill } from "react-quilljs";
import { UserAuth } from "../context/AuthContext";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
//import { Navigate } from "react-router-dom";
function Editor({ editorNote, noteId }) {
  const { user } = UserAuth();
  const [notey, setNotey] = useState(null);
  const [Loading, setLoading] = useState(false);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "underline", "italic"],

      [{ list: "ordered" }],
      [{ color: [] }],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });

  //setNotey(editorNote.text);
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(editorNote.text);
      // console.log("notey1", notey);
      quill.on("text-change", () => {
        //console.log("Text change!");
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        //editorNote.setNote.text(quill.root.innerHTML);
        //console.log(setNote.te);
        //setNotey(quill.getText());
        //console.log("notey", notey);
        setNotey(quill.root.innerHTML);
      });
    }
  }, [quill, editorNote.text]);
  // {
  //   console.log("notey", notey);
  // }
  const saveNote = async () => {
    // if (note.text === "") {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "All fields are required!",
    //   });
    // }
    try {
      const notesref = doc(db, "notes", user.uid, "notes", noteId);
      const newNote = {
        text: notey,
        time: serverTimestamp(), // Current time
        updatedAt: serverTimestamp(), // Initial value
      };
      await updateDoc(notesref, newNote);
      //Navigate("/dashboard");
      setLoading("");
    } catch (error) {
      console.error("Error updating note content", error);
    }
    // console.log("save note 2", editorNote, noteId, user.uid);
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Your note has been updated!",
    });
  };
  return (
    <div>
      {/* {<div> {console.log(editorNote.text)}</div>} */}
      <div style={{ width: 650, height: 300 }}>
        <div ref={quillRef} />
      </div>
      <button
        onClick={saveNote}
        className="mt-14 border border-white p-2 hover:bg-[#ffffff] hover:text-[#5200ff] scale-100 duration-300 py-2 my-2 rounded-2xl text-white "
        disabled={Loading}
      >
        {Loading ? (
          <svg
            className="spinner"
            width="100%"
            height="20"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="8.042%"
                y1="0%"
                x2="65.682%"
                y2="23.865%"
                id="a"
              >
                <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
                <stop stopColor="#fff" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)">
                <path
                  d="M36 18c0-9.94-8.06-18-18-18"
                  stroke="url(#a)"
                  strokeWidth="2"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        ) : (
          <span> Save Note </span>
        )}
      </button>
    </div>
  );
}

export default Editor;
