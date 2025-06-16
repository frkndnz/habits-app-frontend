import { baseApi } from "../baseApi";

export const blogApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getBlogPosts:builder.query({
            query:({searchTerm="",page=1,pageSize=5})=> {
              const params=new URLSearchParams({
                searchTerm,
                page:page.toString(),
                pageSize:pageSize.toString()
              }) ;
              return {
                    url: `/blogs?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags:['BlogPosts'],

        }),
        getBlogPostById:builder.query({
            query:(id)=>({
                url:`blogs/${id}`,
                method:'GET'
            })
        }),
        addBlogPost:builder.mutation({
            query:(blogPost)=>({
                url:'blogs',
                method:"POST",
                body:blogPost,
                
            })
        }),
         deleteBlogPost: builder.mutation({
            query: (id) => ({
                url: `blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['BlogPosts'],
        }),
        updateBlogPost:builder.mutation({
            query:({id,blogPost})=>({
                url:`blogs/${id}`,
                method:'PUT',
                body:blogPost
            }),
            invalidatesTags: ['BlogPosts'],
        })
    })
})



export const {useAddBlogPostMutation,
            useGetBlogPostsQuery,
            useGetBlogPostByIdQuery,
            useDeleteBlogPostMutation,
            useUpdateBlogPostMutation
}=blogApi;