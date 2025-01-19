import axios from 'axios';
import React, { createContext, useEffect, useState, ReactNode } from 'react';


interface UserContextType {
    user: string | null,
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}
export const UserContext = createContext<UserContextType>({
    user:null,
    setUser: ()=>{},
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<string | null>(null);
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

// export const UserProvider = ({children}) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUser = async() => {
//             try {
//                 const res = await axios.get('http://localhost:5000/me',{
//                     withCredentials: true
//                 });
//                 setUser(res.data.name);
//             }
//             catch(err){
//                 setUser(null);
//             }
//         }
//         fetchUser();
//     },[]);

//     return (
//     <UserContext.Provider value={{user, setUser}}>
//         {children}
//     </UserContext.Provider>
//     );
// }