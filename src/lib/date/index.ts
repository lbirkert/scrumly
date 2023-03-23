export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;
export const year = day * 365;
export const month = year / 12;

export function sinceShort(date: Date) {
	const delta = Date.now() - date.getTime();

	if (delta > year) {
		const years = Math.floor(delta / year);
		return years === 1 ? 'last year' : `${years} years ago`;
	}
	if (delta > month) {
		const months = Math.floor(delta / month);
		return months === 1 ? 'last month' : `${months} months ago`;
	} else if (delta > day) {
		const days = Math.floor(delta / day);
		return days === 1 ? 'yesterday' : `${days} days ago`;
	} else if (delta > hour) {
		const hours = Math.floor(delta / hour);
		return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
	} else if (delta > minute) {
		const minutes = Math.floor(delta / minute);
		return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
	} else if (delta > second) {
		const seconds = Math.floor(delta / second);
		return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
	} else return 'now';
}

import SinceShort from './SinceShort.svelte';

export { SinceShort };
