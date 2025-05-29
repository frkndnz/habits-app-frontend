export const handleFulfilled = (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.value = action.payload.value;
    state.message = action.payload.message || "İşlem başarılı";
    state.errorMessages = null;
};

export const handleRejected = (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.value = null;
    state.message = action.payload.message || "Bir hata oluştu";;
    state.errorMessages = action.payload.errorMessages || ["Bir hata oluştu"];
}

export const handlePending = (state) => {
    state.isLoading = true;
    state.isSuccess = false;
    state.value = null;
    state.message = null;
    state.errorMessages = null;
}