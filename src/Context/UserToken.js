import { createContext, useState } from "react";

export let userTokenContext=createContext();

export default function UserContextProvider(props)
{
    let [userToken,setToken]=useState(null)
    return <userTokenContext.Provider value={{userToken,setToken}}>
        {props.children}
    </userTokenContext.Provider>
}