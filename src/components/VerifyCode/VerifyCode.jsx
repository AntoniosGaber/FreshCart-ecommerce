import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function verifyCodeSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );

      
      navigate("/resetpassword");

    } catch (err) {
      
      setError(err.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={verifyCodeSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Verify Reset Code</h2>

      <input
        type="text"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        placeholder="Enter verification code"
        className="w-full border p-2 rounded mb-3"
      />

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>
    </form>
  );
}
