import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import SampleComponent from "./SampleComponent";

describe("SampleComponent", () => {
  const defaultProps = {
    title: "Test Sample Component",
    onUpdate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic functionality", () => {
    it("renders with required props", () => {
      render(<SampleComponent {...defaultProps} />);

      expect(screen.getByText("Test Sample Component")).toBeInTheDocument();
      expect(screen.getByText("Current count: 0")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
    });

    it("renders with custom initial count", () => {
      render(<SampleComponent {...defaultProps} count={5} />);

      expect(screen.getByText("Current count: 5")).toBeInTheDocument();
    });

    it("displays title correctly", () => {
      const customTitle = "Custom Sample Title";
      render(<SampleComponent {...defaultProps} title={customTitle} />);

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(customTitle);
    });
  });

  describe("User interactions", () => {
    it("increments count when button is clicked", async () => {
      const mockOnUpdate = jest.fn();
      const user = userEvent.setup();
      
      render(<SampleComponent {...defaultProps} onUpdate={mockOnUpdate} />);

      const button = screen.getByRole("button", { name: "Increment" });
      
      // Initial state
      expect(screen.getByText("Current count: 0")).toBeInTheDocument();

      // Click to increment
      await user.click(button);

      expect(screen.getByText("Current count: 1")).toBeInTheDocument();
      expect(mockOnUpdate).toHaveBeenCalledWith(1);
      expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    });

    it("calls onUpdate with correct values on multiple clicks", async () => {
      const mockOnUpdate = jest.fn();
      const user = userEvent.setup();
      
      render(<SampleComponent {...defaultProps} count={10} onUpdate={mockOnUpdate} />);

      const button = screen.getByRole("button", { name: "Increment" });

      // Click three times
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(screen.getByText("Current count: 13")).toBeInTheDocument();
      expect(mockOnUpdate).toHaveBeenCalledTimes(3);
      expect(mockOnUpdate).toHaveBeenNthCalledWith(1, 11);
      expect(mockOnUpdate).toHaveBeenNthCalledWith(2, 12);
      expect(mockOnUpdate).toHaveBeenNthCalledWith(3, 13);
    });

    it("maintains internal state independently from initial count", async () => {
      const mockOnUpdate = jest.fn();
      const user = userEvent.setup();
      
      render(<SampleComponent {...defaultProps} count={5} onUpdate={mockOnUpdate} />);

      const button = screen.getByRole("button", { name: "Increment" });
      
      // Initial state should use the passed count
      expect(screen.getByText("Current count: 5")).toBeInTheDocument();

      // After clicking, should increment from that value
      await user.click(button);
      expect(screen.getByText("Current count: 6")).toBeInTheDocument();
      expect(mockOnUpdate).toHaveBeenCalledWith(6);
    });
  });

  describe("CSS classes", () => {
    it("applies correct CSS classes", () => {
      render(<SampleComponent {...defaultProps} />);

      const container = screen.getByText("Test Sample Component").parentElement;
      expect(container).toHaveClass("sample-component", "border", "p-4", "rounded");
    });

    it("button has correct styling classes", () => {
      render(<SampleComponent {...defaultProps} />);

      const button = screen.getByRole("button", { name: "Increment" });
      expect(button).toHaveClass("bg-blue-500", "text-white", "px-4", "py-2", "rounded");
    });
  });

  describe("Component structure", () => {
    it("renders all expected elements", () => {
      render(<SampleComponent {...defaultProps} />);

      // Check for heading
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
      
      // Check for count display
      expect(screen.getByText(/Current count:/)).toBeInTheDocument();
      
      // Check for button
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("has proper heading hierarchy", () => {
      render(<SampleComponent {...defaultProps} />);

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading.tagName).toBe("H3");
    });
  });

  describe("Edge cases", () => {
    it("handles count of 0 correctly", () => {
      render(<SampleComponent {...defaultProps} count={0} />);

      expect(screen.getByText("Current count: 0")).toBeInTheDocument();
    });

    it("handles negative initial count", () => {
      render(<SampleComponent {...defaultProps} count={-5} />);

      expect(screen.getByText("Current count: -5")).toBeInTheDocument();
    });

    it("handles large numbers", async () => {
      const mockOnUpdate = jest.fn();
      const user = userEvent.setup();
      
      render(<SampleComponent {...defaultProps} count={999} onUpdate={mockOnUpdate} />);

      const button = screen.getByRole("button", { name: "Increment" });
      await user.click(button);

      expect(screen.getByText("Current count: 1000")).toBeInTheDocument();
      expect(mockOnUpdate).toHaveBeenCalledWith(1000);
    });
  });

  // Snapshot tests
  it("matches snapshot with default props", () => {
    const { container } = render(<SampleComponent {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom count", () => {
    const { container } = render(<SampleComponent {...defaultProps} count={42} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with long title", () => {
    const longTitle = "This is a very long title for the sample component to test text wrapping";
    const { container } = render(<SampleComponent {...defaultProps} title={longTitle} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
