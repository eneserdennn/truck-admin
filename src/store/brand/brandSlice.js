import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

// GET: http://localhost:8800/api/brands/
export const fetchbrands = createAsyncThunk('brand/fetchbrands', async () => {
    const response = await axios.get('http://localhost:8800/api/brands/');
    return response.data;
});

// POST: http://localhost:8800/api/brands/
export const createbrand = createAsyncThunk('brand/createbrand', async (brandData) => {
    // with token
    const response = await axios.post('http://localhost:8800/api/brands/', brandData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

export const updatebrand = createAsyncThunk('brand/updatebrand', async (brandData) => {
    // with token
    const response = await axios.put(`http://localhost:8800/api/brands/${brandData.id}`, brandData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

// DELETE: http://localhost:8800/api/brands/{id}
export const deletebrand = createAsyncThunk('brand/deletebrand', async (id) => {
    // with token
    await axios.delete(`http://localhost:8800/api/brands/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return id;
});

// Slice oluşturma

const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        brands: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchbrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchbrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload;
            })
            .addCase(fetchbrands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createbrand.fulfilled, (state, action) => {
                state.brands.push(action.payload);
            })
            .addCase(updatebrand.fulfilled, (state, action) => {
                const {id, brandData} = action.payload;
                const existingbrand = state.brands.find((brand) => brand.id === id);
                if (existingbrand) {
                    Object.assign(existingbrand, brandData);
                }
            })
            .addCase(deletebrand.fulfilled, (state, action) => {
                const id = action.payload;
                state.brands = state.brands.filter((brand) => brand.id !== id);
            });
    },
});

export default brandSlice.reducer;

