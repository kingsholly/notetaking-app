import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

function App() {
  const { user } = UserAuth;
  //const navigate = useNavigate();
  return (
    <div>
      {/* <h1 className="text-center text-3xl font-bold">
        Firebase Auth and Context
      </h1> */}
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
