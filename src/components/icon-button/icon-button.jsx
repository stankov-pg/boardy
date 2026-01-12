/**
* External dependencies.
*/
import { forwardRef } from 'react';
import classNames from 'classnames';

/**
* Internal dependencies.
*/
import Icon from '@/components/icon/icon';

const IconButton = forwardRef((props, ref) => {
	const {
		variant = 'primary',
		type = 'button',
		href,
		className,
		disabled = false,
		style,
		size,
		iconSize,
		icon,
		...rest
	} = props;
	
	const Component = !!href ? 'a' : 'button';
	
	const sizeStyles = size
		? {
			width: `${size}px`,
			height: `${size}px`,
		}
		: {};
	
	return (
		<Component
			ref={ref}
			className={classNames(
				'icon-button',
				`icon-button--variant-${variant}`,
				disabled && 'icon-button--disabled',
				className
			)}
			style={{  ...sizeStyles, ...style }}
			disabled={disabled}
			{...(!!href ? { href } : { type })}
			{...rest}
		>
			<Icon icon={icon} size={iconSize || size} />
		</Component>
	);
});

export default IconButton;
