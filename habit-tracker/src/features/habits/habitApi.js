import { baseApi } from '../baseApi';
export const habitApi = baseApi.injectEndpoints({
   
    endpoints: (builder) => ({
        getHabits: builder.query({
            query: () => 'habits',
            transformResponse:(response)=>{
                console.log("response", response);
                return{
                    value: response.value,
                    isSuccess:response.isSuccess,
                    errorMessages: response.errorMessages,
                    message: response.message,
                }
            },
            providesTags:['Habits'],
        }),
        addHabit: builder.mutation({
            query: (habit) => ({
                url: 'habits',
                method: 'POST',
                body: habit,
            }),
            transformResponse:(response)=>{
                return{
                    value: response.value,
                    isSuccess:response.isSuccess,
                    errorMessages: response.errorMessages,
                    message: response.message,
                }
            },
            invalidatesTags: ['Habits','HabitDetails','SummaryStats'],
        }),
        getHabitById:builder.query({
            query:(id)=>({
                url:`habits/${id}`,
                method:'GET',
            })
        }),
        updateHabit: builder.mutation({
            query: (habit) => ({
                url: `habits/${habit.id}`,
                method: 'PUT',
                body: habit,
            }),
            transformResponse:(response)=>{
                return{
                    value: response.value,
                    isSuccess:response.isSuccess,
                    errorMessages: response.errorMessages,
                    message: response.message,
                }
            },
            invalidatesTags: ['Habits','HabitDetails','SummaryStats'],
        }),
        deleteHabit: builder.mutation({
            query: (id) => ({
                url: `habits/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Habits','HabitDetails','SummaryStats'],
        }),
        transformResponse:(response)=>{
                return{
                    value: response.value,
                    isSuccess:response.isSuccess,
                    errorMessages: response.errorMessages,
                    message: response.message,
                }
            }
    }),
});

export const {
    useGetHabitsQuery,
    useAddHabitMutation,
    useUpdateHabitMutation,
    useDeleteHabitMutation,
    useGetHabitByIdQuery,
} = habitApi;