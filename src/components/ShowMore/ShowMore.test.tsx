import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShowMore from "./index.tsx";
import { describe, test, expect, vi } from 'vitest';

describe('ShowMore', () => {
    test('Проверяем, что компонент рендерится без ошибок', () => {
        render(<ShowMore onClick={() => {}} hasMore={true}/>)

        expect(screen.getByText('Show More')).toBeInTheDocument();
    })

    test('Проверям, что когда у нас false, то кнопка не появляется', () => {
        render(<ShowMore onClick={() => {}} hasMore={false}/>)

        expect(screen.queryByText('Show More')).not.toBeInTheDocument();
    })

    test('Проверяем, что при клике функция вызвается', () => {
        const handleClick = vi.fn();

        render(<ShowMore onClick={handleClick} hasMore={true}/>);

        const button = screen.getByText('Show More');

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);

    })


})