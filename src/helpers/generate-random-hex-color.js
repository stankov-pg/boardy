/**
 * Generate Random Hex Color.
 * @returns { String }
 */
export const generateRandomHexColor = () => {
	const letters = '0123456789ABCDEF';
	
	return '#' + Array.from({ length: 6 }).reduce(color => color + letters[Math.floor(Math.random() * 16)], '');
};