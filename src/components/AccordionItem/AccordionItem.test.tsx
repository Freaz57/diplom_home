import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccordionItem from "./index.tsx";
import { describe, test, expect } from 'vitest';

describe('AccordionItem', () => {
    test('Тест на отображение текста', () => {
        render(<AccordionItem question="How can I track the status of my order?" answer="After placing your order, you will receive a confirmation email containing your order number and a tracking link." />);

        expect(screen.getByText('How can I track the status of my order?')).toBeInTheDocument();
    });

    test('Тест на переключение видимости', () => {
        render(<AccordionItem question="How can I track the status of my order?" answer="After placing your order, you will receive a confirmation email containing your order number and a tracking link." />);

        const button = screen.getByText('How can I track the status of my order?');
        const answerText = 'After placing your order, you will receive a confirmation email containing your order number and a tracking link.';

        fireEvent.click(button);
        expect(screen.getByText(answerText)).toBeInTheDocument();
        fireEvent.click(button);


    });

    test('Тест на класс изображения', () => {
        render(<AccordionItem question="How can I track the status of my order?" answer="After placing your order, you will receive a confirmation email containing your order number and a tracking link." />);

        const button = screen.getByText('How can I track the status of my order?');
        const img = screen.getByAltText('plus');

        fireEvent.click(button);

        expect(img.className).toContain('rotate');
    });
});
