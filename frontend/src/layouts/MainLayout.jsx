import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F2F5] to-[#E4E6EB]">
      
      {/* Content below navbar */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 flex gap-3 sm:gap-4 lg:gap-6">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="sticky top-20 lg:top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-24 sm:pb-20 lg:pb-6">
            {children}
          </main>

        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
