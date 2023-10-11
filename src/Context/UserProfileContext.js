import { createContext, useState } from "react";

export let UserProfileContext =createContext()

 export default function UserProfileContextProvider(props)
{
    let [userData,setUserData]=useState(null)
    return <UserProfileContext.Provider value={{userData,setUserData}}>
        {props.children}
    </UserProfileContext.Provider>
}