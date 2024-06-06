

const  TimeAgo = ({ isoString }) => {
  const parseISO = (dateString) => {
    return new Date(dateString);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} d`;
    } else if (diffInHours > 0) {
      return `${diffInHours} h`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} m`;
    } else {
      return `${diffInSeconds} s`;
    }
  };

  const date = parseISO(isoString);
  const timeAgo = getTimeAgo(date);

  return (
    <div>{timeAgo}</div>
  );
}

export default TimeAgo;