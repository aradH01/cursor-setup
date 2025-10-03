import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock the page component
const Home = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Effect running");
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <h1>Welcome to Pro Fixer v4 Test</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      </div>
    </div>
  );
};

describe("Home Page", () => {
  describe("Basic rendering", () => {
    it("renders main heading", () => {
      render(<Home />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Welcome to Pro Fixer v4 Test"
      );
    });

    it("renders initial count", () => {
      render(<Home />);

      expect(screen.getByText("Count: 0")).toBeInTheDocument();
    });

    it("renders increment button", () => {
      render(<Home />);

      expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("increments count when button is clicked", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const button = screen.getByRole("button", { name: "Increment" });
      
      // Initial state
      expect(screen.getByText("Count: 0")).toBeInTheDocument();

      // Click to increment
      await user.click(button);
      expect(screen.getByText("Count: 1")).toBeInTheDocument();

      // Click again
      await user.click(button);
      expect(screen.getByText("Count: 2")).toBeInTheDocument();
    });

    it("handles multiple rapid clicks", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const button = screen.getByRole("button", { name: "Increment" });

      // Click multiple times
      for (let i = 0; i < 5; i++) {
        await user.click(button);
      }

      expect(screen.getByText("Count: 5")).toBeInTheDocument();
    });

    it("button is accessible via keyboard", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const button = screen.getByRole("button", { name: "Increment" });
      
      // Focus the button and press Enter
      button.focus();
      await user.keyboard("{Enter}");

      expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });
  });

  describe("Layout and styling", () => {
    it("applies correct CSS classes to main container", () => {
      render(<Home />);

      const mainContainer = screen.getByRole("heading").closest("div")?.parentElement;
      expect(mainContainer).toHaveClass(
        "font-sans",
        "grid",
        "grid-rows-[20px_1fr_20px]",
        "items-center",
        "justify-items-center",
        "min-h-screen",
        "p-8",
        "pb-20",
        "gap-16",
        "sm:p-20"
      );
    });

    it("has proper semantic structure", () => {
      render(<Home />);

      // Should have a main heading
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      
      // Should have interactive button
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("State management", () => {
    it("starts with count of 0", () => {
      render(<Home />);

      expect(screen.getByText("Count: 0")).toBeInTheDocument();
    });

    it("creates new instance with fresh state on re-render", async () => {
      const user = userEvent.setup();
      
      // First render
      const { unmount } = render(<Home />);
      const button = screen.getByRole("button", { name: "Increment" });
      await user.click(button);
      
      expect(screen.getByText("Count: 1")).toBeInTheDocument();

      // Unmount and render fresh component
      unmount();
      render(<Home />);
      
      // New instance should start at 0
      expect(screen.getByText("Count: 0")).toBeInTheDocument();
    });

    it("uses functional state update", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const button = screen.getByRole("button", { name: "Increment" });
      
      // Test that the functional update works correctly
      await user.click(button);
      expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<Home />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.tagName).toBe("H1");
    });

    it("button has proper attributes", () => {
      render(<Home />);

      const button = screen.getByRole("button", { name: "Increment" });
      expect(button).toBeEnabled();
      expect(button.tagName).toBe("BUTTON");
    });

    it("content is properly structured", () => {
      render(<Home />);

      // Check that all text content is present
      expect(screen.getByText("Welcome to Pro Fixer v4 Test")).toBeInTheDocument();
      expect(screen.getByText(/Count: \d+/)).toBeInTheDocument();
      expect(screen.getByText("Increment")).toBeInTheDocument();
    });
  });

  describe("Effects", () => {
    it("runs effect on mount", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      
      render(<Home />);

      expect(consoleSpy).toHaveBeenCalledWith("Effect running");
      
      consoleSpy.mockRestore();
    });
  });

  // Snapshot tests
  it("matches snapshot on initial render", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot after incrementing", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);

    const button = screen.getByRole("button", { name: "Increment" });
    await user.click(button);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with higher count", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);

    const button = screen.getByRole("button", { name: "Increment" });
    
    // Click 10 times
    for (let i = 0; i < 10; i++) {
      await user.click(button);
    }

    expect(container.firstChild).toMatchSnapshot();
  });
});
