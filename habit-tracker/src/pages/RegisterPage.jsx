import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseFieldErrors } from "../utils/parseFieldErrors";
import { registerUser } from "../features/auth/authSlice";


const InputComponent = ({ name, label, type, value, onChange, errorMap = {} }) => (
    <div className="mb-5">
        <label
            htmlFor={name}
            className="block mb-2 text-gray-700 dark:text-gray-300 font-medium"
        >
            {label}
        </label>
        <input
            type={type || "text"}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required
            className={`w-full px-4 py-2 rounded-md border ${errorMap[name]
                    ? "border-red-500 focus:border-red-600 focus:ring-red-500"
                    : "border-gray-300 focus:border-teal-500 focus:ring-teal-400"
                } focus:outline-none focus:ring-2 transition`}
        />
        {errorMap[name] && (
            <p className="mt-1 text-sm text-red-500">{errorMap[name]}</p>
        )}
    </div>

)

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, errorMessages, message } = useSelector((state) => state.auth);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Register
                </h2>

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
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    errorMap={errorMap}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>

    )

}

export default RegisterPage;