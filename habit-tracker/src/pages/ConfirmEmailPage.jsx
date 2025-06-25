import React, { use } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";


const ConfirmEmailPage = () => {

    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Email onaylanıyor...");
    const [showResend, setShowResend] = useState(false);
   
    useEffect(() => {
        const token = searchParams.get("token");
        const userId = searchParams.get("userId");

        if (userId && token) {
            confirmEmail(token, userId);
        }
        else {
            setMessage("Geçersiz istek. Lütfen tekrar deneyin.");
        }


    }, [searchParams]);

    const confirmEmail = async (token, userId) => {
        try {
            const response = await API.get(`auth/confirm-email?token=${(encodeURIComponent(token))}&userId=${userId}`);

            if (response.data.isSuccess) {
                setMessage("Email has been confirmed successfully. You can log in.");
            }
            else {
                setMessage("Email verification failed. Please try again." + response.data?.message);
                console.log("Email failed error:", response.data);
            }

        }
        catch (error) {

            const errorMessage = error.response?.data.errorMessages;
            console.log((errorMessage));
            setMessage("Email verification failed. Please try again. " + errorMessage[0]);
            if (errorMessage[0] === "InvalidToken") {
                setMessage("Invalid token, please request email again.");
                setShowResend(true);
            }
        }

    }
    const handleResend = async () => {
        try {
             const userId = searchParams.get("userId");
            const response = await API.post(`auth/resend-confirmation`, {  userId });
            if (response.data.isSuccess) {
                setMessage("sended email please check!");
            }
            else {
                setMessage("Email resend failed. Please try again." + response.data?.message);
                console.log("Email resend error:", response.data);
            }
        } catch (error) {
            const errorMessages = error.response?.data?.errorMessages;
            console.log((errorMessages));
            setMessage(
                "Email sending failed. Please try again. " +
                (errorMessages?.[0] ?? "Unknown error")
            );
        }

    }

    return (
        <div className="container p-10">
            <p>{message}</p>
            {showResend && (
                <button onClick={handleResend} className="bg-gray-400 font-bold mt-6 p-4 shadow-lg rounded-lg cursor-pointer">
                    Resend Confirmation Email
                </button>
            )}
        </div>
    )

}
export default ConfirmEmailPage;