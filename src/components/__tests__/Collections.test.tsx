import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { useGetCollectionsByUserQuery } from '../../store';
import Collections from "../Collections"
import { expect, beforeEach } from "vitest"

jest.mock('../store');

const mockUseGetCollectionsByUserQuery = useGetCollectionsByUserQuery as jest.MockedFunction<typeof useGetCollectionsByUserQuery>;

describe('Collections', () => {
    beforeEach(() => {
        mockUseGetCollectionsByUserQuery.mockClear();
    });

    it('renders loading spinner while fetching collections', () => {
        mockUseGetCollectionsByUserQuery.mockReturnValueOnce({
            data: undefined,
            isLoading: true,
            isError: false,
            refetch: jest.fn()
        });

        render(<Collections />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument()

        // expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    // it('renders "No collections found" message when no collections are returned', () => {
    //     mockUseGetCollectionsByUserQuery.mockReturnValueOnce({
    //         data: [],
    //         isLoading: false,
    //         isError: false,
    //     });

    //     render(<Collections />);

    //     expect(screen.getByText('No collections found! Click above to add new')).toBeInTheDocument();
    // });

    // it('renders the list of collections when collections are returned', () => {
    //     mockUseGetCollectionsByUserQuery.mockReturnValueOnce({
    //         data: [
    //             { collectionId: 1, name: 'Collection 1' },
    //             { collectionId: 2, name: 'Collection 2' },
    //         ],
    //         isLoading: false,
    //         isError: false,
    //     });

    //     render(<Collections />);

    //     expect(screen.getByText('Collection 1')).toBeInTheDocument();
    //     expect(screen.getByText('Collection 2')).toBeInTheDocument();
    // });
});
