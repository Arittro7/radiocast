import LeftSidebar from "@/components/LeftSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <LeftSidebar/>
        {children}
        <p className="text-xl">Right Sidebar</p>
      </main>
    </div>
  );
}
