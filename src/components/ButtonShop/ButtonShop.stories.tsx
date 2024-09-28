import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ButtonShop from "./index.tsx";
import {IProps} from "./index.tsx";


const meta: Meta<IProps> = {
    title: 'Components/Atom/ButtonShop',
    component: ButtonShop,
    argTypes: {
        handleAddCount: { action: 'clicked' },
    },
};

export default meta;

const Template: StoryFn<IProps> = (args) => <ButtonShop {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: 1,
    top: '20px',
};
export const WithHandlers = Template.bind({});
WithHandlers.args = {
    id: 2,
    top: 'customTopClass',
    handleAddCount: (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        console.log(`Add count for item ${id}`);
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    id: 3,
    top: '20px',
    handleAddCount: undefined,
};


