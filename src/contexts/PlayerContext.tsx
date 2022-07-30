import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

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
    progress: number;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleShuffle: () => void;
    toggleAutoPlay: () => void;
    clearPlayerState: () => void;
    toggleIsPlayerCollapsed: (option?: boolean) => void;
    handleSeek: (amount: number) => void;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

//PLAYER CONTEXT
export const PlayerContext = createContext({} as PlayerContextType);

//CONTEXT PROVIDER
export function PlayerContextProvider({ children }: PlayerContextProviderProps) {

    //VARIABLES AND STATE
    const [episodesList, setEpisodesList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1);
	const [isPlaying, setIsPlaying] = useState(false);
    
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = currentEpisodeIndex < episodesList.length - 1;
    const [isShuffleOn, setIsShuffleOn] = useState(false);
    const [isAutoPlayOn, setIsAutoPlayOn] = useState(false);
    const [isPlayerCollapsed, setIsPlayerCollapsed] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const episode = episodesList[currentEpisodeIndex];
    const [progress, setProgress] = useState(0);

    //FUNCTIONS
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

    function toggleIsPlayerCollapsed(option: boolean = null) {
        if(option === null) {
            setIsPlayerCollapsed(!isPlayerCollapsed);
        } else {
            setIsPlayerCollapsed(option);
        }

    }

    function setUpProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));

            if(audioRef.current.currentTime === episode.duration){
                handleAudioEnded();
            }
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleAudioEnded() {
        console.log('Audio ended.');

        if(isAutoPlayOn) {
            playNext();
        } else {
            setPlayingState(false);
            audioRef.current.currentTime = 0;
            setProgress(0);
        }
    }

    //EFFECT
    useEffect(() => {
		if(!audioRef.current) {
			return;
		}

		if(isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}

	}, [isPlaying]);

    //RETURN STATEMENT
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
        progress,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        toggleShuffle,
        toggleAutoPlay,
        clearPlayerState,
        toggleIsPlayerCollapsed,
        handleSeek
    }}>
            {children}
            {
				episode && (
					<audio
						src={episode.url}
						autoPlay
						ref={audioRef}
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setUpProgressListener}
					/>
				)
			}
        </PlayerContext.Provider>
    )
}

//EXPORTING CUSTOM HOOK
export const usePlayer = () => {
    return useContext(PlayerContext);
};