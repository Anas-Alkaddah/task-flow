import Modal from './Modal';

/**
 * BoardModal Component - مودال إنشاء Board جديد
 */
const BoardModal = ({
    isOpen,
    onClose,
    onSubmit,
    boardTitle,
    setBoardTitle
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!boardTitle.trim()) return;
        onSubmit();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Workspace"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 text-slate-400 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!boardTitle.trim()}
                        className="btn-primary px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50"
                    >
                        Launch Board
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default BoardModal;
