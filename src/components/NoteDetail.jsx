import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
function NoteDetail() {
  const [note, setNote] = useState(null);
  const { user } = UserAuth();
  const params = useParams();

  useEffect(() => {
    if (user) {
      const fetchNote = async () => {
        try {
          const noteDoc = await getDoc(
            doc(db, "notes", user.uid, "notes", params.noteId)
          );
          if (noteDoc.exists()) {
            setNote(noteDoc.data());
          } else {
            // Handle the case where the note doesn't exist
            console.log("Note not found");
          }
        } catch (error) {
          // Handle any errors that may occur during fetching
          console.error("Error fetching note:", error);
        }
      };

      fetchNote();
    }
  }, [params.noteId, user, user.uid]);

  return (
    <div>
      NoteDetail
      <h1>The url app is {params.noteId}</h1>
      {user.uid}
      <div>
        <h2>Note Details</h2>
        {note ? (
          <div>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            {/* Render other note details here */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default NoteDetail;
