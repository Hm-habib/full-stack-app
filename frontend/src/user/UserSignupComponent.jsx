import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserSignupComponent() {
  const [form, setForm] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/user-signup-ok",
        form,
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/"); // redirect to login page
      }
    } catch (err) {
      setError(err.response?.data || "Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-black mb-8 font-bold text-3xl text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            className="w-full border p-2 mb-3 text-black"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            className="w-full border p-2 mb-3 text-black"
            onChange={handleChange}
          />
          <input
            name="phoneNumber"
            placeholder="phoneNumber"
            className="w-full border p-2 mb-3 text-black"
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="address"
            className="w-full border p-2 mb-3 text-black"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-3 text-black"
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 mb-6 text-black"
            onChange={handleChange}
          />

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSignupComponent;
