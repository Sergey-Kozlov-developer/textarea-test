import styles from './MentionTeaxtarea.module.css'
import {useState} from "react";

const MentionTextarea = () => {

    const [text, setText] = useState('')

    return (
        <div className={styles.container}>
            <p>Textarea test</p>
            <textarea
                className={styles.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{width: '300px', height: '300px'}}
                placeholder="Начните вводить текст начиная с @"
            >

            </textarea>
        </div>
    );
};

export default MentionTextarea;