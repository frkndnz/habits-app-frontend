import { baseApi } from "../baseApi";

export const categoryApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getCategories:builder.query({
            query:()=>"categories",
            providesTags:["Category"],
        }),
        addCategory:builder.mutation({
            query:(newCategory)=>({
                url:'categories',
                method:'POST',
                body:newCategory
            }),
            invalidatesTags:['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation
}=categoryApi;