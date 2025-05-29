import {jwtDecode} from 'jwt-decode'; 

export const handleJwt = (token) => {
    const decodedToken = jwtDecode(token);
    return {
        user_id:decodedToken.user_id,
        user_name:decodedToken.user_name,
    };
};