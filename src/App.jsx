import { useState } from 'react';
import { useKanbanData } from './hooks/useKanbanData';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useModals } from './hooks/useModals';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import ColumnModal from './components/ColumnModal';
import BoardModal from './components/BoardModal';

/**
 * App Component - المكون الرئيسي
 * يجمع كل المكونات والـ Hooks معاً
 */
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Custom Hooks
  const {
    data,
    setData,
    activeBoard,
    switchBoard,
    createBoard,
    addColumn,
    deleteColumn,
    addTask,
    updateTask,
    deleteTask,
  } = useKanbanData();

  const { onDragEnd } = useDragAndDrop(data, setData, activeBoard);

  const {
    // Task Modal
    isTaskModalOpen,
    openAddTaskModal,
    openEditTaskModal,
    closeTaskModal,
    currentColumnId,
    editingTask,
    taskContent,
    setTaskContent,
    taskDescription,
    setTaskDescription,
    // Column Modal
    isColumnModalOpen,
    openColumnModal,
    closeColumnModal,
    columnTitle,
    setColumnTitle,
    // Board Modal
    isBoardModalOpen,
    openBoardModal,
    closeBoardModal,
    boardTitle,
    setBoardTitle,
  } = useModals();

  // Handlers
  const handleSaveTask = () => {
    if (editingTask) {
      updateTask(editingTask.id, taskContent, taskDescription);
    } else {
      addTask(currentColumnId, taskContent, taskDescription);
    }
    closeTaskModal();
  };

  const handleAddColumn = () => {
    addColumn(columnTitle);
    closeColumnModal();
  };

  const handleCreateBoard = () => {
    createBoard(boardTitle);
    closeBoardModal();
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure?')) {
      deleteTask(taskId);
    }
  };

  const handleDeleteColumn = (columnId) => {
    if (window.confirm('Delete this list?')) {
      deleteColumn(columnId);
    }
  };

  return (
    <div className="h-screen w-screen animated-bg text-slate-50 flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        boards={data.boards}
        boardOrder={data.boardOrder}
        currentBoardId={data.currentBoardId}
        onBoardSwitch={switchBoard}
        onCreateBoard={openBoardModal}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative bg-black/10">
        {/* Background Blur Layer */}
        <div className="absolute inset-0 backdrop-blur-sm -z-10 pointer-events-none" />

        {/* Navbar */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          boardTitle={activeBoard.title}
          onAddColumn={openColumnModal}
        />

        {/* Board Area */}
        <Board
          activeBoard={activeBoard}
          onDragEnd={onDragEnd}
          onAddTask={openAddTaskModal}
          onEditTask={openEditTaskModal}
          onDeleteTask={handleDeleteTask}
          onDeleteColumn={handleDeleteColumn}
          onAddColumn={openColumnModal}
        />
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        onSubmit={handleSaveTask}
        editingTask={editingTask}
        taskContent={taskContent}
        setTaskContent={setTaskContent}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
      />

      <ColumnModal
        isOpen={isColumnModalOpen}
        onClose={closeColumnModal}
        onSubmit={handleAddColumn}
        columnTitle={columnTitle}
        setColumnTitle={setColumnTitle}
      />

      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={closeBoardModal}
        onSubmit={handleCreateBoard}
        boardTitle={boardTitle}
        setBoardTitle={setBoardTitle}
      />

    </div>
  );
}

export default App;
