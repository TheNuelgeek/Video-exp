import React, { useEffect, useState, useRef } from 'react';
import Twilio from 'twilio-video';
import Livepeer from 'livepeerjs';

const VideoCall = () => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const videoRef = useRef(null);
  const twiloToken = process.env.REACT_APP_WILIO_TOKEN 
  const roomName = 'TestingVideo'

  useEffect(() => {
    // Set up Twilio Video connection
    Twilio.Video.connect( twiloToken, { name: room }).then((room) => {
      setRoom(room);

      room.participants.forEach((participant) => {
        setParticipants((prevParticipants) => [...prevParticipants, participant]);
      });

      room.on('participantConnected', (participant) => {
        setParticipants((prevParticipants) => [...prevParticipants, participant]);
      });

      room.on('participantDisconnected', (participant) => {
        setParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p !== participant)
        );
      });

      // Set up Livepeer WebRTC
      Livepeer.start({ roomName: roomName }).then((stream) => {
        const track = new Twilio.Video.LocalVideoTrack(stream.getTracks()[0]);
        room.localParticipant.publishTrack(track);
        videoRef.current.srcObject = stream;
      });
    });

    return () => {
      if (room) {
        room.disconnect();
      }
      Livepeer.stop();
    };
  }, []);

  return (
    <div>
      {participants.map((participant) => (
        <div key={participant.sid}>{participant.identity}</div>
      ))}
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default VideoCall;
