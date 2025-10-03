# TDD Workflow Guide

## 🚀 TDD Setup Complete!

Your codebase is now 100% ready for Test-Driven Development (TDD). Here's your complete guide to implementing TDD in your React/Next.js project.

## 📋 Pre-TDD Checklist ✅

- ✅ **TypeScript compilation** - All errors fixed
- ✅ **Test infrastructure** - Jest + React Testing Library configured
- ✅ **Component tests** - All components have comprehensive tests
- ✅ **Test utilities** - Custom test helpers available
- ✅ **Auto-fix scripts** - TypeScript and test maintenance automated
- ✅ **Package dependencies** - All required testing libraries installed

## 🔄 TDD Cycle Implementation

### The Red-Green-Refactor Cycle

```bash
# 1. RED: Write a failing test
npm run test:watch

# 2. GREEN: Write minimal code to pass
npm run dev

# 3. REFACTOR: Improve code while keeping tests green
npm run test && npm run build
```

### Example TDD Workflow

#### 1. **Red Phase** - Write Failing Test First

```typescript
// components/calculator/Calculator.test.tsx
describe("Calculator", () => {
  it("adds two numbers correctly", () => {
    render(<Calculator />);
    
    // This will fail because Calculator doesn't exist yet
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByDisplayValue("0")).toBeInTheDocument();
  });
});
```

#### 2. **Green Phase** - Write Minimal Implementation

```typescript
// components/calculator/Calculator.tsx
export default function Calculator() {
  return (
    <div>
      <input defaultValue="0" />
      <button>+</button>
    </div>
  );
}
```

#### 3. **Refactor Phase** - Improve While Tests Pass

```typescript
// Enhanced implementation with proper functionality
export default function Calculator() {
  const [value, setValue] = useState("0");
  
  return (
    <div className="calculator">
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        role="textbox"
        aria-label="Calculator display"
      />
      <button onClick={() => handleAdd()}>+</button>
    </div>
  );
}
```

## 🛠️ Available Commands

### Testing Commands
```bash
# Run all tests
npm run test

# Watch mode for TDD
npm run test:watch

# Coverage report
npm run test:coverage

# Update snapshots
npm run test -- --updateSnapshot
```

### Auto-Fix Commands
```bash
# Fix TypeScript errors automatically
npm run fix:ts

# Fix test issues and update snapshots
npm run fix:test

# Run all fixes
npm run fix:all

# Format code
npm run format:write

# Fix linting issues
npm run lint:fix
```

### Development Workflow
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 📁 Project Structure for TDD

```
app/
├── _components/
│   ├── button/
│   │   ├── button.tsx           # Component
│   │   ├── Button.test.tsx      # Tests
│   │   ├── index.ts            # Exports
│   │   └── __snapshots__/      # Snapshots
│   └── [component]/
├── _tests/
│   ├── test-utils.tsx          # Custom test utilities
│   └── unit/                   # Unit tests
├── _lib/
│   └── utils.ts                # Utility functions
└── page.tsx                    # Pages with co-located tests
```

## 🧪 Test Patterns

### 1. **Component Testing Pattern**

```typescript
import { testUtils } from "@/tests/test-utils";

describe("ComponentName", () => {
  const defaultProps = testUtils.createMockProps({
    title: "Test Title",
    onClick: jest.fn(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic functionality", () => {
    it("renders without crashing", () => {
      testUtils.render(<ComponentName {...defaultProps} />);
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("handles click events", async () => {
      const user = testUtils.setupUser();
      testUtils.render(<ComponentName {...defaultProps} />);
      
      await user.click(screen.getByRole("button"));
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });
  });

  // Snapshot test
  it("matches snapshot", testUtils.createSnapshotTest(ComponentName, defaultProps));
});
```

### 2. **Hook Testing Pattern**

```typescript
import { renderHook, act } from "@testing-library/react";

describe("useCustomHook", () => {
  it("initializes with default value", () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe(0);
  });

  it("updates value correctly", () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.setValue(5);
    });
    
    expect(result.current.value).toBe(5);
  });
});
```

### 3. **Integration Testing Pattern**

```typescript
describe("Feature Integration", () => {
  it("completes user flow", async () => {
    const user = testUtils.setupUser();
    testUtils.render(<AppWithProviders />);

    // Step 1: User navigates to form
    await user.click(screen.getByText("Add Item"));
    
    // Step 2: User fills form
    await testUtils.fillForm({
      name: "Test Item",
      description: "Test Description"
    }, user);
    
    // Step 3: User submits
    await user.click(screen.getByRole("button", { name: "Submit" }));
    
    // Step 4: Verify result
    expect(screen.getByText("Item added successfully")).toBeInTheDocument();
  });
});
```

## 🎯 TDD Best Practices

### 1. **Test Naming Conventions**
- Use descriptive test names: `"should update count when increment button is clicked"`
- Group related tests with `describe` blocks
- Use consistent naming patterns

### 2. **Test Structure (AAA Pattern)**
```typescript
it("should do something", () => {
  // Arrange
  const props = { title: "Test" };
  
  // Act
  render(<Component {...props} />);
  
  // Assert
  expect(screen.getByText("Test")).toBeInTheDocument();
});
```

### 3. **Test Coverage Goals**
- **Unit Tests**: 100% for utility functions
- **Component Tests**: 90%+ for UI components
- **Integration Tests**: Cover critical user flows
- **E2E Tests**: Cover happy path scenarios

### 4. **Mocking Strategy**
```typescript
// Mock external dependencies
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/test"
  })
}));

// Mock API calls
jest.mock("@/lib/api", () => ({
  fetchData: jest.fn().mockResolvedValue({ data: "test" })
}));
```

## 🔍 Debugging Tests

### Common Issues and Solutions

1. **Test Timeout**
```typescript
// Increase timeout for slow tests
jest.setTimeout(10000);
```

2. **Async Issues**
```typescript
// Use proper async/await
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

3. **Cleanup Issues**
```typescript
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
```

## 📊 Monitoring Test Health

### Coverage Reports
```bash
npm run test:coverage
```

### Test Performance
```bash
# Run tests with performance monitoring
npm run test -- --verbose --watchAll=false
```

### Continuous Integration
Your auto-fix scripts will run on:
- Push to any branch
- Pull request creation
- Manual workflow dispatch

## 🚀 Next Steps

1. **Start with a new feature using TDD**
2. **Write the test first** (Red phase)
3. **Implement minimal code** (Green phase)
4. **Refactor and improve** (Refactor phase)
5. **Use auto-fix scripts** for maintenance
6. **Monitor test coverage** regularly

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TDD Best Practices](https://testdriven.io/blog/modern-tdd/)

---

**Your codebase is now TDD-ready! Start writing tests first and let them guide your development. Happy coding! 🎉**
