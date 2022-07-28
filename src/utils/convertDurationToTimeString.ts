export function convertDurationToTimeString(duration: number, flag: 'short' | 'long' = 'short') {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    let timeString: string;

    switch (flag) {
        case 'long':
            let timeArr = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0'));
            timeString = `${timeArr[0]}h ${timeArr[1]}m ${timeArr[2]}s`;
        break;

        default:
            timeString = [hours, minutes, seconds]
            .map(unit => String(unit).padStart(2, '0'))
            .join(':');
    }

    return timeString;
}