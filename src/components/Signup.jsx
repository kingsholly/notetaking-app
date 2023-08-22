import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import book from "../assets/five.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [errow, setErrow] = useState("");
  const [Loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
  const { createUser, Googlesignin } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrow("");
    setLoading(true);
    try {
      const userCredential = await createUser(email, password);
      //setUid(credentials.user.uid);
      const newUser = userCredential.user;
      setUid(newUser.uid);
      const documentRef = doc(db, "users", newUser.uid);
      const updatedDocData = {
        fullname: fullname,
        uid: newUser.uid,
        email: newUser.email,
      };

      await setDoc(documentRef, updatedDocData);

      // await setDoc(doc(db, "userChats", user.uid), {});

      await setDoc(doc(db, "notes", newUser.uid), {});
      // const newNote = {
      //   title: "New Note Title",
      //   text: "This is the content of the new note.",
      //   time: serverTimestamp(), // Current time
      //   updatedAt: serverTimestamp(), // Initial value
      // };
      // await addDoc(notesref, newNote);
      console.log("User registered with ID:", newUser.uid);
      console.log("document written with id:");
      navigate("/dashboard");
    } catch (e) {
      setErrow(e.message);
      alert(e.message);
      setLoading(false);
      console.log(e.message, errow);
    }
  };
  const handleGoogle = async (e) => {
    e.preventDefault();
    setErrow("");
    try {
      await Googlesignin();
      navigate("/dashboard");
    } catch (e) {
      setErrow(e.message);
      alert(e.message);
      console.log(e.message);
    }
  };
  return (
    <div>
      {/* <div className="max-w-[700pz] mx-auto my-16 p-4">
        <div>
          <h1 className="text-2xl font-bold py-2">
            {" "}
            Sign up for a free account
          </h1>
          <p className="py-2">
            Already have an account yet?{" "}
            <Link to="/" className="underline">
              {" "}
              Sign in
            </Link>{" "}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3"
              type="email"
            />
          </div>

          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3"
              type="password"
            />
          </div>

          <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white ">
            Sign up
          </button>
        </form>
      </div> */}
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-16 ">
            <div>
              <h2 className="text-2xl font-bold py-2 text-[#002d74]">
                {" "}
                Register
              </h2>
              <p className="mt-2 text-sm text-[#002d74]">
                Already have an account yet?{" "}
                <Link to="/dashboard" className="underline">
                  {" "}
                  Sign in
                </Link>{" "}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="gap-4">
              <div className="flex flex-col py-2">
                <input
                  onChange={(e) => setFullname(e.target.value)}
                  className="rounded-xl border p-2 mt-8"
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="flex flex-col py-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border p-2"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col py-2 relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border p-2"
                  type="password"
                  placeholder="Password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
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
                  <span> Register Now </span>
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
              <p>If you already have an account</p>
              <button className="py-2 px-5 bg-white border rounded-xl  hover:bg-blue-500 scale-100 duration-300 ">
                Login
              </button>
            </div>
          </div>
          <div className="w-1/2 md:block hidden">
            <img className="rounded-2xl" src={book} alt="note-taking" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
