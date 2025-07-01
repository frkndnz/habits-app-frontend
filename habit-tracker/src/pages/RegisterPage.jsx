import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseFieldErrors } from "../utils/parseFieldErrors";
import { registerUser } from "../features/auth/authSlice";
import { Eye, EyeOff } from "lucide-react";


const InputComponent = ({ name, label, type, value, onChange, errorMap = {}, show, onChangeShow }) => (
    <div className="mb-3">
        <label
            htmlFor={name}
            className="block mb-1 text-gray-700 dark:text-gray-300 font-medium text-sm"
        >
            {label}
        </label>
        <div className="relative">

            <input
                type={type || "text"}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required
                className={`w-full p-0.5 sm:p-1 rounded-md border ${errorMap[name]
                    ? "border-red-500 focus:border-red-600 focus:ring-red-500"
                    : "border-gray-300 focus:border-teal-500 focus:ring-teal-400"
                    } focus:outline-none focus:ring-2 transition text-sm sm:text-md`}
            />
            {name === "password" && (
                <button
                    type="button"
                    onClick={onChangeShow}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                >
                    {show ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            )}
        </div>
        {errorMap[name] && (
            <p className="mt-1 text-sm text-red-500">{errorMap[name]}</p>
        )}
    </div>

)

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, errorMessages, message } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMap, setErrorMap] = useState(parseFieldErrors(errorMessages));
    useEffect(() => {
        setErrorMap(parseFieldErrors(errorMessages));
        console.log("errorMap", parseFieldErrors(errorMessages));
    }, [errorMessages]);


    const [formData, setFormData] = useState({
        email: "",
        userName: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerUser(formData));
        if (result.payload.isSuccess) {
            navigate("/auth/login");
        } else {

        }

    };


    return (
        <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center gap-15 sm:gap-30  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
            <div className=" w-full max-w-md   flex justify-start">
                <div className=" p-6 rounded-lg flex flex-col items-center justify-center shadow w-full sm:ml-[-40px] sm:mt-[-100px]">
                    <img src="/new.svg" className="w-1/2 sm:w-fit   ">
                    </img>
                    <h2 className="font-montserrat font-bold text-white text-3xl">Welcome to HabitFlux</h2>
                    <p className="text-white text-center mt-4 text-sm sm:text-base max-w-sm">
                        Build better habits. One day at a time
                    </p>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 w-full max-w-md p-5 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-xl sm:text-2xl   font-bold text-center text-gray-800 dark:text-white mb-3">
                    Register
                </h2>
                 {errorMessages &&
                        errorMessages.filter(msg=>!msg.includes(":")).map((msg, index) => (
                            <p key={index} className="text-red-500 text-sm mb-3">
                                {msg}
                            </p>
                        ))}
                <InputComponent
                    name="userName"
                    label="User name"
                    value={formData.userName}
                    onChange={handleChange}
                    errorMap={errorMap}
                />
                <InputComponent
                    name="firstName"
                    label="FirstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    errorMap={errorMap}
                />
                <InputComponent
                    name="lastName"
                    label="LastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    errorMap={errorMap}
                />
                <InputComponent
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    errorMap={errorMap}
                />


                <InputComponent
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    errorMap={errorMap}
                    show={showPassword}
                    onChangeShow={() => setShowPassword(!showPassword)}
                />



                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 py-2  bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-6">
                    Already have an account?{" "}
                    <a
                        href="/auth/login"
                        className="text-teal-500 hover:underline font-medium"
                    >
                        Login here
                    </a>
                </p>
            </form>
        </div>

    )

}

export default RegisterPage;