/**
 * List of all Spotify Scopes
 */
const scopesList = {
  // images
  ugcImageUpload: "ugc-image-upload",

  // follow
  userFollowRead: "user-follow-read",
  userFollowModify: "user-follow-modify",

  // listening history
  userReadRecentlyPlayed: "user-read-recently-played",
  userTopRead: "user-top-read",
  userReadPlaybackPosition: "user-read-playback-position",

  // library
  userLibraryRead: "user-library-read",
  userLibraryModify: "user-library-modify",

  // spotify connect
  userReadPlaybackState: "user-read-playback-state",
  userReadCurrentlyPlaying: "user-read-currently-playing",
  userModifyPlaybackState: "user-modify-playback-state",

  // playlists
  playlistReadCollaborative: "playlist-read-collaborative",
  playlistModifyPrivate: "playlist-modify-private",
  playlistModifyPublic: "playlist-modify-public",
  playlistReadPrivate: "playlist-read-private",

  // playback
  streaming: "streaming",
  appRemoteControl: "app-remote-control",

  // users
  userReadEmail: "user-read-email",
  userReadPrivate: "user-read-private",
}

const scopes = (() => [
  scopesList.userReadPlaybackState,
  scopesList.userModifyPlaybackState,
  scopesList.userReadCurrentlyPlaying,
  scopesList.playlistModifyPublic,
  scopesList.playlistModifyPrivate,
  scopesList.playlistReadPrivate,
  scopesList.playlistReadCollaborative,
  scopesList.userLibraryModify,
  scopesList.userLibraryRead,
  scopesList.userReadEmail,
  scopesList.userReadPrivate,
  // scopesList.ugcImageUpload
])()

export default scopes
