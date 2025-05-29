import React, { use } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";


const ConfirmEmailPage = () => {

    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Email onaylanıyor...");

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

    const confirmEmail = async ( token, userId ) => {
        try {
            const response = await API.get(`auth/confirm-email?token=${(encodeURIComponent(token))}&userId=${userId}`);

            if (response.data.isSuccess) {
                setMessage("Email başarıyla onaylandı. Giriş yapabilirsiniz.");
            }
            else {
                setMessage("Email onaylama işlemi başarısız oldu. Lütfen tekrar deneyin." + response.data?.message);
                console.log("Email onaylama hatası:", response.data);
            }

        }
        catch (error) {
            
            const errorMessage = error.response?.data ;
            console.log((errorMessage));
            setMessage("Email onaylama işlemi başarısız oldu. Lütfen tekrar deneyin. " );
        }



    }

    return (
        <div>
            <p>{message}</p>
        </div>
    )

}
export default ConfirmEmailPage;