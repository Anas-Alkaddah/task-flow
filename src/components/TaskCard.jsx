/* eslint-disable react/prop-types */
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, Edit2 } from 'lucide-react';

export default function TaskCard({ task, index, onDelete, onEdit }) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                    className="mb-3 outline-none"
                >
                    {/* Inner Visual Container */}
                    <div className={`
                        group relative p-4 rounded-xl 
                        glass-card cursor-grab active:cursor-grabbing
                        border-l-4 border-l-indigo-500/50
                        transition-all duration-200
                        ${snapshot.isDragging ? 'shadow-2xl ring-2 rotate-3 scale-105 bg-slate-800 ring-indigo-500/50' : 'hover:scale-[1.02]'}
                    `}>
                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(task);
                                }}
                                className="p-1.5 hover:bg-indigo-500/20 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
                            >
                                <Edit2 size={14} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="p-1.5 hover:bg-pink-500/20 rounded-lg text-slate-400 hover:text-pink-400 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="pr-8">
                            <h4 className="font-medium text-slate-100 text-sm leading-snug mb-1.5">{task.content}</h4>
                            {task.description && (
                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">{task.description}</p>
                            )}
                        </div>

                        {/* Footer / Meta (Simple) */}
                        <div className="mt-3 flex items-center justify-between text-[10px] font-medium text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                <span>Task</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
