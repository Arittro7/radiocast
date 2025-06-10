export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <p className="text-xl">Left Sidebar</p>
        {children}
        <p className="text-xl">Right Sidebar</p>
      </main>
    </div>
  );
}
