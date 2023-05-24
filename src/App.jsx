import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Models from './pages/models/Models';
import SingleModel from './pages/single-model/SingleModel';
import SingleBrand from "./pages/single-brand/SingleBrand";
import SingleSpare from "./pages/single-spare/SingleSpare";
import New from './pages/new/New';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import Brands from "./pages/brands/Brands";
import Spares from "./pages/spares/Spares";


function App() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={darkMode ? 'app dark' : 'app'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/models" element={<Models />} />
                    <Route path="/models/:modelId" element={<SingleModel />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/brands/:brandId" element={<SingleBrand />} />
                    <Route path="/spares" element={<Spares />} />
                    <Route path="/spares/:spareId" element={<SingleSpare />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
