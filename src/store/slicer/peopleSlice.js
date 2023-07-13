import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATE } from "../../constants";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async (searchTerm) => {
    const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
    const data = await response.json();
    return data.results;
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    search: "",
    status: LOAD_STATE.LOADING,
    error: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = LOAD_STATE.LOADING;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = LOAD_STATE.SUCCESS;
        state.people = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = LOAD_STATE.REJECT;
        state.error = action.error.message;
      });
  },
});


export const { setSearch } = peopleSlice.actions;

export default peopleSlice.reducer;
