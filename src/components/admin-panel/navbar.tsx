import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { SignedIn} from "@clerk/clerk-react";

interface NavbarProps {
  title1?: string;
  title2: string;
}

export function Navbar({ title1, title2 }: NavbarProps) {
  return (
    <header className="sticky top-5 z-10 w-full bg-white shadow-xl rounded-full border border-gray-200 animate-slide-down">
      <div className="mx-4 sm:mx-8 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4 ml-10">
          <SheetMenu />
          <h1 className="text-xl font-medium text-black">
            {title1 ?? title1}{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title2}
            </span>{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* <ModeToggle /> */}
          <SignedIn>
            <UserNav />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
