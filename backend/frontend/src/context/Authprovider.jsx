import { createContext, useContext, useState } from "react";
import React from "react";
export const Authcontext=createContext();
export default function Authprovider({children}){
    const initialauthuser=localStorage.getItem("userinfo");
    const [authuser,setauthuser]=useState(
        initialauthuser ? JSON.parse(initialauthuser):undefined
    );
    return(
        <Authcontext.Provider value={[authuser,setauthuser]}>
            {children}
        </Authcontext.Provider>
    )
}
export const useauth=()=>useContext(Authcontext);