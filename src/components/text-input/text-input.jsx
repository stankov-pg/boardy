/**
* External dependencies.
*/
import { forwardRef } from 'react';

const TextInput = forwardRef((props, ref) => {
	const {
		type = 'text',
		autoFocus = false,
		...rest
	} = props;
	
	return (
		<input
			ref={ref}
			className="text-input"
			type={type}
			autoFocus={autoFocus}
			{...rest}
		/>
	)
});

export default TextInput;
