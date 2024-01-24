const calculateTime = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const diff = currentDate.getTime() - postDate.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (days > 365) {
        return `${Math.floor(days / 365)} years ago`;
    }
    else if (days > 30) {
        return `${Math.floor(days / 30)} months ago`;
    }
    else if (days > 1) {
        return `${Math.floor(days)} days ago`;
    }
    else if (hours > 1) {
        return `${Math.floor(hours)} hours ago`;
    }
    else if (minutes > 1) {
        return `${Math.floor(minutes)} minutes ago`;
    }
    else if (seconds > 1) {
        return `${Math.floor(seconds)} seconds ago`;
    }
    else {
        return `now`;
    }
}

export default calculateTime;