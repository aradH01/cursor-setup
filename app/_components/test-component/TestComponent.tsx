"use client";

import React, { type ReactNode } from "react";

export interface TestProps {
  title: string;
  onClick: () => void;
  children?: ReactNode;
}

const TestComponent = ({ title, onClick, children }: TestProps) => {
  return (
    <div className="test-component">
      <h2>{title}</h2>
      <button onClick={onClick}>Click me</button>
      {children}
    </div>
  );
};

export default TestComponent;
