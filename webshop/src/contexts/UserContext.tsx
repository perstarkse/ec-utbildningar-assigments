import React, { createContext, ReactNode, useState } from "react";

interface IUserProvider {
    children: ReactNode;
}

interface IUserContext {
    user: Iuser;
    users: Iuser[];
    userRequest: Iuser,
    getUsers: () => void;
    getUser: () => void;
    setUserRequest: React.Dispatch<React.SetStateAction<Iuser>>;
    registerUser: (e: React.FormEvent) => Promise<boolean>;
    signInUser: (e: React.FormEvent) => void;
}

interface Iuser {
    _id: string,
    emailAddress: string;
    password: string,
    isAdmin: boolean,
}

const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = () => {
    return React.useContext(UserContext) as IUserContext;
}

export const UserProvider: React.FC<IUserProvider> = ({ children }) => {

    const url = 'http://localhost:8000/users/'

    const mockuser = { _id: "", emailAddress: "", password: "", isAdmin: false }
    const [users, setUsers] = useState<Iuser[]>([mockuser]);
    const [userRequest, setUserRequest] = useState<Iuser>(mockuser)
    const [user, setUser] = useState<Iuser>(mockuser)

    const getUser = async () => {
        try {
            // const decoded = jwt_decode<IacceessToken>(localStorage.getItem('accessToken')!)

            const result = await fetch(url + `user/`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
            setUser(await result.json())
        }
        catch {
            setUser(mockuser)
        }

    }

    const getUsers = async () => {
        const result = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
        setUsers(await result.json())
    }

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await fetch(url + `/signup`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest)
        })

        if (result.status === 201) {
            setUserRequest(mockuser);
            return true;
        }
        if (result.status === 400) {
            return false;
        }
        else return false;
    }
    const signInUser = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await fetch(url + `/signin`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        })

        if (result.status === 200) {
            const data = await result.json();
            localStorage.setItem('accessToken', data.accessToken);
            getUser();
            setUserRequest(mockuser);
            return true;
        }
        else if (result.status === 400) {
            return false;
        }
    }
    // READY FOR IMPLEMENTATION
    // const updateUser = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const result = await fetch(url + userRequest._id, {
    //         method: 'put',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         body: JSON.stringify(userRequest)
    //     })

    //     if (result.status === 200) {
    //         setUserRequest(mockuser);
    //         getUsers();
    //     }
    // }

    // const deleteUser = async (userId: string) => {
    //     const result = await fetch(url + userId, {
    //         method: 'delete',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //     })

    //     if (result.status === 200) {
    //         getUsers();
    //     }
    // }

    return <UserContext.Provider value={{ user, users, userRequest, getUser, signInUser, setUserRequest, getUsers, registerUser }}>
        {children}
    </UserContext.Provider>
}