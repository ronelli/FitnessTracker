import axios from 'axios';
import React, { createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await axios.get('http://localhost:5000/me',{
                    withCredentials: true
                });
                setUser(res.data.name);
            }
            catch(err){
                setUser(null);
            }
        }
        fetchUser();
    },[]);

    return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
    );
}