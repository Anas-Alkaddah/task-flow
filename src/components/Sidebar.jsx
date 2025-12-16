import { Plus, Layout, SquareKanban, Menu, Settings } from 'lucide-react';

/**
 * Sidebar Component - القائمة الجانبية
 * يعرض قائمة Boards والتنقل بينها
 */
const Sidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    boards,
    boardOrder,
    currentBoardId,
    onBoardSwitch,
    onCreateBoard
}) => {
    return (
        <>
            {/* Mobile Sidebar Overlay/Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Glass Sidebar */}
            <aside
                className={`fixed md:relative z-50 h-full w-[85vw] md:w-72 glass-sidebar transition-transform duration-300 ease-in-out transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isSidebarOpen ? '' : 'md:hidden'} shrink-0 flex flex-col`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/30">
                                <SquareKanban size={24} className="text-white" />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                TaskFlow
                            </h1>
                        </div>
                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="md:hidden p-1 text-slate-400 hover:text-white"
                        >
                            <Menu size={24} className="rotate-90" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Workspaces</h2>
                            <div className="space-y-1">
                                {boardOrder.map(boardId => {
                                    const board = boards[boardId];
                                    const isActive = boardId === currentBoardId;
                                    return (
                                        <button
                                            key={boardId}
                                            onClick={() => {
                                                onBoardSwitch(boardId);
                                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3
                        ${isActive
                                                    ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:pl-5'
                                                }`}
                                        >
                                            <Layout size={18} />
                                            <span className="truncate">{board.title}</span>
                                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-4 border-t border-white/5 bg-black/20 flex flex-col gap-4">
                    <button
                        onClick={onCreateBoard}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-white/20 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group"
                    >
                        <div className="p-1 rounded bg-white/5 group-hover:bg-indigo-500/20 transition-colors">
                            <Plus size={14} />
                        </div>
                        <span className="truncate">Create New Board</span>
                    </button>

                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=Anas+User&background=random" alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-200 truncate">Anas User</h4>
                            <p className="text-xs text-slate-500 truncate">Pro Plan</p>
                        </div>
                        <Settings size={16} className="text-slate-500" />
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
