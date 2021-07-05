import React, { useRef, useEffect, useState } from "react";
import Video from "twilio-video";
import { Modal } from "antd";

import {
  attachParticipantTracks,
  attachTracks,
  detachParticipantTracks,
  detachTracks,
} from "helpers/twillio.helper";
import VideoControlForm from "./VideoControl.form";
import StyleWrapper from "./video.style";

let activeRoom = null;

const VideoChat = ({
  isVideoDisplay,
  isMute,
  isSetting,
  onParticipateConnected,
  videoInfo, // consist the Back-End information: roomName and token
  onHideSettingModal,
}): JSX.Element => {
  const localMedia = useRef(null);
  const remoteMedia = useRef(null);
  const [audioInput, setAudioInput] = useState([]);
  const [audioOutput, setAudioOutput] = useState([]);

  const leaveRoom = () => {
    if (activeRoom) activeRoom.disconnect();
  };

  const gotDevices = (deviceInfos) => {
    const audioInputSelect = [];
    const audioOutputSelect = [];

    for (let i = 0; i !== deviceInfos.length - 1; i += 1) {
      const deviceInfo = deviceInfos[i];

      if (deviceInfo.kind === "audioinput") {
        audioInputSelect.push({
          title: deviceInfo.label,
          key: deviceInfo.deviceId,
        });
      } else if (deviceInfo.kind === "audiooutput") {
        audioOutputSelect.push({
          title: deviceInfo.label,
          key: deviceInfo.deviceId,
        });
      } else {
        console.log("Some other kind of source/device: ", deviceInfo);
      }
    }
    setAudioInput(audioInputSelect);
    setAudioOutput(audioOutputSelect);
  };

  const videoControl = () => {
    if (activeRoom !== null) {
      const { localParticipant } = activeRoom;

      if (!isVideoDisplay)
        localParticipant.videoTracks.forEach((videoTrack) =>
          videoTrack.enable()
        );
      else
        localParticipant.videoTracks.forEach((videoTrack) =>
          videoTrack.enable(false)
        );

      if (!isMute)
        localParticipant.audioTracks.forEach((audioTrack) =>
          audioTrack.enable()
        );
      else
        localParticipant.audioTracks.forEach((audioTrack) =>
          audioTrack.enable(false)
        );
    }
  };

  const handleError = (error) => {
    console.log(
      "navigator.MediaDevices.getUserMedia error: ",
      error.message,
      error.name
    );
  };

  const joinRoom = (room: any, deviceId?: any) => {
    activeRoom = room;

    const previewContainer = localMedia;
    const remoteContainer = remoteMedia;

    if (!previewContainer?.current?.querySelector("video"))
      attachParticipantTracks(room.localParticipant, previewContainer.current);

    // Attach the Tracks of the room's participants.
    room.participants.forEach((participant) => {
      onParticipateConnected({ participant: true });
      attachParticipantTracks(participant, previewContainer.current);
    });

    // Attach participant’s tracks to DOM when they add a track
    room.on("trackAdded", (track /* , participant */) => {
      attachTracks([track], remoteContainer.current);
    });

    // Detach participant’s track from DOM when they remove a track.
    room.on("trackRemoved", (track /* , participant */) =>
      detachTracks([track])
    );

    room.on("trackSubscribed", (track) => {
      if (track.kind === "audio" && deviceId) {
        const audioElement = track.attach();
        audioElement.setSinkId(deviceId).then(() => {
          document.body.appendChild(audioElement);
        });
      }
    });

    // Detach all participant’s track when they leave a room.
    room.on("participantDisconnected", (participant) => {
      detachParticipantTracks(participant);
      onParticipateConnected({ participant: false });
    });

    room.on("participantConnected", (participant) => {
      attachParticipantTracks(participant, remoteContainer.current);
      onParticipateConnected({ participant: true });
    });

    // Once the local participant leaves the room, detach the Tracks
    // of all other participants, including that of the LocalParticipant.
    room.on("disconnected", () => {
      detachParticipantTracks(room.localParticipant);
      room.participants.forEach(detachParticipantTracks);
      leaveRoom();
      activeRoom = null;
    });
  };

  useEffect(() => {
    if (typeof window === "object") {
      // check if we are in client side
      // fill the audio and the speaker
      window.navigator.mediaDevices
        .enumerateDevices()
        .then(gotDevices)
        .catch(handleError);
    }

    Video.connect(videoInfo.token, {
      name: videoInfo.room_name,
    }).then((room) => {
      joinRoom(room);
      if (!localMedia?.current?.querySelector("video")) room.disconnect();
    });
    return () => leaveRoom();
  }, []);

  const handleAudio = (deviceId) => {
    activeRoom.disconnect();
    Video.createLocalTracks({
      audio: { deviceId },
      video: true,
    }).then((localTracks) => {
      Video.connect(videoInfo.token, {
        name: videoInfo.room_name,
        tracks: localTracks,
      }).then((room) => {
        joinRoom(room);

        if (!localMedia?.current?.querySelector("video")) room.disconnect();
      });
    });
  };

  const handleOutputAudio = (deviceId) => {
    Video.connect(videoInfo.token, {
      name: videoInfo.room_name,
      video: true,
    }).then((room) => {
      joinRoom(room, deviceId);

      if (!localMedia?.current?.querySelector("video")) room.disconnect();
    });
  };

  useEffect(() => {
    videoControl();
  }, [isVideoDisplay, isMute]);

  return (
    <StyleWrapper className="c-video">
      <div className="c-video--innerbox">
        <div className="local-video">
          <div
            className="c-video--track-local"
            id="localMedia"
            ref={localMedia}
          />
        </div>

        <div
          className="c-video--track-remote"
          id="remoteMedia"
          ref={remoteMedia}
        />
      </div>

      <div className="innerbox--overflow" />
      <Modal
        footer={null}
        title=""
        visible={isSetting}
        onCancel={onHideSettingModal}
      >
        <VideoControlForm
          inputs={audioInput}
          outputs={audioOutput}
          onSelectInput={handleAudio}
          onSelectOutput={handleOutputAudio}
          onSubmit={(e) => console.log(e)}
        />
      </Modal>
    </StyleWrapper>
  );
};

export default VideoChat;
