
export const parseFieldErrors = (errorMessages) => {
    const errorMap = {};
    if(!Array.isArray(errorMessages)) {
        return errorMap;
    }

    errorMessages.forEach((error)=>{
        const[field, message] = error.split(":").map(s=>s.trim());
        if(field && message) {
            errorMap[field.charAt(0).toLowerCase() + field.slice(1)] = message;
        }
    });

    return errorMap;
}