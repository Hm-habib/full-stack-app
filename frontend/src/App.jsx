import "./App.css";
import EditNote from "./component/editNote";
import ViewNote from "./component/viewNote";
import UserDashboard from "./dashboard/UserDashboard";
import UserLoginComponent from "./user/UserLoginComponent";
import UserSignupComponent from "./user/UserSignupComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-evenly gap-2">
      <Router>
        <Routes>
          <Route path="/" element={<UserLoginComponent />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/note/:id/view" element={<ViewNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route path="/signup" element={<UserSignupComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
