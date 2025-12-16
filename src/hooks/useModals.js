import { useState } from 'react';


export const useModals = () => {
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

    // Open Add Task Modal
    const openAddTaskModal = (columnId) => {
        setCurrentColumnId(columnId);
        setEditingTask(null);
        setTaskContent('');
        setTaskDescription('');
        setIsTaskModalOpen(true);
    };

    // Open Edit Task Modal
    const openEditTaskModal = (task) => {
        setEditingTask(task);
        setTaskContent(task.content);
        setTaskDescription(task.description);
        setIsTaskModalOpen(true);
    };

    // Close Task Modal
    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setEditingTask(null);
        setTaskContent('');
        setTaskDescription('');
    };

    // Open Column Modal
    const openColumnModal = () => {
        setColumnTitle('');
        setIsColumnModalOpen(true);
    };

    // Close Column Modal
    const closeColumnModal = () => {
        setIsColumnModalOpen(false);
        setColumnTitle('');
    };

    // Open Board Modal
    const openBoardModal = () => {
        setBoardTitle('');
        setIsBoardModalOpen(true);
    };

    // Close Board Modal
    const closeBoardModal = () => {
        setIsBoardModalOpen(false);
        setBoardTitle('');
    };

    return {
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
    };
};
