import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/v4';

const myId = uuid();
const app = io('http://localhost:8080');

app.on('connect', () => {
    console.log(`[Front-End] Nova pessoa conectada!`);
})

const Chat = () => {
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            setMessages([ ...messages, newMessage ]);
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

        if(message.trim()) {
            app.emit('chat.message', {
                id: myId,
                message
            });
            setMessage('');
        }
    }
    const handleInputChange = e => setMessage(e.target.value);

    return (
        <main className="container">
            <ul className="list">
                { messages.map((m, index) => (
                    <li
                        className={`list__item list__item--${ m.id === myId ? 'mine' : 'other' }`}
                        key={ index }
                    >
                        <span className={`message message--${ m.id === myId ? 'mine' : 'other' }`}>
                            { m.message }
                        </span>
                    </li>
                )
                )}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
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
