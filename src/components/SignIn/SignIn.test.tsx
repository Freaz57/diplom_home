import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from "./index.tsx";


vi.mock('../../hooks/redux-hooks', () => ({
    useAppDispatch: () => vi.fn(),
}));

const mockUserAuth = vi.fn().mockResolvedValue({ token: 'test-token' });
vi.mock('../../store/apiSlice/apiSlice', () => ({
    useUserAuthMutation: () => [mockUserAuth, { isLoading: false, isError: false, reset: vi.fn() }],
}));

describe('SignIn Component', () => {

    test('Проверяем, на то, что компонент появился', () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Login')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sign In');
        expect(screen.getByRole('button')).toHaveTextContent('Sign In');
    });

    test('Проверяем, на обновление веденных даннах', () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Login'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpass' } });

        expect(screen.getByPlaceholderText('Login')).toHaveValue('testuser');
        expect(screen.getByPlaceholderText('Password')).toHaveValue('testpass');
    });

});
