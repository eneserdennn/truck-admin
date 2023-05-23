import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

// GET: https://truckapi.eneserden.com/api/models/
export const fetchModels = createAsyncThunk('model/fetchModels', async () => {
    const response = await axios.get('https://truckapi.eneserden.com/api/models/');
    return response.data;
});

// POST: https://truckapi.eneserden.com/api/models/
export const createModel = createAsyncThunk('model/createModel', async (modelData) => {
    // with token
    const response = await axios.post('https://truckapi.eneserden.com/api/models/', modelData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

export const updateModel = createAsyncThunk('model/updateModel', async (modelData) => {
    // with token
    const response = await axios.put(`https://truckapi.eneserden.com/api/models/${modelData.id}`, modelData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

// DELETE: https://truckapi.eneserden.com/api/models/{id}
export const deleteModel = createAsyncThunk('model/deleteModel', async (id) => {
    // with token
    await axios.delete(`https://truckapi.eneserden.com/api/models/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return id;
});

// Slice oluşturma

const modelSlice = createSlice({
    name: 'model',
    initialState: {
        models: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchModels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchModels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.models = action.payload;
            })
            .addCase(fetchModels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createModel.fulfilled, (state, action) => {
                state.models.push(action.payload);
            })
            .addCase(updateModel.fulfilled, (state, action) => {
                const {id, modelData} = action.payload;
                const existingModel = state.models.find((model) => model.id === id);
                if (existingModel) {
                    Object.assign(existingModel, modelData);
                }
            })
            .addCase(deleteModel.fulfilled, (state, action) => {
                const id = action.payload;
                state.models = state.models.filter((model) => model.id !== id);
            });
    },
});

export default modelSlice.reducer;

