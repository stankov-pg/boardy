const Icon = (props) =>  {
	const { icon: Component, size, ...rest } = props;

	return <Component sx={{ fontSize: size }} { ...rest } />
};

export default Icon;