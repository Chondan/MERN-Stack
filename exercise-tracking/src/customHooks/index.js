import React, { useState } from 'react';

export const useInput = (initialValue) => {
	const [input, setInput] = useState(initialValue);
	const onInputChange = (e) => {
		const { value } = e.target;
		setInput(value);
	}
	return [input, onInputChange, setInput];
}