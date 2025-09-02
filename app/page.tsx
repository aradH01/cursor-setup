import Image from "next/image";
import { Button } from "./_components/button";
import { Input } from "./_components/input";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-4">UI Components Demo</h1>
          <p className="text-gray-600 mb-8">
            Demonstrating custom Button and Input components with various variants and sizes.
          </p>
        </div>

        <div className="space-y-8 w-full max-w-2xl">
          {/* Button Variants */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link Button</Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Button Sizes</h2>
            <div className="flex flex-wrap items-end gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🚀</Button>
            </div>
          </div>

          {/* Button States */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Button States</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading...</Button>
            </div>
          </div>
        </div>

        <div className="space-y-8 w-full max-w-2xl">
          {/* Input Component Demo */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Input Component Demo</h2>
            
            {/* Basic input */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Basic Input</h3>
              <Input placeholder="Enter your name" />
            </div>

            {/* With label and help text */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">With Label & Help Text</h3>
              <Input 
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                helpText="We'll never share your email"
              />
            </div>

            {/* Error state */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Error State</h3>
              <Input 
                label="Password"
                type="password"
                variant="error"
                error="Password must be at least 8 characters"
              />
            </div>

            {/* Success state */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Success State</h3>
              <Input 
                label="Username"
                variant="success"
                success="Username is available!"
              />
            </div>

            {/* Different sizes */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Different Sizes</h3>
              <div className="space-y-2">
                <Input size="sm" placeholder="Small input" />
                <Input size="default" placeholder="Default input" />
                <Input size="lg" placeholder="Large input" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
