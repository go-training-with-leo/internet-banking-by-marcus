import React from 'react';
import Button from 'components/Button';

export default {
	title: 'Button',
	component: Button,
};

const Template = (args) => {
	return <Button {...args} />;
};

const Default = Template.bind({});

Default.args = {
	children: <span>Default Button</span>,
};

export { Default };
