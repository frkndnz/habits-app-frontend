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
            invalidatesTags: ['Habits'],
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
            async onQueryStarted(habit, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        habitApi.util.updateQueryData('getHabits', undefined, (draft) => {
                            const index = draft.value.findIndex((h) => h.id === habit.id);
                            if (index !== -1) {
                                draft.value[index] = data.value;
                            }
                        })
                    );
                } catch (error) {
                    console.error('Update failed:', error);
                }
            }
        }),
        deleteHabit: builder.mutation({
            query: (id) => ({
                url: `habits/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Habits'],
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
} = habitApi;