export const formatPostDate = (createdAt) => {
	
	const createdAtDate = createdAt;
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
    const formattedDate = formatter.format(createdAtDate);

    return formattedDate;
	
};

export const formatMemberSinceDate = (createdAt) => {
	const date = new Date(createdAt);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	return `Joined ${month} ${year}`;
};