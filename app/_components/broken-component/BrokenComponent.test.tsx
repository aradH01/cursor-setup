import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import BrokenComponent from "./BrokenComponent";

describe("BrokenComponent", () => {
  describe("Basic functionality", () => {
    it("renders without crashing", () => {
      render(<BrokenComponent />);
      
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("displays initial closed state", () => {
      render(<BrokenComponent />);
      
      expect(screen.getByText("Toggle: Closed")).toBeInTheDocument();
    });

    it("toggles state when button is clicked", async () => {
      const user = userEvent.setup();
      render(<BrokenComponent />);
      
      const button = screen.getByRole("button");
      
      // Initially closed
      expect(screen.getByText("Toggle: Closed")).toBeInTheDocument();
      
      // Click to open
      await user.click(button);
      expect(screen.getByText("Toggle: Open")).toBeInTheDocument();
      
      // Click to close
      await user.click(button);
      expect(screen.getByText("Toggle: Closed")).toBeInTheDocument();
    });

    it("accepts custom className", () => {
      const customClass = "custom-test-class";
      render(<BrokenComponent className={customClass} />);
      
      const component = screen.getByRole("button").parentElement;
      expect(component).toHaveClass(customClass);
    });
  });

  describe("CSS classes", () => {
    it("applies base classes", () => {
      render(<BrokenComponent />);
      
      const component = screen.getByRole("button").parentElement;
      expect(component).toHaveClass("broken-component");
    });

    it("applies open class when state is open", async () => {
      const user = userEvent.setup();
      render(<BrokenComponent />);
      
      const button = screen.getByRole("button");
      const component = button.parentElement;
      
      // Should not have open class initially
      expect(component).not.toHaveClass("open");
      
      // Click to open
      await user.click(button);
      expect(component).toHaveClass("open");
    });
  });

  describe("Child component", () => {
    it("renders child component with empty data initially", () => {
      render(<BrokenComponent />);
      
      // Child component renders a span with empty text
      const childComponent = screen.getByRole("button").parentElement?.querySelector("span");
      expect(childComponent).toBeInTheDocument();
      expect(childComponent).toHaveTextContent("");
    });
  });

  describe("Accessibility", () => {
    it("button has proper role", () => {
      render(<BrokenComponent />);
      
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("button text reflects current state", async () => {
      const user = userEvent.setup();
      render(<BrokenComponent />);
      
      const button = screen.getByRole("button");
      
      expect(button).toHaveTextContent("Toggle: Closed");
      
      await user.click(button);
      expect(button).toHaveTextContent("Toggle: Open");
    });
  });

  // Snapshot tests
  it("matches snapshot in closed state", () => {
    const { container } = render(<BrokenComponent />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot in open state", async () => {
    const user = userEvent.setup();
    const { container } = render(<BrokenComponent />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(<BrokenComponent className="custom-class" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
