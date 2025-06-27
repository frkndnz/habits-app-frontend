import { baseApi } from "../baseApi";

export const feedbackApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getFeedbacks:builder.query({
            query:({page=1,pageSize=5})=> {
              const params=new URLSearchParams({
                page:page.toString(),
                pageSize:pageSize.toString()
              }) ;
              return {
                    url: `/feedbacks?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags:['Feedbacks'],

        }),
        addFeedback:builder.mutation({
            query:(data)=>({
                url:'feedbacks',
                method:"POST",
                body:data
            }),
            invalidatesTags:['Feedbacks']
        }),
    })
})

export const{
    useGetFeedbacksQuery,
    useAddFeedbackMutation
}=feedbackApi;