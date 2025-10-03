import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TestComponent from "./TestComponent";

describe("TestComponent", () => {
  it("renders without crashing", () => {
    const mockClick = jest.fn();

    render(
      <TestComponent title="Test Title" onClick={mockClick}>
        <span>Test child</span>
      </TestComponent>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByText("Test child")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", async () => {
    const mockClick = jest.fn();
    const user = userEvent.setup();

    render(<TestComponent title="Test" onClick={mockClick} />);

    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders title correctly", () => {
    const mockClick = jest.fn();
    const testTitle = "Custom Title";

    render(<TestComponent title={testTitle} onClick={mockClick} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(testTitle);
  });

  it("renders children when provided", () => {
    const mockClick = jest.fn();

    render(
      <TestComponent title="Test" onClick={mockClick}>
        <div data-testid="child-element">Child content</div>
      </TestComponent>,
    );

    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders without children", () => {
    const mockClick = jest.fn();

    render(<TestComponent title="Test" onClick={mockClick} />);

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const mockClick = jest.fn();
    const { container } = render(
      <TestComponent title="Snapshot Test" onClick={mockClick} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with children", () => {
    const mockClick = jest.fn();
    const { container } = render(
      <TestComponent title="Snapshot Test" onClick={mockClick}>
        <span>Child element</span>
      </TestComponent>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
