import { configureStore } from "@reduxjs/toolkit";

import peopleReducer from "./slicer/peopleSlice";
import selectedPersonReducer from "./slicer/selectedPersonSlice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    selectedPerson: selectedPersonReducer,
  },
});

