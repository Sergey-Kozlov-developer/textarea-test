import styles from './MentionTeaxtarea.module.css'
import {useMention} from "../../hooks/useMention.ts";
import MentionShow from "../MentionShow/MentionShow.tsx";


const MentionTextarea = () => {

    const {
        text,
        show,
        textareaRef,
        setShow,
        position,
        insertMention,
        selectedIndex,
        setSelectedIndex,
        handleKeyDown,
        filteredUsers,
        handleChangeText
    } = useMention();

    return (
        <div className={styles.container}>
            <p>Textarea test</p>
            <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={text}
                onChange={handleChangeText}
                onKeyDown={handleKeyDown}
                onBlur={() => setShow(false)}
                style={{width: '300px', height: '300px'}}
                placeholder="Начните вводить текст начиная с @"
            />
            {show && (
                <MentionShow
                    users={filteredUsers}
                    selectedIndex={selectedIndex}
                    position={position}
                    onSelect={insertMention}
                    onMouseEnter={setSelectedIndex}
                    onClose={() => setShow(false)}
                />
            )}


        </div>
    );
};

export default MentionTextarea;