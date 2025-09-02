export default function Home() {
    const message = "Hello world"   // ← missing semicolon
    console.log("unused");          // ← ESLint will complain about unused console
    return <h1>{message}</h1>
  }
  