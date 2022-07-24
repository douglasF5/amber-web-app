import { createContext, ReactNode, useState } from "react";

//TYPE ANNOTATION
type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextType = {
    episodesList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
}

//PLAYER CONTEXT
export const PlayerContext = createContext({} as PlayerContextType);

//TYPE ANNOTATION
type PlayerContextProviderProps = {
    children: ReactNode;
}

//CONTEXT PROVIDER
export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodesList, setEpisodesList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	function play(episode: Episode) {
		setEpisodesList([episode]);
		setCurrentEpisodeIndex(0);
		setIsPlaying(true);
	}

    function playList(list: Episode[], index: number) {
        setEpisodesList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	function setPlayingState(state: boolean) {
		setIsPlaying(state);
	}

  return (
    <PlayerContext.Provider value={{
		episodesList,
		currentEpisodeIndex,
		play,
        playList,
		isPlaying,
		togglePlay,
		setPlayingState
	}}>
        {children}
    </PlayerContext.Provider>
  )
}