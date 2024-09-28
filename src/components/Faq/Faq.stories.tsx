
import { Meta, StoryFn } from '@storybook/react';
import FAQ from "./index.tsx";

// Определяем метаданные для компонента FAQ
const meta: Meta = {
    title: 'Components/Molecules/FAQ',
    component: FAQ,
};

export default meta;

// Создаем шаблон истории
const Template: StoryFn = (args) => <FAQ {...args} />;

// Экспортируем историю по умолчанию
export const Default = Template.bind({});
Default.args = {};
