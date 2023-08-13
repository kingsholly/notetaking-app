import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4 ">Account</h1>
      <p>User Email: {user && user.email} </p>

      <p>User Auth : {user && user.uid}</p>

      <button
        onClick={handleLogout}
        className="border hover:bg-blue-500 py-2 px-6 my-4 "
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
