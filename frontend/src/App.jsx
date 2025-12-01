import "./App.css";
import ViewNote from "./component/viewNote";
import UserDashboard from "./dashboard/UserDashboard";
import UserLoginComponent from "./user/UserLoginComponent";
import UserSignupComponent from "./user/UserSignupComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-evenly gap-5">
      <h2 className="text-2xl">Welcome to React</h2>
      <Router>
        <Routes>
          <Route path="/" element={<UserLoginComponent />}></Route>
          <Route path="/dashboard" element={<UserDashboard />}></Route>
          <Route path="/note/:id/view" element={<ViewNote />} />

          <Route path="/signup" element={<UserSignupComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
