import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Custom render function with common providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  // Add any global providers here in the future
  initialProps?: Record<string, any>;
}

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions
): RenderResult => {
  const renderOptions = options || {};

  // Create a wrapper component if needed for providers
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    // Add global providers here (ThemeProvider, Router, etc.)
    return <>{children}</>;
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// Setup user event for interactions
const setupUser = () => {
  return userEvent.setup();
};

// Common test utilities
export const testUtils = {
  // Render utilities
  render: customRender,
  setupUser,

  // Common test helpers
  getByTextContent: (text: string) => (content: string, element: any) => {
    return element.textContent === text;
  },

  // Wait for element utilities
  waitForLoadingToFinish: async () => {
    // Wait for any loading states to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
  },

  // Form testing utilities
  fillForm: async (fields: Record<string, string>, user: any) => {
    for (const [label, value] of Object.entries(fields)) {
      const input = document.querySelector(`input[name="${label}"]`) ||
                   document.querySelector(`[aria-label="${label}"]`);
      if (input) {
        await user.clear(input as Element);
        await user.type(input as Element, value);
      }
    }
  },

  // Component interaction utilities
  clickButton: async (buttonText: string, user: any) => {
    const button = document.querySelector(`button:contains("${buttonText}")`) ||
                  document.querySelector(`[role="button"]:contains("${buttonText}")`);
    if (button) {
      await user.click(button as Element);
    }
  },

  // Assertion helpers
  expectElementToHaveClasses: (element: Element, classes: string[]) => {
    classes.forEach(className => {
      expect(element).toHaveClass(className);
    });
  },

  expectElementToNotHaveClasses: (element: Element, classes: string[]) => {
    classes.forEach(className => {
      expect(element).not.toHaveClass(className);
    });
  },

  // Mock utilities
  createMockProps: <T extends Record<string, any>>(overrides?: Partial<T>): T => {
    const defaultMocks = {
      onClick: jest.fn(),
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onUpdate: jest.fn(),
      onClose: jest.fn(),
      onOpen: jest.fn(),
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    return { ...defaultMocks, ...overrides } as unknown as T;
  },

  // Snapshot utilities
  createSnapshotTest: (Component: React.ComponentType<any>, props: any = {}) => {
    return () => {
      const { container } = customRender(<Component {...props} />);
      expect(container.firstChild).toMatchSnapshot();
    };
  },

  // Accessibility utilities
  checkA11y: {
    hasProperHeadingHierarchy: (container: HTMLElement) => {
      const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const levels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
      
      // Check if heading levels are in proper order (no skipping)
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] > levels[i - 1] + 1) {
          return false;
        }
      }
      return true;
    },

    hasAriaLabels: (container: HTMLElement) => {
      const interactiveElements = container.querySelectorAll(
        "button, input, select, textarea, [role='button'], [role='link']"
      );
      
      return Array.from(interactiveElements).every(element => {
        return element.hasAttribute("aria-label") || 
               element.hasAttribute("aria-labelledby") ||
               element.textContent?.trim() ||
               element.querySelector("label");
      });
    },
  },

  // Performance testing utilities
  measureRenderTime: async (Component: React.ComponentType<any>, props: any = {}) => {
    const start = performance.now();
    customRender(<Component {...props} />);
    const end = performance.now();
    return end - start;
  },

  // Error boundary testing
  expectToThrow: (Component: React.ComponentType<any>, props: any = {}) => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      customRender(<Component {...props} />);
    }).toThrow();

    console.error = originalError;
  },
};

// Re-export testing library utilities
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// Custom Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveClasses(classes: string[]): R;
      toBeAccessible(): R;
    }
  }
}

// Default export for convenience
export default testUtils;
