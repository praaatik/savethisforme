import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";
import { vi } from "vitest"

test("redirects to login page when unauthorized", () => {
    // Mock the useUserData hook to return an error with status code 401
    vi.spyOn(require("../../hooks/useUserData"), "default").mockReturnValue({
        error: { status: 401 },
        user: null,
    });

    // Use MemoryRouter to simulate navigation
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    // Verify that the user is redirected to the login page
    expect(screen.getByText("Login")).toBeInTheDocument();
});
