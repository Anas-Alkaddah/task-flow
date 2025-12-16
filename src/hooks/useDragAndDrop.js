/**
 * Custom Hook لإدارة منطق Drag and Drop
 * يفصل منطق السحب والإفلات عن الـ UI
 */
export const useDragAndDrop = (data, setData, activeBoard) => {
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

        // Moving Tasks
        const start = board.columns[source.droppableId];
        const finish = board.columns[destination.droppableId];

        // Same column
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

    return { onDragEnd };
};
