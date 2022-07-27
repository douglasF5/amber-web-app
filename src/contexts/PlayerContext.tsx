import { createContext, ReactNode, useContext, useState } from "react";

//TYPE ANNOTATION
type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    durationAsString: string;
    url: string;
}

type PlayerContextType = {
    episodesList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    isShuffleOn: boolean;
    isAutoPlayOn: boolean;
    isPlayerCollapsed: boolean;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleShuffle: () => void;
    toggleAutoPlay: () => void;
    clearPlayerState: () => void;
    toggleIsPlayerCollapsed: () => void;
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
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1);
	const [isPlaying, setIsPlaying] = useState(false);
    
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = currentEpisodeIndex < episodesList.length - 1;
    const [isShuffleOn, setIsShuffleOn] = useState(false);
    const [isAutoPlayOn, setIsAutoPlayOn] = useState(false);
    const [isPlayerCollapsed, setIsPlayerCollapsed] = useState(false);

    function playList(list: Episode[], index: number) {
        setIsPlaying(true);
        setEpisodesList(list);
        setCurrentEpisodeIndex(index);
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

    function toggleAutoPlay() {
        setIsAutoPlayOn(!isAutoPlayOn);
    }

    function clearPlayerState() {
        console.log('The has been cleaned up.');
        setEpisodesList([]);
        setCurrentEpisodeIndex(-1);
        setIsPlaying(false);
    }

    function toggleIsPlayerCollapsed() {
        setIsPlayerCollapsed(!isPlayerCollapsed);
    }

  return (
    <PlayerContext.Provider value={{
		episodesList,
		currentEpisodeIndex,
        hasPrevious,
        hasNext,
        isShuffleOn,
        isAutoPlayOn,
        playList,
		isPlaying,
        isPlayerCollapsed,
		togglePlay,
		setPlayingState,
        playNext,
        playPrevious,
        toggleShuffle,
        toggleAutoPlay,
        clearPlayerState,
        toggleIsPlayerCollapsed
	}}>
        {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
};