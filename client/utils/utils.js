export const calculatePostTime = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();

  const timeDifference = Math.abs(now - postDate) / 3600000; // Difference in hours

  if (timeDifference < 1) {
    const minutesElapsed = Math.round((timeDifference * 60) % 60); // Difference in minutes
    return minutesElapsed + " minutes ago";
  } else if (timeDifference < 24) {
    return Math.round(timeDifference) + " hours ago";
  } else {
    const daysElapsed = Math.floor(timeDifference / 24); // Difference in days
    return daysElapsed + " days ago";
  }
}