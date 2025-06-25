import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../features/auth/authApi";


export const ForgotPasswordPage = () => {

     const [email, setEmail] = useState("");
     const[errorMessages,setErrorMessages]=useState([]);
    const [forgotPassword, { isLoading, isError, isSuccess,data }] = useForgotPasswordMutation();

    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
            await forgotPassword({email}).unwrap();
        } catch (error) {
            console.log("error",error);
            if(error.data?.errorMessages){
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
                        Forgot Password
                    </h2>

                    {errorMessages &&
                        errorMessages.map((msg, index) => (
                            <p key={index} className="text-red-500 text-sm mb-3">
                                {msg}
                            </p>
                        ))}

                    <div className="mb-5">
                        <label
                            htmlFor="emailOrUserName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Enter Email 
                        </label>
                        <input
                            type="text"
                            name="emailOrUserName"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                            placeholder="your.email@example.com"
                        />
                    </div>

                    

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition"
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>

                    {isSuccess && <p>Check your inbox!</p>}
                </form>
                
            </div>
        </div>
    )
}