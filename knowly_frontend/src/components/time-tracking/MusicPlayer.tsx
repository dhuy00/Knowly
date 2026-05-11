import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Music,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize2,
} from "lucide-react";

const MusicPlayer = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);

  // Music player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(65);
  const [isExpanded, setIsExpanded] = useState(false);

  const playlist = [
    {
      title: "Deep Focus",
      artist: "Lofi Beats",
      duration: "3:45",
      genre: "Lofi",
    },
    {
      title: "Concentration Mode",
      artist: "Study Music",
      duration: "4:20",
      genre: "Ambient",
    },
    {
      title: "Flow State",
      artist: "Productivity Sounds",
      duration: "3:30",
      genre: "Electronic",
    },
    {
      title: "Code & Chill",
      artist: "Dev Beats",
      duration: "4:15",
      genre: "Lofi",
    },
    {
      title: "Late Night Work",
      artist: "Night Vibes",
      duration: "3:55",
      genre: "Jazz",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-sm">
      <div className="border-b border-[#2A2A2A] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="size-4 text-purple-400" />
          <h3 className="text-sm text-white">Focus Music</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-[#2A2A2A] transition text-gray-400"
        >
          <Maximize2 className="size-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border 
        border-purple-500/20 p-4 mb-4 rounded-sm">
          <p className="text-xs text-gray-500 mb-1">Now Playing</p>
          <p className="text-sm text-white mb-0.5">
            {playlist[currentSong].title}
          </p>
          <p className="text-xs text-gray-400">
            {playlist[currentSong].artist}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={() =>
              setCurrentSong(
                (currentSong - 1 + playlist.length) % playlist.length,
              )
            }
            className="p-2 hover:bg-[#2A2A2A] transition text-gray-400 hover:text-white"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-700 flex items-center 
            justify-center transition text-white rounded-sm"
          >
            {isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 ml-0.5" />
            )}
          </button>
          <button
            onClick={() => setCurrentSong((currentSong + 1) % playlist.length)}
            className="p-2 hover:bg-[#2A2A2A] transition text-gray-400 hover:text-white"
          >
            <SkipForward className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="size-4 text-gray-500" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1 h-1 bg-[#2A2A2A] accent-purple-500"
          />
          <span className="text-xs text-gray-500 w-8">{volume}%</span>
        </div>

        {isExpanded && (
          <div className="pt-4 border-t border-[#2A2A2A] space-y-2">
            {playlist.map((song, index) => (
              <button
                key={index}
                onClick={() => setCurrentSong(index)}
                className={`w-full text-left p-2 transition rounded-sm ${
                  index === currentSong
                    ? "bg-purple-500/10 border border-purple-500/20"
                    : "hover:bg-[#2A2A2A]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm truncate ${
                        index === currentSong ? "text-purple-400" : "text-white"
                      }`}
                    >
                      {song.title}
                    </p>
                    <p className="text-xs text-gray-500">{song.artist}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {song.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
