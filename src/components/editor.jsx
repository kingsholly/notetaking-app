//import Quill from "quill";
import "../Editor.css";
import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
import { useEffect } from "react";
function Editor({ editorNote }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "underline", "italic"],

      [{ list: "ordered" }],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(editorNote.text);
      quill.on("text-change", () => {
        // console.log("Text change!");
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill, editorNote]);
  return (
    <div>
      {/* {<div> {console.log(editorNote.text)}</div>} */}
      <div style={{ width: 600, height: 300 }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default Editor;
