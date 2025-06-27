import { baseApi } from "../baseApi";

export const aiApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        sendPromtGemini:builder.mutation({
            query:(prompt)=>({
                url:"ai/gemini",
                method:"POST",
                body:prompt
           }),
        })
    })
})

export const{
    useSendPromtGeminiMutation
}=aiApi;