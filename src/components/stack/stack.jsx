/**
 * External dependencies.
 */
import { forwardRef } from 'react';
import classNames from 'classnames';

const Stack = forwardRef((props, ref) =>  {
	const { className, direction, gap = 0, align, justify, wrap, style, children, ...rest } = props;

	return (
		<div 
			ref={ref}
			className={classNames(
				'stack', 
				direction && `stack--${direction}`,
				className,
			)} 
			style={{
				'--stack-gap': `${gap}px`,
				'--stack-align': align,
				'--stack-justify': justify,
				'--stack-wrap': wrap,
				'--stack-direction': direction,
				...style,
			}} 
			{...rest}
		>
			{ children }
		</div>
	)
});

export const VStack = forwardRef((props, ref) => {
	return <Stack ref={ref} {...props} direction="column" />
});

export const HStack = forwardRef((props, ref) => {
	return <Stack ref={ref} {...props} direction="row" />
});