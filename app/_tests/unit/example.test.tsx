import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestComponent from "../../_components/test-component/TestComponent";

describe("Example Tests", () => {
  test("basic math test", () => {
    expect(1 + 1).toBe(2);
  });

  test("component test with correct imports", () => {
    const mockOnClick = jest.fn();
    
    render(<TestComponent title="test" onClick={mockOnClick} />);
    
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  test("string manipulation", () => {
    const testString = "Hello World";
    expect(testString.toLowerCase()).toBe("hello world");
    expect(testString.toUpperCase()).toBe("HELLO WORLD");
  });

  test("array operations", () => {
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(n => n * 2);
    
    expect(doubled).toEqual([2, 4, 6, 8, 10]);
    expect(numbers.length).toBe(5);
  });
});
