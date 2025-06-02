import {jwtDecode} from 'jwt-decode'; 

export const handleJwt = (token) => {
    const decodedToken = jwtDecode(token);
    return {
        user_id:decodedToken.user_id,
        user_name:decodedToken.user_name,
    };
};

export const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime =Math.floor( Date.now() / 1000); // Convert to seconds
    return decodedToken.exp < currentTime;
}