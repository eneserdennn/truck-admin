import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);


}