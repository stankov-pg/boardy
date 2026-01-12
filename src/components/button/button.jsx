/**
* External dependencies.
*/
import { forwardRef } from 'react';
import classNames from 'classnames';

const Button = forwardRef((props, ref) => {
	const {
		type = 'button',
		variant = 'primary',
		href,
		disabled = false,
		danger,
		width,
		children,
		...rest
	} = props;
	
	const Component = !!href ? 'a' : 'button';
	
	return (
		<Component
			ref={ref}
			className={classNames(
				'button',
				`button--variant-${variant}`,
				disabled && 'button--disabled',
				danger && 'button--variant-danger',
			)}
			style={{
				...(width && { '--button-width': `${width}` }),
			}}
			disabled={disabled}
			{...(!!href ? { href } : { type })}
			{...rest}
		>
			<span className="button__text">{children}</span>
		</Component>
	);
});

export default Button;
