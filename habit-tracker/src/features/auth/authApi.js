import { baseApi } from "../baseApi";

export const authApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
         forgotPassword:builder.mutation({
            query:(data)=>({
                url:'auth/forgot-password',
                method:"POST",
                body:data,
                
            })
        }),
        resetPassword:builder.mutation({
          query:(data)=>({
            url:'auth/reset-password',
            method:"POST",
            body:data,
          }  )
        })
    })
})

export const {
    useForgotPasswordMutation,
    useResetPasswordMutation
}=authApi;