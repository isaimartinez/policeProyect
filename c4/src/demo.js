import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function  WebSocketDemo () {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl,] = useState('ws://localhost:8085');
  const [messageHistory, setMessageHistory] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("lastMessage",lastMessage)
      setMessageHistory(lastMessage.data);
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = () => {
    console.log("Hello")
     sendMessage('Hello')
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      <ul>
        {messageHistory}
      </ul>
    </div>
  );
};

export default WebSocketDemo