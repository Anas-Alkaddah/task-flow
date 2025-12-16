import Modal from './Modal';

/**
 * ColumnModal Component - مودال إضافة عمود جديد
 */
const ColumnModal = ({
    isOpen,
    onClose,
    onSubmit,
    columnTitle,
    setColumnTitle
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!columnTitle.trim()) return;
        onSubmit();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="New List"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 text-slate-400 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!columnTitle.trim()}
                        className="btn-primary px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50"
                    >
                        Create List
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ColumnModal;
