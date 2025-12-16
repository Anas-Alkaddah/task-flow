import { useState, useEffect } from 'react';
import initialData from '../utils/initialData';

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

/**
 * Custom Hook لإدارة بيانات Kanban
 * يتعامل مع: localStorage, boards, columns, tasks
 */
export const useKanbanData = () => {
    const [data, setData] = useState(getInitialState);

    // Persist to LocalStorage
    useEffect(() => {
        localStorage.setItem('kanban-state', JSON.stringify(data));
    }, [data]);

    // Derived State
    const activeBoard = data.boards[data.currentBoardId];

    // Switch Board
    const switchBoard = (boardId) => {
        setData(prev => ({ ...prev, currentBoardId: boardId }));
    };

    // Create Board
    const createBoard = (boardTitle) => {
        const newBoardId = `board-${Date.now()}`;
        setData(prev => ({
            ...prev,
            boards: {
                ...prev.boards,
                [newBoardId]: {
                    id: newBoardId,
                    title: boardTitle,
                    columns: {},
                    tasks: {},
                    columnOrder: []
                },
            },
            boardOrder: [...prev.boardOrder, newBoardId],
            currentBoardId: newBoardId,
        }));
        return newBoardId;
    };

    // Add Column
    const addColumn = (columnTitle) => {
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
    };

    // Delete Column
    const deleteColumn = (columnId) => {
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

    // Add Task
    const addTask = (columnId, taskContent, taskDescription) => {
        const newTaskId = `task-${Date.now()}`;
        const newTask = { id: newTaskId, content: taskContent, description: taskDescription };
        setData(prev => {
            const board = prev.boards[prev.currentBoardId];
            const column = board.columns[columnId];
            return {
                ...prev,
                boards: {
                    ...prev.boards,
                    [prev.currentBoardId]: {
                        ...board,
                        tasks: { ...board.tasks, [newTaskId]: newTask },
                        columns: {
                            ...board.columns,
                            [columnId]: { ...column, taskIds: [...column.taskIds, newTaskId] },
                        },
                    }
                }
            };
        });
    };

    // Update Task
    const updateTask = (taskId, taskContent, taskDescription) => {
        setData(prev => {
            const board = prev.boards[prev.currentBoardId];
            const updatedTask = { ...board.tasks[taskId], content: taskContent, description: taskDescription };
            return {
                ...prev,
                boards: {
                    ...prev.boards,
                    [prev.currentBoardId]: {
                        ...board,
                        tasks: { ...board.tasks, [taskId]: updatedTask }
                    }
                }
            };
        });
    };

    // Delete Task
    const deleteTask = (taskId) => {
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

    return {
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
    };
};
