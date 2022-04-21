import React, { useState } from "react";
import { io } from "socket.io-client";
import Room from "./Room";

interface RoomProps {
  children?: React.ReactNode;
}

const mediaSetting = {
  video: true,
};

export const socket = io(import.meta.env.VITE_SERVER, {
  reconnection: false,
});

const App: React.FC<RoomProps> = ({ children }) => {
  const [media, setMedia] = useState<MediaStream | null>(null);
  const getStream = (type: "screen" | "camera") => {
    switch (type) {
      case "camera":
        navigator.mediaDevices.getUserMedia(mediaSetting).then((media) => {
          setMedia(media);
        });
        break;

      case "screen":
        navigator.mediaDevices.getDisplayMedia().then((media) => {
          setMedia(media);
        });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          getStream("camera");
        }}
      >
        Use Camera
      </button>
      <button
        onClick={() => {
          getStream("screen");
        }}
      >
        Use Webcam
      </button>

      {media && <Room media={media} />}
    </div>
  );
};
export default App;
