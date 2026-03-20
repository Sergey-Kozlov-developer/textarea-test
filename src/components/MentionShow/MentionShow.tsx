import type {IUser} from "../../types/user.ts";
import {useEffect, useRef} from "react";

import styles from "./MentionShow.module.css";

interface IMentionShowProps {
    users: IUser[];
    selectedIndex: number;
    position: { top: number; left: number };
    onSelect: (user: IUser) => void;
    onMouseEnter: (index: number) => void;
    onClose: () => void;
}

const MentionShow = ({
    users,
    selectedIndex,
    position,
    onSelect,
    onMouseEnter,
    onClose,
    }: IMentionShowProps) => {

    const dropdownRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClose()
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose])

    if(users.length === 0) return null;

    return (
        <ul
            ref={dropdownRef}
            className={styles.dropdown}
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            {users.map((user, idx) => (
                <li
                    key={user.id}
                    className={`${styles.dropdownItem} ${
                        idx === selectedIndex ? styles.dropdownItemSelected : ""
                    }`}
                    onClick={() => onSelect(user)}
                    onMouseEnter={() => onMouseEnter(idx)}
                >
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userUsername}>@{user.username}</div>
                </li>
            ))}
        </ul>
    );
};

export default MentionShow;