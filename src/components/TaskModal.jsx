import Modal from './Modal';


const TaskModal = ({
    isOpen,
    onClose,
    onSubmit,
    editingTask,
    taskContent,
    setTaskContent,
    taskDescription,
    setTaskDescription
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskContent.trim()) return;
        onSubmit();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingTask ? "Edit Task" : "Add New Task"}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                        onClick={onClose}
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
    );
};

export default TaskModal;
