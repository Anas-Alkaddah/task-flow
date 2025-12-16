import { Menu, Search, Bell, Plus } from 'lucide-react';

/**
 * Navbar Component - شريط التنقل العلوي
 * يعرض عنوان Board الحالي وأزرار الإجراءات
 */
const Navbar = ({
    isSidebarOpen,
    toggleSidebar,
    boardTitle,
    onAddColumn
}) => {
    return (
        <header className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between z-30 shrink-0">
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <button
                    className={`p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors md:transform ${!isSidebarOpen && 'md:rotate-180'}`}
                    onClick={toggleSidebar}
                >
                    <Menu size={24} className="md:w-5 md:h-5" />
                </button>
                <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md truncate">
                        {boardTitle}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium hidden md:block">Last updated just now</p>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <div className="hidden md:flex items-center bg-black/20 rounded-full px-4 py-2 border border-white/5 focus-within:border-indigo-500/50 focus-within:bg-black/40 transition-all mr-2">
                    <Search size={16} className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-slate-200 ml-2 w-24 lg:w-32 focus:w-48 transition-all placeholder:text-slate-600"
                    />
                </div>
                <button className="hidden sm:block p-2.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-pink-500 border border-slate-900"></span>
                </button>
                <button
                    onClick={onAddColumn}
                    className="btn-primary flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-medium text-sm ml-1 md:ml-2 whitespace-nowrap"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add List</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
