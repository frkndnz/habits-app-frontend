import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseFieldErrors } from "../utils/parseFieldErrors";
import { registerUser } from "../features/auth/authSlice";


const InputComponent = ({ name, label,type, value ,onChange, errorMap={} }) => (
        <div className="mb-4">
            <label className="block mb-2" htmlFor={name}>{label}</label>
            <input
                type={type|| "text"}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border-3 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            {errorMap[name] && <span className="text-red-500 text-sm">{errorMap[name]}</span>}
        </div>
    )

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, errorMessages, message } = useSelector((state) => state.auth);

    const [errorMap, setErrorMap] = useState(parseFieldErrors(errorMessages)); 
    useEffect(()=>{
       setErrorMap(parseFieldErrors(errorMessages));
       console.log("errorMap",parseFieldErrors(errorMessages));
    },[errorMessages]);


    const [formData, setFormData] = useState({
        email: "",
        userName: "",
        password: "",
        firstName:"",
        lastName:""
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-gray-500 p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2x1 font-bold mb-4 text-center">Giriş Yap</h2>
                <InputComponent name="userName" label="Kullanıcı Adı" value={formData.userName} onChange={handleChange} errorMap={errorMap} />
                <InputComponent name="firstName" label="Ad" value={formData.firstName} onChange={handleChange} errorMap={errorMap} />
                <InputComponent name="lastName" label="Soyad" value={formData.lastName} onChange={handleChange} errorMap={errorMap} />
                <InputComponent name="email" label="E-posta" value={formData.email} onChange={handleChange} errorMap={errorMap} />
                <InputComponent name="password" label="Şifre" type="password" value={formData.password} onChange={handleChange} errorMap={errorMap} /> 
                
                <button type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={isLoading}>
                    {isLoading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
                </button>
            </form>
        </div>
    )

}

export default RegisterPage;