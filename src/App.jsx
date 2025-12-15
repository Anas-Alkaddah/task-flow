import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import initialData from './utils/initialData';
import Column from './components/Column';
import Modal from './components/Modal';
import { Plus, Layout, SquareKanban, Menu, CheckSquare, Search, Bell, Settings } from 'lucide-react';

// Helper to check for persistent data
const getInitialState = () => {
  const savedData = localStorage.getItem('kanban-state');
  if (savedData) {
    const parsed = JSON.parse(savedData);
    if (!parsed.boards) {
      return initialData;
    }
    return parsed;
  }
  return initialData;
};

function App() {
  const [data, setData] = useState(getInitialState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Form States
  const [taskContent, setTaskContent] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [columnTitle, setColumnTitle] = useState('');
  const [boardTitle, setBoardTitle] = useState('');

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('kanban-state', JSON.stringify(data));
  }, [data]);

  // Derived State
  const activeBoard = data.boards[data.currentBoardId];

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const board = activeBoard;

    // Moving Columns
    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        boards: {
          ...data.boards,
          [data.currentBoardId]: {
            ...board,
            columnOrder: newColumnOrder,
          }
        }
      });
      return;
    }

    // Moving Tasks logic remains same as before...
    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      setData({
        ...data,
        boards: {
          ...data.boards,
          [data.currentBoardId]: {
            ...board,
            columns: { ...board.columns, [newColumn.id]: newColumn }
          }
        }
      });
      return;
    }

    // Moving across columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData({
      ...data,
      boards: {
        ...data.boards,
        [data.currentBoardId]: {
          ...board,
          columns: {
            ...board.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          }
        }
      }
    });
  };

  // --- Handlers (Same logic, cleaner implementation) ---
  const handleOpenAddTask = (columnId) => {
    setCurrentColumnId(columnId);
    setEditingTask(null);
    setTaskContent('');
    setTaskDescription('');
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setTaskContent(task.content);
    setTaskDescription(task.description);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;

    if (editingTask) {
      const updatedTask = { ...editingTask, content: taskContent, description: taskDescription };
      setData(prev => ({
        ...prev,
        boards: {
          ...prev.boards,
          [prev.currentBoardId]: {
            ...prev.boards[prev.currentBoardId],
            tasks: { ...prev.boards[prev.currentBoardId].tasks, [updatedTask.id]: updatedTask }
          }
        }
      }));
    } else {
      const newTaskId = `task-${Date.now()}`;
      const newTask = { id: newTaskId, content: taskContent, description: taskDescription };
      setData(prev => {
        const board = prev.boards[prev.currentBoardId];
        const column = board.columns[currentColumnId];
        return {
          ...prev,
          boards: {
            ...prev.boards,
            [prev.currentBoardId]: {
              ...board,
              tasks: { ...board.tasks, [newTaskId]: newTask },
              columns: {
                ...board.columns,
                [currentColumnId]: { ...column, taskIds: [...column.taskIds, newTaskId] },
              },
            }
          }
        };
      });
    }
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    if (!window.confirm('Are you sure?')) return;
    setData(prev => {
      const board = prev.boards[prev.currentBoardId];
      const newTasks = { ...board.tasks };
      delete newTasks[taskId];
      const newColumns = { ...board.columns };
      for (const colId in newColumns) {
        newColumns[colId] = {
          ...newColumns[colId],
          taskIds: newColumns[colId].taskIds.filter(id => id !== taskId)
        };
      }
      return {
        ...prev,
        boards: {
          ...prev.boards,
          [prev.currentBoardId]: { ...board, tasks: newTasks, columns: newColumns }
        }
      };
    });
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    if (!columnTitle.trim()) return;
    const newColumnId = `column-${Date.now()}`;
    const newColumn = { id: newColumnId, title: columnTitle, taskIds: [] };
    setData(prev => ({
      ...prev,
      boards: {
        ...prev.boards,
        [prev.currentBoardId]: {
          ...prev.boards[prev.currentBoardId],
          columns: { ...prev.boards[prev.currentBoardId].columns, [newColumnId]: newColumn },
          columnOrder: [...prev.boards[prev.currentBoardId].columnOrder, newColumnId],
        }
      }
    }));
    setColumnTitle('');
    setIsColumnModalOpen(false);
  };

  const handleDeleteColumn = (columnId) => {
    if (!window.confirm('Delete this list?')) return;
    setData(prev => {
      const board = prev.boards[prev.currentBoardId];
      const taskIdsToRemove = board.columns[columnId].taskIds;
      const newTasks = { ...board.tasks };
      taskIdsToRemove.forEach(id => delete newTasks[id]);
      const newColumns = { ...board.columns };
      delete newColumns[columnId];
      return {
        ...prev,
        boards: {
          ...prev.boards,
          [prev.currentBoardId]: {
            ...board,
            tasks: newTasks,
            columns: newColumns,
            columnOrder: board.columnOrder.filter(id => id !== columnId),
          }
        }
      };
    });
  };

  const handleCreateBoard = (e) => {
    e.preventDefault();
    if (!boardTitle.trim()) return;
    const newBoardId = `board-${Date.now()}`;
    setData(prev => ({
      ...prev,
      boards: {
        ...prev.boards,
        [newBoardId]: { id: newBoardId, title: boardTitle, columns: {}, tasks: {}, columnOrder: [] },
      },
      boardOrder: [...prev.boardOrder, newBoardId],
      currentBoardId: newBoardId,
    }));
    setBoardTitle('');
    setIsBoardModalOpen(false);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen w-screen animated-bg text-slate-50 flex overflow-hidden">

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
                {data.boardOrder.map(boardId => {
                  const board = data.boards[boardId];
                  const isActive = boardId === data.currentBoardId;
                  return (
                    <button
                      key={boardId}
                      onClick={() => {
                        setData(p => ({ ...p, currentBoardId: boardId }));
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
            onClick={() => setIsBoardModalOpen(true)}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative bg-black/10">
        {/* Background Blur Layer - Separated to avoid 'containing block' issues with fixed dragging items */}
        <div className="absolute inset-0 backdrop-blur-sm -z-10 pointer-events-none" />

        {/* Navbar */}
        <header className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <button
              className={`p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors md:transform ${!isSidebarOpen && 'md:rotate-180'}`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} className="md:w-5 md:h-5" />
            </button>
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md truncate">{activeBoard.title}</h2>
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
              onClick={() => setIsColumnModalOpen(true)}
              className="btn-primary flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-medium text-sm ml-1 md:ml-2 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add List</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        {/* Board Area */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-4 md:p-8 pt-0 scroll-smooth">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-4 md:gap-6 h-full items-start"
                >
                  {activeBoard.columnOrder.length === 0 ? (
                    <div className="m-auto flex flex-col items-center gap-6 text-center max-w-sm animate-in fade-in zoom-in duration-500 px-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 flex items-center justify-center border border-white/10 shadow-2xl shadow-indigo-500/20">
                        <Layout size={40} className="md:w-12 md:h-12 text-indigo-300" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Welcome to your new board!</h3>
                        <p className="text-sm md:text-base text-slate-400 leading-relaxed">It looks a bit empty here. Start by adding a list to organize your workflow efficiently.</p>
                      </div>
                      <button
                        onClick={() => setIsColumnModalOpen(true)}
                        className="btn-primary px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-medium flex items-center gap-2"
                      >
                        <Plus size={20} /> Create First List
                      </button>
                    </div>
                  ) : (
                    activeBoard.columnOrder.map((columnId, index) => {
                      const column = activeBoard.columns[columnId];
                      const tasks = column.taskIds.map(taskId => activeBoard.tasks[taskId]);

                      return (
                        <Column
                          key={column.id}
                          column={column}
                          tasks={tasks}
                          index={index}
                          onAddTask={handleOpenAddTask}
                          onEditTask={handleOpenEditTask}
                          onDeleteTask={handleDeleteTask}
                          onDeleteColumn={handleDeleteColumn}
                        />
                      );
                    })
                  )}
                  {provided.placeholder}

                  {/* Quick Add Column Button at the end of lists (optional, mostly for UX) */}
                  {activeBoard.columnOrder.length > 0 && (
                    <button
                      onClick={() => setIsColumnModalOpen(true)}
                      className="w-[85vw] sm:w-80 h-14 shrink-0 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group mb-4"
                    >
                      <Plus size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Add another list</span>
                    </button>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <form onSubmit={handleSaveTask} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Title</label>
            <input
              type="text"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              className="premium-input"
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="premium-input h-32 resize-none"
              placeholder="Add extra details, context, or subtasks..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(false)}
              className="px-5 py-2.5 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskContent.trim()}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Column Modal (Simplified Re-use) */}
      <Modal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        title="New List"
      >
        <form onSubmit={handleAddColumn} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">List Name</label>
            <input
              type="text"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              className="premium-input"
              placeholder="e.g., Backlog, Ideas, Urgent"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsColumnModalOpen(false)} className="px-5 py-2.5 text-slate-400 hover:text-white">Cancel</button>
            <button type="submit" disabled={!columnTitle.trim()} className="btn-primary px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50">Create List</button>
          </div>
        </form>
      </Modal>

      {/* Add Board Modal */}
      <Modal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        title="Create Workspace"
      >
        <form onSubmit={handleCreateBoard} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Workspace Name</label>
            <input
              type="text"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              className="premium-input"
              placeholder="e.g., Marketing Q1, Project Alpha"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsBoardModalOpen(false)} className="px-5 py-2.5 text-slate-400 hover:text-white">Cancel</button>
            <button type="submit" disabled={!boardTitle.trim()} className="btn-primary px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50">Launch Board</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

export default App;
