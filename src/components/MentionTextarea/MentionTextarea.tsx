import styles from './MentionTeaxtarea.module.css'
import {useMention} from "../../hooks/useMention.ts";


const MentionTextarea = () => {

    const {text, show, searchQuery, handleChangeText} = useMention();

    return (
        <div className={styles.container}>
            <p>Textarea test</p>
            <textarea
                className={styles.textarea}
                value={text}
                onChange={handleChangeText}
                style={{width: '300px', height: '300px'}}
                placeholder="Начните вводить текст начиная с @"
            />
            {show && (
                <div style={{
                    position: "absolute",
                    background: "white",
                    border: "1px solid #ccc",
                    padding: 8,
                    top: 100,
                    left: 20
                }}>
                    Ищем: {searchQuery}
                </div>
            )}


        </div>
    );
};

export default MentionTextarea;