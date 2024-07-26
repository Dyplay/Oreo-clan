export const fetchPlace = async () => {
    const response = await fetch(`/api/leaderboard`);
    const data = await response.json();
    return data;
};