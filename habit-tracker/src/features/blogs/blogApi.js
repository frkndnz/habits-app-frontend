import { baseApi } from "../baseApi";

export const blogApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addBlogPost:builder.mutation({
            query:(blogPost)=>({
                url:'blogs',
                method:"POST",
                body:blogPost,
                
            })
        })
    })
})

export const {useAddBlogPostMutation}=blogApi;