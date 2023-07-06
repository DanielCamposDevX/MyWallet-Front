import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const RequestContext = createContext()

export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState({});


    useEffect(() => {
        if (request.email && request.pass) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${request.token}`
                }
            };
            const promisse = axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
                email: request.email,
                password: request.pass
            });
            promisse
                .then((token) => {
                    setRequest((prevRequest) => ({
                        ...prevRequest,
                        token,
                    }));
                })
                .catch((error) => {
                    alert(error);
                });

        }}, [request]);


    return (
        <RequestContext.Provider value={{ request, setRequest }}>
            {children}
        </RequestContext.Provider>
    )
}