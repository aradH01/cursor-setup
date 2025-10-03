"use client";

import React, { useState, useCallback, type FC } from "react";
import { cn } from "../../_lib/utils";

interface BrokenComponentProps {
  className?: string;
}

const BrokenComponent = ({ className }: BrokenComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data] = useState<string>("");

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const ChildComponent: FC<{ text: string }> = ({ text }) => (
    <span>{text}</span>
  );

  return (
    <div className={cn("broken-component", { open: isOpen }, className)}>
      <button onClick={handleClick}>
        Toggle: {isOpen ? "Open" : "Closed"}
      </button>
      <ChildComponent text={data} />
    </div>
  );
};

export default BrokenComponent;
