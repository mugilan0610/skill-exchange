export default function Layout({ sidebar, children }) {
  return (
    <div className="bg-[#F0F2F5] min-h-screen overflow-x-hidden">
      
      {/* Offset for fixed navbar */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex gap-3 sm:gap-4 lg:gap-6">

            {/* Sidebar (desktop only) */}
            {sidebar && (
              <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
                <div className="sticky top-20 lg:top-24">
                  {sidebar}
                </div>
              </aside>
            )}

            {/* Main Content */}
            <main
              className="
                flex-1 min-w-0
                pb-20 sm:pb-16 md:pb-6
              "
            >
              {children}
            </main>

          </div>
        </div>
      </div>
    </div>
  );
}
