import { useState } from "react";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const onSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/users/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      console.log(await response.json());
      // return data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600"
            onClick={onSendEmail}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
