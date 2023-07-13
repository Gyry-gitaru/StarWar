import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOAD_STATE } from "../../constants";

const fetchVehicles = async (selectedPerson) => {
    const vehiclePromises = selectedPerson.vehicles.map(vehicleUrl => fetch(vehicleUrl));
    const responses = await Promise.all(vehiclePromises);
    const vehicles = await Promise.all(responses.map(response => response.json()));
    return vehicles;
};

const fetchStarships = async (selectedPerson) => {
    const starshipPromises = selectedPerson.starships.map(starshipUrl => fetch(starshipUrl));
    const responses = await Promise.all(starshipPromises);
    const starships = await Promise.all(responses.map(response => response.json()));
    return starships;
};

export const fetchVehiclesAsync = createAsyncThunk(
    'selectedPerson/fetchVehicles',
    async (selectedPerson, thunkAPI) => {
        const response = await fetchVehicles(selectedPerson);
        return response;
    }
);

export const fetchStarshipsAsync = createAsyncThunk(
    'selectedPerson/fetchStarships',
    async (selectedPerson, thunkAPI) => {
        const response = await fetchStarships(selectedPerson);
        return response;
    }
);

export const selectedPersonSlice = createSlice({
    name: 'selectedPerson',
    initialState: {
        person: null,
        vehicles: [],
        starships: [],
    },
    reducers: {
        selectPerson: (state, action) => {
            state.person = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehiclesAsync.pending, (state) => {
                 state.status = LOAD_STATE.LOADING;
             })
             .addCase(fetchStarshipsAsync.pending, (state) => {
                 state.status = LOAD_STATE.LOADING;
             })
            .addCase(fetchVehiclesAsync.fulfilled, (state, action) => {
                state.vehicles = action.payload;
                state.status = LOAD_STATE.SUCCESS;
            })
            .addCase(fetchStarshipsAsync.fulfilled, (state, action) => {
                state.starships = action.payload;
                state.status = LOAD_STATE.SUCCESS;
            })
             .addCase(fetchVehiclesAsync.rejected, (state) => {
                state.status = LOAD_STATE.REJECT;
            })
            .addCase(fetchStarshipsAsync.rejected, (state) => {
                state.status = LOAD_STATE.REJECT;
            })
    },
});

export const { selectPerson } = selectedPersonSlice.actions;

export default selectedPersonSlice.reducer;
