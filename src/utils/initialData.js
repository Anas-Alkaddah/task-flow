const initialData = {
    currentBoardId: 'board-1',
    boards: {
        'board-1': {
            id: 'board-1',
            title: 'Welcome Board',
            columns: {
                'column-1': {
                    id: 'column-1',
                    title: 'To Do',
                    taskIds: ['task-1', 'task-2', 'task-4'],
                },
                'column-2': {
                    id: 'column-2',
                    title: 'In Progress',
                    taskIds: ['task-3'],
                },
                'column-3': {
                    id: 'column-3',
                    title: 'Done',
                    taskIds: [],
                },
            },
            tasks: {
                'task-1': { id: 'task-1', content: 'Design System', description: 'Create a consistent design system with colors, typography, and spacing.' },
                'task-2': { id: 'task-2', content: 'Kanban Logic', description: 'Implement drag and drop functionality using @hello-pangea/dnd.' },
                'task-3': { id: 'task-3', content: 'Project Setup', description: 'Initialize Vite project and install dependencies.' },
                'task-4': { id: 'task-4', content: 'UI Polish', description: 'Add glassmorphism effects and smooth transitions.' },
            },
            columnOrder: ['column-1', 'column-2', 'column-3'],
        }
    },
    boardOrder: ['board-1']
};

export default initialData;
