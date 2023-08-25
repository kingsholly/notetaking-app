//import Quill from "quill";
import "../Editor.css";
import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
function Editor({ editorNote }) {
  const [notey, setNotey] = useState(editorNote.text);
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
      quill.clipboard.dangerouslyPasteHTML(notey);
      console.log("notey1", notey);
      quill.on("text-change", () => {
        //console.log("Text change!");
        console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        //editorNote.setNote.text(quill.root.innerHTML);
        //console.log(setNote.te);
        setNotey(quill.getText());
        console.log("notey", notey);
      });
    }
  }, [quill]);
  return (
    <div>
      {/* {<div> {console.log(editorNote.text)}</div>} */}
      <div style={{ width: 650, height: 300 }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default Editor;
