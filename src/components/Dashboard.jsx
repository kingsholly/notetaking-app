import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Allnotes from "./allnotes";
function Dashboard() {
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
  return (
    <section className="bg-gray-500  flex ">
      <div className="mx-auto my-3 p-4 bg-gray-100 rounded-2xl flex">
        <div className="w-20 mt-12   ">
          <div className="items-center align-center justify-center flex flex-col">
            <Link to="/addnote" className="underline">
              {" "}
              <button className=" bg-gray-900 rounded-3xl p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
                  width="15"
                  height="15"
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
                  width="15"
                  height="15"
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
                  width="15"
                  height="15"
                  fill="white"
                  className="bi bi-share"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </button>
            </Link>
            <p className="text-sm">Share</p>
          </div>
        </div>
        <div className="w-40 bg-green-500 border-l border-blue-500">
          {" "}
          <button onClick={handleLogout}>Logout</button>
          <Allnotes />
        </div>
        <div className="w-60 bg-yellow-500 ">
          {" "}
          notes
          <h1>Account</h1>
          {user ? (
            <div>
              {" "}
              <p>User Email: {user && user.email} </p>
              <p>User Auth : {user && user.uid}</p>
              <p>User name: {user && user.fullname}</p>{" "}
            </div>
          ) : (
            "Error"
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
