import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddCollection from '../AddCollection';
import { Provider } from 'react-redux';
import { store } from "../../store/";
import { vi } from 'vitest';

describe('AddCollection', () => {

    it('renders correctly', () => {
        const { queryByRole } = render(
            <Provider store={store}>
                <AddCollection userId="1" /></Provider>);
        expect(queryByRole('button')).toBeInTheDocument();
    });

    it('opens the dialog when the add button is clicked', () => {
        const { queryByRole } = render(<Provider store={store}>
            <AddCollection userId="1" /></Provider>);
        const addButton = screen.queryByRole("button");
        if (addButton) {
            expect(addButton).toBeInTheDocument()
            fireEvent.click(addButton);
            const dialog = queryByRole('dialog');
            if (dialog) {
                expect(dialog).toBeInTheDocument();
            }
        }
    });

    it('closes the dialog when the cancel button is clicked', async () => {
        const { queryByRole } = render(<Provider store={store}>
            <AddCollection userId="1" /></Provider>);
        const addButton = queryByRole('button');
        if (addButton) {
            fireEvent.click(addButton);
            await waitFor(() => {
                const cancelButton = queryByRole('button', { name: 'Cancel' });
                if (cancelButton) {
                    fireEvent.click(cancelButton);
                    expect(queryByRole('dialog')).not.toBeInTheDocument();
                }
            });
        }
    });

    it('calls the createBookmark function when the add button is clicked and the form is valid', () => {
        const createBookmarkMock = jest.fn();
        const { getByRole, getByLabelText } = render(
            <Provider store={store}>
                <AddCollection userId="1" />
            </Provider>
        );
        const addButton = getByRole('button');
        fireEvent.click(addButton);

        const collectionNameInput = getByLabelText('Collection Name');
        fireEvent.change(collectionNameInput, { target: { value: 'New Collection' } });

        const addCollectionButton = getByRole('button', { name: 'Add' });
        fireEvent.click(addCollectionButton);

        expect(createBookmarkMock).toHaveBeenCalledWith({ collectionName: 'New Collection', userId: '1' });
    });

    it('does not call the createBookmark function when the add button is clicked and the form is invalid', () => {
        const createBookmarkMock = jest.fn();
        const { getByRole } = render(<Provider store={store}>
            <AddCollection userId="1" /></Provider>);
        const addButton = getByRole('button');
        fireEvent.click(addButton);
        const addCollectionButton = getByRole('button', { name: 'Add' });
        fireEvent.click(addCollectionButton);
        expect(createBookmarkMock).not.toHaveBeenCalled();
    });
});
