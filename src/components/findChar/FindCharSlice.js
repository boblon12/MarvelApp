import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useMarvelService from "../API/service";



const initialState = {
    char: [null],
    loading: false,
    error: false
}

export const fetchFindChar = createAsyncThunk(
    'findChar/fetchFindChar',
    async(parsedname) => {
        const {getCharacterByName} = useMarvelService();
        return  await getCharacterByName(parsedname);
    }
);


const FindCharSlice = createSlice({
    name: 'findChar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFindChar.pending, state => {state.loading = true})
            .addCase(fetchFindChar.fulfilled, (state, action) => {
                state.loading = false;
                state.char = action.payload
            })
            .addCase(fetchFindChar.rejected, state => {
                state.loading = false;
                state.error = true;
                
            })
            .addDefaultCase(() => {})
    }
});

const {reducer} = FindCharSlice;

export default reducer;
