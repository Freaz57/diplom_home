import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ButtonPlusMinus from "./index.tsx";
import { IProps } from './index.tsx';

const meta: Meta<typeof ButtonPlusMinus> = {
    title: 'Components/Atom/ButtonPlusMinus',
    component: ButtonPlusMinus,
    argTypes: {
        handleAddCount: { action: 'handleAddCount' },
        handleRemoveCount: { action: 'handleRemoveCount' },
    },
};

export default meta;

const Template: StoryFn<typeof ButtonPlusMinus> = (args: IProps) => <ButtonPlusMinus {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: 1,
    counts: 5,
};

export const WithoutHandlers = Template.bind({});
WithoutHandlers.args = {
    id: 1,
    counts: 3,
    handleAddCount: undefined,
    handleRemoveCount: undefined,
};

export const WithHandlers = Template.bind({});
WithHandlers.args = {
    id: 1,
    counts: 2,
    handleAddCount: (_: React.MouseEvent, id: number) => console.log(`Add ${id}`),
    handleRemoveCount: (_: React.MouseEvent, id: number) => console.log(`Remove ${id}`),
};
