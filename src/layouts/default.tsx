import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-2">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://aiplay.space"
          title="aiplay.space homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">aiplay.space</p>
        </Link>
      </footer>
    </div>
  );
}
