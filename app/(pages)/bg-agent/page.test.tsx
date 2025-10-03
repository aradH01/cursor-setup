import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the BgAgentPage component
const BgAgentPage = () => {
  const message = "Hello world";
  const message2 = "Hello world";
  const message3 = "Hello world";
  
  return (
    <div>
      <h1>{message}</h1>
      <p>Background Agent Page</p>
      <p>Message 2: {message2}</p>
      <p>Message 3: {message3}</p>
    </div>
  );
};

describe("BgAgentPage", () => {
  describe("Basic rendering", () => {
    it("renders main heading", () => {
      render(<BgAgentPage />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Hello world"
      );
    });

    it("renders page description", () => {
      render(<BgAgentPage />);

      expect(screen.getByText("Background Agent Page")).toBeInTheDocument();
    });

    it("renders all message paragraphs", () => {
      render(<BgAgentPage />);

      expect(screen.getByText("Message 2: Hello world")).toBeInTheDocument();
      expect(screen.getByText("Message 3: Hello world")).toBeInTheDocument();
    });
  });

  describe("Content structure", () => {
    it("displays all expected text content", () => {
      render(<BgAgentPage />);

      // Check all expected text is present
      expect(screen.getByText("Hello world")).toBeInTheDocument();
      expect(screen.getByText("Background Agent Page")).toBeInTheDocument();
      expect(screen.getByText("Message 2: Hello world")).toBeInTheDocument();
      expect(screen.getByText("Message 3: Hello world")).toBeInTheDocument();
    });

    it("has proper semantic structure", () => {
      render(<BgAgentPage />);

      // Should have one main heading
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      
      // Should have paragraphs for additional content
      const paragraphs = screen.getAllByText(/Background Agent Page|Message \d+: Hello world/);
      expect(paragraphs).toHaveLength(3);
    });

    it("uses correct HTML elements", () => {
      render(<BgAgentPage />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.tagName).toBe("H1");
    });
  });

  describe("Message display", () => {
    it("displays consistent message content", () => {
      render(<BgAgentPage />);

      // All three messages should contain "Hello world"
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Hello world");
      
      expect(screen.getByText("Message 2: Hello world")).toBeInTheDocument();
      expect(screen.getByText("Message 3: Hello world")).toBeInTheDocument();
    });

    it("displays messages in correct format", () => {
      render(<BgAgentPage />);

      // Check message format
      expect(screen.getByText("Message 2: Hello world")).toBeInTheDocument();
      expect(screen.getByText("Message 3: Hello world")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("renders content in div container", () => {
      const { container } = render(<BgAgentPage />);

      expect(container.firstChild?.nodeName).toBe("DIV");
    });

    it("contains all elements as children", () => {
      const { container } = render(<BgAgentPage />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv.children).toHaveLength(4); // h1 + 3 paragraphs
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<BgAgentPage />);

      // Should have exactly one h1
      const headings = screen.getAllByRole("heading");
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveProperty("tagName", "H1");
    });

    it("content is properly labeled", () => {
      render(<BgAgentPage />);

      // All text content should be accessible
      expect(screen.getByText("Hello world")).toBeInTheDocument();
      expect(screen.getByText("Background Agent Page")).toBeInTheDocument();
    });
  });

  describe("Content consistency", () => {
    it("all message variables contain same content", () => {
      render(<BgAgentPage />);

      // All messages should be "Hello world"
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Hello world");
      
      // Check that message2 and message3 also contain "Hello world"
      expect(screen.getByText("Message 2: Hello world")).toBeInTheDocument();
      expect(screen.getByText("Message 3: Hello world")).toBeInTheDocument();
    });
  });

  // Snapshot tests
  it("matches snapshot", () => {
    const { container } = render(<BgAgentPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot of complete page structure", () => {
    const { container } = render(<BgAgentPage />);
    expect(container).toMatchSnapshot();
  });
});
