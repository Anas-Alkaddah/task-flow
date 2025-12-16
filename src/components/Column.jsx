
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Plus, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Column({ column, tasks, index, onAddTask, onDeleteTask, onEditTask, onDeleteColumn }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="w-80 shrink-0 h-full max-h-full flex flex-col relative"
                >
                    {/* Glass Background Layer (Separate from content to fix drag offset) */}
                    <div className="absolute inset-0 rounded-2xl backdrop-blur-md -z-10 pointer-events-none" />

                    <div className="glass-column rounded-2xl flex flex-col max-h-full transition-colors duration-300">
                        {/* Header */}
                        <div
                            {...provided.dragHandleProps}
                            className="p-4 flex justify-between items-center cursor-grab active:cursor-grabbing group"
                        >
                            <div className="flex items-center gap-2.5">
                                <h3 className="font-semibold text-slate-100 tracking-wide">{column.title}</h3>
                                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-300 border border-white/5">
                                    {tasks.length}
                                </span>
                            </div>

                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                >
                                    <MoreHorizontal size={18} />
                                </button>

                                {/* Dropdown Menu */}
                                {showMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                        <button
                                            onClick={() => {
                                                onDeleteColumn(column.id);
                                                setShowMenu(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-white/5 hover:text-red-300 text-sm transition-colors text-left"
                                        >
                                            <Trash2 size={16} />
                                            Delete List
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tasks Container */}
                        <Droppable droppableId={column.id} type="task">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`
                    flex-1 overflow-y-auto px-3 pb-3 custom-scrollbar
                    transition-colors duration-200 min-h-[100px]
                    ${snapshot.isDraggingOver ? 'bg-indigo-500/10' : ''}
                  `}
                                >
                                    {tasks.map((task, index) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            index={index}
                                            onDelete={onDeleteTask}
                                            onEdit={onEditTask}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        {/* Footer */}
                        <div className="p-3 pt-0">
                            <button
                                onClick={() => onAddTask(column.id)}
                                className="w-full py-2.5 flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-300 hover:bg-white/5 rounded-xl transition-all font-medium text-sm group"
                            >
                                <div className="p-0.5 rounded bg-white/5 group-hover:bg-indigo-500/20 transition-colors">
                                    <Plus size={14} />
                                </div>
                                <span>Add Task</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
