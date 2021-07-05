export function attachTracks(tracks, container) {
  tracks.forEach((track) => container?.appendChild(track.attach()));
}

export function attachParticipantTracks(participant, container) {
  attachTracks(Array.from(participant.tracks.values()), container);
}

export function detachTracks(tracks) {
  tracks.forEach((track) => {
    track.detach().forEach((detachedElement) => {
      detachedElement.remove();
    });
  });
}

export function detachParticipantTracks(participant) {
  detachTracks(Array.from(participant.tracks.values()));
}

export default {
  attachParticipantTracks,
  attachTracks,
  detachTracks,
  detachParticipantTracks,
};
