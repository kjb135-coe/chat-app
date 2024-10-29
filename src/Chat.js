import React, { useState, useMemo, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [editorContent, setEditorContent] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const editor = useMemo(() => withReact(createEditor()), []);

  const sendMessage = () => {
    const messageText = editorContent.map((n) => n.children[0].text).join('\n');
    if (messageText.trim()) {
      setMessages([...messages, { text: messageText, sender: 'user' }]);
      setEditorContent([{ type: 'paragraph', children: [{ text: '' }] }]);
    }
  };

  const renderElement = useCallback((props) => {
    return <p {...props.attributes}>{props.children}</p>;
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Riverside Insights Chat</h2>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <Slate editor={editor} value={editorContent} onChange={(newValue) => setEditorContent(newValue)}>
          <Editable
            renderElement={renderElement}
            placeholder="Type your message..."
          />
        </Slate>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
