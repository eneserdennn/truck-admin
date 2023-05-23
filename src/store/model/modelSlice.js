import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

// GET: http://localhost:8800/api/models/
export const fetchModels = createAsyncThunk('model/fetchModels', async () => {
    const response = await axios.get('http://localhost:8800/api/models/');
    return response.data;
});

// POST: http://localhost:8800/api/models/
export const createModel = createAsyncThunk('model/createModel', async (modelData) => {
    // with token
    const response = await axios.post('http://localhost:8800/api/models/', modelData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

export const updateModel = createAsyncThunk('model/updateModel', async (modelData) => {
    // with token
    const response = await axios.put(`http://localhost:8800/api/models/${modelData.id}`, modelData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
});

// DELETE: http://localhost:8800/api/models/{id}
export const deleteModel = createAsyncThunk('model/deleteModel', async (id) => {
    // with token
    await axios.delete(`http://localhost:8800/api/models/${id}`, {
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

