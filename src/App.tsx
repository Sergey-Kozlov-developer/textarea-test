import {useState} from "react";

function App() {
    const [text, setText] = useState('');
    return (
        <div style={{padding:'20px'}}>
            <p>Textarea test</p>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{width: '300px', height: '300px'}}
                placeholder="Начните вводить текст начиная с @"
            >

            </textarea>
        </div>
    )
}

export default App
