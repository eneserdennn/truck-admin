import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

// GET: https://truckapi.eneserden.com/api/spares/
export const fetchspares = createAsyncThunk('spare/fetchspares', async () => {
    const response = await axios.get('https://truckapi.eneserden.com/api/spares/');
    return response.data;
});

// POST: https://truckapi.eneserden.com/api/spares/
export const createspare = createAsyncThunk('spare/createspare', async (spareData) => {
    // with token
    const response = await axios.post('https://truckapi.eneserden.com/api/spares/', spareData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

export const updatespare = createAsyncThunk('spare/updatespare', async (spareData) => {
    // with token
    const response = await axios.put(`https://truckapi.eneserden.com/api/spares/${spareData.id}`, spareData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

// DELETE: https://truckapi.eneserden.com/api/spares/{id}
export const deletespare = createAsyncThunk('spare/deletespare', async (id) => {
    // with token
    await axios.delete(`https://truckapi.eneserden.com/api/spares/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return id;
});

// Slice oluşturma

const spareSlice = createSlice({
    name: 'spare',
    initialState: {
        spares: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchspares.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchspares.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.spares = action.payload;
            })
            .addCase(fetchspares.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createspare.fulfilled, (state, action) => {
                state.spares.push(action.payload);
            })
            .addCase(updatespare.fulfilled, (state, action) => {
                const {id, spareData} = action.payload;
                const existingspare = state.spares.find((spare) => spare.id === id);
                if (existingspare) {
                    Object.assign(existingspare, spareData);
                }
            })
            .addCase(deletespare.fulfilled, (state, action) => {
                const id = action.payload;
                state.spares = state.spares.filter((spare) => spare.id !== id);
            });
    },
});

export default spareSlice.reducer;

