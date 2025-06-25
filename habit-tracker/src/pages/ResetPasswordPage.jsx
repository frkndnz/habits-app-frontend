import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../features/auth/authApi";
import { Eye, EyeOff } from "lucide-react";

export const ResetPasswordPage = () => {

    const [resetPassword, { isLoading, isError, isSuccess, data }] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [newPassword, setNewPassword] = useState("");
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log({ email, token, newPassword });
            await resetPassword({ email, token, newPassword }).unwrap();

        } catch (error) {
            console.log("error", error);
            if (error.data?.errorMessages) {
                setErrorMessages(error?.data?.errorMessages);
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <div className="w-full justify-items-center ">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        Reset Password
                    </h2>

                    {errorMessages &&
                        errorMessages.map((msg, index) => (
                            <p key={index} className="text-red-500 text-sm mb-3">
                                {msg}
                            </p>
                        ))}

                    <div className="mb-5">
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Enter New Password
                        </label>
                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                                placeholder="*******"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                tabIndex={-1}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>



                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition"
                    >
                        {isLoading ? "Reset..." : "Confirm "}
                    </button>

                    {isSuccess && <p>Please login!</p>}

                </form>

            </div>
        </div>
    );
};