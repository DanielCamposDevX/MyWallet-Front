import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const RequestContext = createContext()

export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState();


    useEffect(() => {
        if (request.length != 0) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${request.token}`
                }
            };
            const promisse = axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
                email: email,
                password: pass
            });
            promisse.then((token) => { console.log(token) });//Utilizar ContextAPI, e go to home//
            promisse.catch((error) => { alert(error) });// Colocar erro// 
        };

}, [request]);


return (
    <RequestContext.Provider value={{ request, setRequest}}>
        {children}
    </RequestContext.Provider>
)
}