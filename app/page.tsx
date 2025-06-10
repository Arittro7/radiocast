import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Shadcn/UI and Tailwind are working!
        </h1>
        <p className="mt-2 text-muted-foreground">
          This button and text are styled correctly.
        </p>
        <Button className="mt-6">Click Me</Button>
      </div>
    </main>
  );
}
