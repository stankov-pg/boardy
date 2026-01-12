/**
* External dependencies.
*/
import { useState, useEffect } from 'react';

/**
 * Use Local Storage
 * @param { String } key 
 * @param { Object } defaultValue 
 * @returns { [any, Function] }
 */
function useLocalStorage(key, defaultValue) {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		
		return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
	});
	
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	
	return [value, setValue];
}

export default useLocalStorage;