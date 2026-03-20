import React,{useCallback, useState} from "react";


export const useMention = () => {
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');



    const handleChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        const cursorPosition = e.target.selectionStart;
        const beforeCursor = newText.slice(0, cursorPosition);
        const atIndex = beforeCursor.lastIndexOf("@");

        if(atIndex !== -1){
            const query = beforeCursor.slice(atIndex + 1);
            if(!query.includes(" ")){
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
        handleChangeText,
    }
}