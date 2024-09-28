import { Meta, StoryFn } from '@storybook/react';
import Accordion from "./index.tsx";
import { AccordionProps } from "./index.tsx";


const meta: Meta = {
    title: 'Components/Molecules/Accordion',
    component: Accordion,
};

export default meta;


const Template: StoryFn<AccordionProps> = (args) => <Accordion {...args} />;


export const Default = Template.bind({});
Default.args = {
    items: [
        {
            question: 'How can I track the status of my order?',
            answer: 'You will receive a confirmation email containing your order number and a tracking link.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept various payment methods including credit cards and PayPal.',
        },
        {
            question: 'How can I return or exchange an item?',
            answer: 'You can return or exchange items within 30 days of receipt.',
        },
    ],
};
