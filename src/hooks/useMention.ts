import React,{useCallback, useState} from "react";
import type {IUser} from "../types/user.ts";
import {MOCKS_USERS} from "../mocks/users.ts";


export const useMention = () => {
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);



    const handleChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        const cursorPosition = e.target.selectionStart;
        const beforeCursor = newText.slice(0, cursorPosition);
        const atIndex = beforeCursor.lastIndexOf("@");

        if(atIndex !== -1){
            const query = beforeCursor.slice(atIndex + 1);
            if(!query.includes(" ")){
                const filtered = MOCKS_USERS.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                    user.username.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredUsers(filtered);
                setSearchQuery(query);
                setShow(true);
                return
            }
        }
        setShow(false);

    }, [])


    return {
        text,
        show,
        searchQuery,
        filteredUsers,
        handleChangeText,
    }
}