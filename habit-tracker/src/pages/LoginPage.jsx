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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-gray-500 p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2x1 font-bold mb-4 text-center">Giriş Yap</h2>
                {errorMessages &&
                    errorMessages.map((msg, index) => (
                        <p key={index} className="text-red-500 text-sm mb-2">
                            {msg}
                        </p>
                    ))}

                <div className="mb-4">
                    <label className="block mb-2" htmlFor="emailOrUserName">E-posta veya Kullanıcı Adı</label>
                    <input
                        type="text"
                        name="emailOrUserName"
                        value={formData.emailOrUserName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-3 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block  mb-2" htmlFor="password">Şifre</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-3 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></input>
                </div>
                <button type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={isLoading}>
                    {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}    
                </button>
                <button>
                    <p className="text-center mt-4">
                        Hesabın yok mu?{" "}
                        <a href="/auth/register" className="text-blue-500 hover:underline">
                            Kayıt Ol
                        </a>
                    </p>
                </button>
            </form>
        </div>

    )
}
export default LoginPage;