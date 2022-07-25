import { createContext, ReactNode, useContext, useState } from "react";

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
    hasPrevious: boolean;
    hasNext: boolean;
    isShuffleOn: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleShuffle: () => void;
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
    
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = currentEpisodeIndex < episodesList.length - 1;
    const [isShuffleOn, setIsShuffleOn] = useState(false);

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

    function playNext() {
        if(isShuffleOn) {
            const randomIndex = Math.floor(Math.random() * episodesList.length);
            setCurrentEpisodeIndex(randomIndex);
        } else if(hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        } else {
            return;
        }
    }

    function playPrevious() {
        if(isShuffleOn) {
            const randomIndex = Math.floor(Math.random() * episodesList.length);
            setCurrentEpisodeIndex(randomIndex);
        } else if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        } else {
            return;
        }
    }

    function toggleShuffle() {
        setIsShuffleOn(!isShuffleOn);
    }

  return (
    <PlayerContext.Provider value={{
		episodesList,
		currentEpisodeIndex,
        hasPrevious,
        hasNext,
        isShuffleOn,
		play,
        playList,
		isPlaying,
		togglePlay,
		setPlayingState,
        playNext,
        playPrevious,
        toggleShuffle
	}}>
        {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
};