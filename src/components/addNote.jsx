import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

import Alleditor from "./allEditor";
function Addnote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errow, setErrow] = useState("");
  const [Loading, setLoading] = useState(false);
  const { user, handleGoogle } = UserAuth();
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setErrow("");
    console.log(user.uid);
    setLoading(true);
    try {
      const notesref = collection(doc(db, "notes", user.uid), "notes");
      const newNote = {
        title: title,
        text: text,
        time: serverTimestamp(), // Current time
        updatedAt: serverTimestamp(), // Initial value
      };
      await addDoc(notesref, newNote);
      navigate("/dashboard");
    } catch (e) {
      setErrow(e.message);
      alert(e.message);
      setLoading(false);
      console.log(e.message, errow);
    }
  };
  // const handleNote = async (e) => {
  //   e.preventDefault();
  //   setErrow("");
  //   setLoading(true);
  //   try {
  //     await addNote(title, text, user.uid);
  //     navigate("/dashboard");
  //   } catch (e) {
  //     setErrow(e.message);
  //     setLoading(false);
  //     // alert(e.message);
  //     console.log(e.message, errow);
  //     console.log(title, text, user.uid);
  //   }
  // };

  return (
    <div>
      <section className="bg-gray-50 min-h-screen items-center justify-center">
        <div className="bg-gray-100 rounded-2xl mx-auto shadow-lg max-w-4xl p-5 items-center">
          <div className="w-100 px-16 ">
            <div>
              <h2 className="text-2xl font-bold py-2 text-[#002d74]">
                {" "}
                Add a Note
              </h2>
              <p className="mt-2 text-sm text-[#002d74]">
                Tell me whats on your mind{" "}
                <Link to="/" className="underline">
                  {" "}
                  Sign in
                </Link>{" "}
              </p>
            </div>
            <form onSubmit={formSubmit} className="gap-4">
              <div className="flex flex-col py-2">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl border p-2 mt-8"
                  type="text"
                  placeholder="Note Title"
                />
              </div>
              <div className="flex flex-col py-2">
                <Alleditor handleText={setText} />
                {/* <textarea
                  onChange={(e) => setText(e.target.value)}
                  className="rounded-xl border p-2 mt-8"
                  type="text"
                  placeholder="Note content"
                  rows="10"
                  cols="100" */}
              </div>

              <button
                className="border  bg-[#002d74] hover:bg-blue-500 scale-100 duration-300 py-2 my-2 rounded-2xl w-full text-white "
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
                  <span> Create Note </span>
                )}
              </button>
            </form>

            <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-xs">OR</p>
              <hr className="border-gray-400" />
            </div>
            <button
              onClick={handleGoogle}
              className="border bg-white w-full rounded-xl hover:bg-blue-500 scale-100 duration-300 py-2 mt-5 flex justify-center items-center text-sm "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                fill="currentColor"
                className="bi bi-google mr-3"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Register with Google
            </button>
            <p className="mt-5 text-xs border-b border-gray-400 py-4">
              Forgot Password?
            </p>
            <div className="mt-3 text-xs flex justify-between items-center">
              <p>Want to see all notes?</p>
              <button className="py-2 px-5 bg-white border rounded-xl  hover:bg-blue-500 scale-100 duration-300 ">
                <Link to="/dashboard" className="underline">
                  {" "}
                  Dashboard
                </Link>{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Addnote;
