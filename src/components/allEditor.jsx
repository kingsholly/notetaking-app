//import Quill from "quill";
import "../Editor.css";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
import { useEffect } from "react";
function Alleditor({ handleText }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "underline", "italic"],

      [{ list: "ordered" }],
      [{ color: [] }],
    ],
  };
  const placeholder = "Compose an epic Note...";
  const { quill, quillRef } = useQuill({ modules, placeholder });
  useEffect(() => {
    if (quill) {
      // quill.clipboard.dangerouslyPasteHTML("<i>Enter note text</i>");
      quill.on("text-change", () => {
        // console.log("Text change!");
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        //handleText.setText(quillRef.current.firstChild.innerHTML);
        handleText(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  return (
    <div>
      {/* {<div> {console.log(editorNote.text)}</div>} */}
      <div style={{ height: 300 }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default Alleditor;
