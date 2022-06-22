import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useMarvelService from "../API/service";



const initialState = {
    id: null,
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
    loading: false,
    error: false
}

export const fetchRandom = createAsyncThunk(
    'random/fetchRandom',
    async (charID) => {
        const { getCharacter } = useMarvelService();
        return await getCharacter(charID);
    }
);

const RandomSlice = createSlice({
    name: 'random',
    initialState,
    reducers: {
        unsetRandom(state) {
            state.id = null;
            state.name = null;
            state.description = null;
            state.thumbnail = null;
            state.homepage = null;
            state.wiki = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandom.pending, state => { state.loading = true })
            .addCase(fetchRandom.fulfilled, (state, action) => {
                state.loading = false;
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.description = action.payload.description;
                state.thumbnail = action.payload.thumbnail;
                state.homepage = action.payload.homepage;
                state.wiki = action.payload.wiki;
            })
            .addCase(fetchRandom.rejected, state => {
                state.loading = false;
                state.error = true;

            })
            .addDefaultCase(() => { })
    }
});

const { actions, reducer } = RandomSlice;

export const {unsetRandom} = actions;
export default reducer;
