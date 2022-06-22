import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useMarvelService from "../API/service";


const initialState = {
    id: null,
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
    comics: [],
    loading: false,
    error: false
}

export const fetchHero = createAsyncThunk(
    'hero/fetchHero',
    async(id) => {
        const {getCharacter} = useMarvelService();
        return  await getCharacter(id);
    }
);

const heroeSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHero.pending, state => {state.loading = true})
            .addCase(fetchHero.fulfilled, (state, action) => {
                state.loading = false;
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.description = action.payload.description;
                state.thumbnail = action.payload.thumbnail;
                state.homepage = action.payload.homepage;
                state.wiki = action.payload.wiki;
                state.comics = action.payload.comics;
            })
            .addCase(fetchHero.rejected, state => {
                state.loading = false;
                state.error = true;
                
            })
            .addDefaultCase(() => {})
    }
});

const {reducer} = heroeSlice;

export default reducer;
