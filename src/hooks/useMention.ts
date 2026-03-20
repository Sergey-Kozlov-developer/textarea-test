import React, {useCallback, useRef, useState} from "react";
import type {IUser} from "../types/user.ts";
import {MOCKS_USERS} from "../mocks/users.ts";


export const useMention = () => {
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [position, setPosition] = useState({top: 0, left: 0 });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const getCaretCoordinates = useCallback((element: HTMLTextAreaElement, position: number) => {
        const div = document.createElement("div");
        const styles = getComputedStyle(element);

        Object.assign(div.style, {
            position: "absolute",
            top: "0",
            left: "0",
            visibility: "hidden",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            font: styles.font,
            padding: styles.padding,
            lineHeight: styles.lineHeight,
        });

        div.textContent = element.value.slice(0, position);
        const span = document.createElement("span");
        span.textContent = element.value.slice(position) || ".";
        div.appendChild(span);

        document.body.appendChild(div);
        const { offsetLeft: left, offsetTop: top } = span;
        document.body.removeChild(div);

        return { x: left, y: top, height: parseInt(styles.lineHeight, 10) };
    }, []);

    const updateDropdownPosition = useCallback(() => {
        if (!textareaRef.current) return;

        const cursorPos = textareaRef.current.selectionStart;
        const { x, y, height } = getCaretCoordinates(textareaRef.current, cursorPos);
        const rect = textareaRef.current.getBoundingClientRect();

        setPosition({
            top: y + window.scrollY + height,
            left: x + rect.left + window.scrollX,
        });
    }, [getCaretCoordinates]);

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
                updateDropdownPosition();
                return
            }
        }
        setShow(false);

    }, [updateDropdownPosition]);

    const insertMention = useCallback((user: IUser) => {
        if (!textareaRef.current) return;

        const cursorPos = textareaRef.current.selectionStart;
        const beforeCursor = text.slice(0, cursorPos);
        const atIndex = beforeCursor.lastIndexOf("@");

        const newText =
            text.slice(0, atIndex) +
            `@${user.username} ` +
            text.slice(cursorPos);

        setText(newText);

        const newCursorPos = atIndex + user.username.length + 2;
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);

        setShow(false);
    }, [text]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!show) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredUsers.length);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
                break;
            case "Enter":
                e.preventDefault();
                if (filteredUsers[selectedIndex]) {
                    insertMention(filteredUsers[selectedIndex]);
                }
                break;
            case "Escape":
                setShow(false);
                break;
        }
    }, [show, filteredUsers, selectedIndex, insertMention]);


    return {
        text,
        show,
        searchQuery,
        filteredUsers,
        position,
        textareaRef,
        selectedIndex,
        handleChangeText,
        handleKeyDown,
        insertMention,
        setShow,
        setSelectedIndex,
    }
}