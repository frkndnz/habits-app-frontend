import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, errorMessages, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        emailOrUserName: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));
        if (result.payload.isSuccess) {
            navigate("/");
        } else {

        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Giriş Yap
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
                        E-posta veya Kullanıcı Adı
                    </label>
                    <input
                        type="text"
                        name="emailOrUserName"
                        value={formData.emailOrUserName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Şifre
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition"
                >
                    {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    Hesabın yok mu?{" "}
                    <a
                        href="/auth/register"
                        className="text-teal-500 hover:underline font-medium"
                    >
                        Kayıt Ol
                    </a>
                </p>
            </form>
        </div>


    )
}
export default LoginPage;