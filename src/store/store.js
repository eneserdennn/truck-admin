import { configureStore } from '@reduxjs/toolkit';
import modelReducer from './model/modelSlice'
import brandReducer from './brand/brandSlice'
import spareSlice from "./spare/spareSlice";

const store = configureStore({
    reducer: {
        model: modelReducer,
        brand: brandReducer,
        spare: spareSlice,
    },
});

export default store;
