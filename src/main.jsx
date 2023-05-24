import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import {DarkModeContextProvider} from "./context/darkModeContext.jsx";
import store from "./store/store";
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DarkModeContextProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </DarkModeContextProvider>
    </React.StrictMode>,
);
