import React, { useRef, useEffect } from "react";
import "./ChatBox.css";

const ChatBox = ({ setPlayAnimation, closeChat }) => {
  const audioRef = useRef();
  const [messages, setMessages] = React.useState([]);
  const [audioSrc, setAudioSrc] = React.useState("");
  const audios = ["/audios/five.mp3", "/audios/house.mp3"];

  useEffect(() => {
    const audio = audioRef.current;
    audio.play();
    audio.addEventListener("ended", () => {
      setPlayAnimation();
      setAudioSrc("");
    });
  }, [audioSrc, setPlayAnimation]);
  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div className="chatbox-header-title">
          <h2>ChatBox</h2>
        </div>
        <div className="chatbox-header-close">
          <button onClick={() => closeChat()}>X</button>
        </div>
      </div>
      <div className="chatbox-body">
        <div className="chatbox-body-messages">
          {messages.map((message, index) => (
            <div key={index} className="chatbox-body-messages-message-user">
              <h3>{message.user}</h3>
              <p className="chatbox-body-messages-message-text">
                {message.text}
              </p>
            </div>
          ))}
          <div className="message-input">
            <input
              className="message"
              type="text"
              placeholder="Let's talk..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setPlayAnimation();
                  setMessages([
                    ...messages,
                    {
                      user: "David",
                      text: e.target.value,
                    },
                  ]);
                  if (e.target.value.includes("How many")) {
                    setAudioSrc(audios[0]);
                  }
                  if (e.target.value.includes("live")) {
                    setAudioSrc(audios[1]);
                  }
                  e.target.value = "";
                }
              }}
            />
            <audio ref={audioRef} style={{ display: "none" }} src={audioSrc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
