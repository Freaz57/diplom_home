import { Meta, StoryFn } from '@storybook/react';
import AccordionItem from "./index.tsx";
import { AccordionItemProps } from "./index.tsx";

const meta: Meta = {
    title: 'Components/Atom/AccordionItem',
    component: AccordionItem,
};

export default meta;

// Создаем шаблон истории
const Template: StoryFn<AccordionItemProps> = (args) => <AccordionItem {...args} />;


export const Default = Template.bind({});
Default.args = {
    question: 'How can I track the status of my order?',
    answer: 'You will receive a confirmation email containing your order number and a tracking link.',
};
