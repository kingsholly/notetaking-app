import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  deleteDoc,
  query,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";
import Editor from "./editor";

function Dashboard() {
  const [notes, setNotes] = useState(null);
  const [note, setNote] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [noteid, setNoteid] = useState(null);
  const { user, logout } = UserAuth();
  const Navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      Navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  const filterNote = () => {
    const notesCopy = notes.filter((note) => note.id !== noteid);
    console.log(notesCopy);
    setNotes(notesCopy);
  };
  const saveNote = () => {
    if (note.text === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required!",
      });
    }

    console.log(noteid, note.id, note.title, note.text);
  };
  const deleteNote = () => {
    //alert(noteid);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete my note!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "notes", user.uid, "notes", noteid));
        // Navigate("/dashboard");
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
        const notesCopy = notes.filter((note) => note.id !== noteid);
        console.log(notesCopy);
        setNotes(notesCopy);
        setNote("");
      }
    });
  };
  const consoleInfo = (e) => {
    const singleNotes = async () => {
      const querySnapshot = await getDoc(
        doc(db, "notes", user.uid, "notes", e)
      );
      const allNotes = querySnapshot.data();
      setNote(allNotes);
    };
    singleNotes();
    setNoteid(e);
  };

  useEffect(() => {
    const getNotes = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "notes", user.uid, "notes"),
          orderBy("time", "desc")
        )
      );
      const allNotes = querySnapshot.docs.map((doc) => {
        // console.log(dayjs.unix(doc.data().time).format("DD, MMMM"));

        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().time,

          //time: formatDate(doc.)
        };
      });
      //querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      //console.log(uid);
      //});
      setNotes(allNotes);
    };

    user && getNotes();
  }, [user]);

  return (
    <section className="bg-yellow-500 h-screen  flex justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg w-4/5 md:m-20">
        <div className="w-1/12 mt-20  lg:block hidden ">
          <div className="items-center align-center justify-center flex flex-col">
            <Link to="/addnote" className="underline">
              {" "}
              <button className=" bg-gray-900 rounded-3xl p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  fill="white"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
              </button>
            </Link>{" "}
            <Link to="/signup" className="underline">
              <button className=" bg-yellow-500 rounded-3xl p-3 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  fill="black"
                  className="bi bi-check-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </button>
            </Link>
            <p className="text-sm">Task</p>
            <Link to="/addnote" className="underline">
              <button className=" bg-green-800 rounded-3xl p-3 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  fill="white"
                  className="bi bi-journal-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                </svg>
              </button>
            </Link>
            <p className="text-sm">Notes</p>
            <Link to="/signup" className="underline">
              <button className=" bg-orange-400 rounded-3xl p-3 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  fill="white"
                  className="bi bi-share"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </button>
            </Link>
            <p className="text-sm">Share</p>
            <Link to="" className="underline">
              <button
                className=" bg-blue-400 rounded-3xl p-3 mt-4"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  fill="white"
                  className="bi bi-share"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </button>
            </Link>
            <p className="text-sm">Logout</p>
          </div>
        </div>
        <div className="md:w-7/12 border-l border-bl-500 p-3 overflow-y-auto ">
          {" "}
          <div className="my-5">
            {/* <Link to="/dashboard" className="text-sm">
              {" "}
              go back
            </Link>{" "}
            <button onClick={handleLogout}>Logout</button> */}

            {user ? (
              <div>
                {" "}
                <p>Welcome, {user.fullname}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          {notes ? (
            <div>
              {notes.map((note) => (
                <div
                  onClick={() => consoleInfo(note.id)}
                  key={note?.id}
                  className="my-5 hover:bg-[#bde3b2] flex p-5 cursor-pointer"
                >
                  <div className="mr-5 text-center">
                    {" "}
                    {Number(dayjs.unix(note.time).format("DD")) + 1} <br></br>
                    {dayjs.unix(note.time).format("MMMM")} <br />
                    <Link
                      to={`/notes/${note.id}`}
                      className="underline"
                      onClick={() => consoleInfo(note.id)}
                    >
                      {" "}
                      <button className="rounded-3xl p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="black"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </button>
                    </Link>{" "}
                  </div>
                  <div>
                    {" "}
                    <h2 className="font-medium">
                      {" "}
                      {note.title.substring(0, 10) + "..."}
                    </h2>
                    <div className="text-sm mt-3">
                      {" "}
                      {/* {note?.text.substring(0, 100) + "..."}{" "} */}
                      {parse(note.text.substring(0, 100) + "...")}{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Link to="/addnote">Add a New Note</Link>
            </div>
          )}
        </div>
        <div className="w-full bg-[#5200ff] rounded-r-xl text-white p-8  lg:block hidden">
          {" "}
          {/* {user ? (
            <div>
              {" "}
              <p>User Email: {user && user.email} </p>
              <p>User Auth : {user && user.uid}</p>
              <p>User name: {user && user.fullname}</p>
            </div>
          ) : (
            "Error"
          )} */}
          {note ? (
            <div className="">
              <button
                onClick={deleteNote}
                className="mb-12  border border-white p-2 hover:bg-[#ffffff] hover:text-[#5200ff] scale-100 duration-300 py-2 my-2 rounded-2xl text-white "
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
                        <stop
                          stopColor="#fff"
                          stopOpacity=".631"
                          offset="63.146%"
                        />
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
                  <span> Delete Note </span>
                )}
              </button>

              <p className="text-xs"> {note.time.toDate().toDateString()}</p>
              <h3 className="text-4xl font-medium mt-2 mb-6"> {note.title} </h3>
              {/* <h5
                className="text-base" //contentEditable="true"
              >
                {" "}
                {note.text}{" "}
              </h5> */}

              <div
                className="text-base" //contentEditable="true"
              >
                {" "}
                {/* {parse(note.text)}{" "} */}
                <Editor editorNote={note} noteId={noteid} />
              </div>

              {/* {dayjs.unix(note.time).format("DD MMMM YYYY")} {note.time.toDate().toDateString()} */}
            </div>
          ) : (
            "No note to show "
          )}
          {/* {note && <Editor editorNote={note} />} */}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
