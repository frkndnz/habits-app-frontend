import {createSlice,createSelector,createEntityAdapter} from '@reduxjs/toolkit';
import { handleFetchHabits } from './fetchHabit';
import { handleAddHabit } from './addHabit';
import { handleUpdateHabit } from './updateHabit';
import { handleDeleteHabit } from './deleteHabit';

export const habitsAdapter = createEntityAdapter();

const initialState = habitsAdapter.getInitialState({
  isLoading: false,
  isSuccess: false,
  errorMessages: null,
  message: null,
});

export const {
  selectAll: selectAllHabits,
  selectById: selectHabitById,
  selectIds: selectHabitIds,
  selectEntities: selectHabitEntities,
  
} = habitsAdapter.getSelectors((state) => state.habit);

export const selectHabitWithId = createSelector(
  [selectHabitById, (state, id) => id],
  (habit, id) => habit ? { ...habit, id } : null
);


const habitSlice = createSlice({
    name: 'habit',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        handleFetchHabits(builder);
        handleAddHabit(builder);
        handleUpdateHabit(builder);
        handleDeleteHabit(builder);
    },
});


export default habitSlice.reducer;