import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useMarvelService from "../API/service";



const initialState = {
    heroes: [],
    loading: false,
    error: false
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async(offset) => {
        const {getAllCharacters} = useMarvelService();
        return  await getAllCharacters(offset);
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        unsetHeroes(state) {
            state.heroes.length = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.loading = true})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.loading = false;
                state.heroes = [...state.heroes, ...action.payload];
            })
            .addCase(fetchHeroes.rejected, state => {
                state.loading = false;
                state.error = true;
                
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export const {unsetHeroes} = actions;
export default reducer;
