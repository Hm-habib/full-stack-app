import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/authValidator";


function UserDashboard() {
  const [showError, setShowError] = useState(null);
  const [user, setUser] = useState({
    id: "",
    address: "",
    email: "",
    phoneNumber: "",
    username: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    let userDetails = async () => {
      const isLoggedIn = await isAuthenticated()
      // console.log(isLoggedIn)
      if(!isLoggedIn) navigate('/');

      try {
        const response = await userData();
        setUser((prev) => ({
          ...prev,
          username: response.data.username,
          email: response.data.email,
          id: response.data.id,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,
        }));

        // console.log(response.data);
      } catch (error) {
        console.log(error);
        console.log(showError);
      }
    };
    userDetails();
  }, []);

  const userData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user-dashboard",

        { withCredentials: true }
      );

      return response;
    } catch (err) {
  
      if (err.response && err.response.data.error) {
        setShowError(err.response.data.error);
      } else {
        console.error("server error:", err.message);
        setShowError(err.message);
      }
    }
  };

  async function handleLogout() {
    const response = await axios.post(
      "http://localhost:3000/user-logout",
      {},
      {
        withCredentials: true,
      }
    );
    navigate("/");
    console.log(response.data);
  }

  return (
    <div>
      <div className="w-2xs h-60 mt-10 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          User Profile
        </h2>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Username:</span>
          <span className="ml-2 text-gray-900">{user.username}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="ml-2 text-gray-900">{user.email}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Phone:</span>
          <span className="ml-2 text-gray-900">{user.phoneNumber}</span>
        </div>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Address:</span>
          <span className="ml-2 text-gray-900">{user.address}</span>
        </div>
      </div>
      <div>
        <button className="mt-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
