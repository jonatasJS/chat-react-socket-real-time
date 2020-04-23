import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/v4';
//import script from './script';

const myId = uuid();
const app = io('https://8080-cb83e211-7b90-4608-8b72-c150557d49ad.ws-us02.gitpod.io/');

app.on('connect', () => {
    console.log(`[Front-End] Nova pessoa conectada!`);
})

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [ scroll, setScroll ] = useState([]);
    const [ tScroll, setTScroll ] = useState([]);

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            setMessages([...messages, newMessage]);
        };
        app.on('chat.message', handleNewMessage);
        return () => {
            app.off('chat.message', handleNewMessage);
        }
    }, [messages]);

    const handleFormSubmit = e => {
        e.preventDefault();

        /** Só cai na condição se ela tiver conteudo.
         *  
         * '' => ''
         * '   ' => ''
         * 'ola' => 'ola'
         * 
         */

        if (message.trim()) {
            app.emit('chat.message', {
                id: myId,
                message
            });
            setMessage('');
        }
    }
    const handleInputChange = e => setMessage(e.target.value);


    useEffect(() => {
       const s = () => {
           console.log('inicio');

        let progress = document.getElementById('progressbar');

        console.log('1');

        console.log(progress);

        let height = document.getElementById('list');

        console.log('2');

        console.log(height);
        let doc = document.documentElement


        let totalHeight = 100 * doc.scrollTop / (doc.scrollHeight - doc.clientHeight);


        console.log('1');

        console.log(totalHeight);
       

        window.onscroll = (totalHeight) => {
            let progressHeight = (window.pageYOffset / totalHeight) * 100;
             setScroll (...tScroll, totalHeight);

            console.log('scroll inicio');

            progress.style.heigth = progressHeight + '%';

            console.log('scroll fim');
        }
        console.log('fim');
       }

       s();
    }, [tScroll]); // eslint-disable-next-line

    return (
        <main className="container">
            <ul className="list" id="list">
                <div id="progressbar"></div>
                <div id="scrollPath"></div>
                {messages.map((m, index) => (
                    <li
                        className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}
                        key={index}
                    >
                        <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
                            {m.message}
                        </span>
                    </li>
                )
                )}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    autoFocus
                    className="form__field"
                    placeholder="Digite sua menssagem..."
                    onChange={handleInputChange}
                    type="text"
                    value={message}
                />
            </form>
        </main>

    );
};

export default Chat;
