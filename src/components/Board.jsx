import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Plus, Layout } from 'lucide-react';
import Column from './Column';


const Board = ({
    activeBoard,
    onDragEnd,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onDeleteColumn,
    onAddColumn
}) => {
    return (
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-4 md:p-8 pt-0 scroll-smooth">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex gap-4 md:gap-6 h-full items-start"
                        >
                            {activeBoard.columnOrder.length === 0 ? (
                                <div className="m-auto flex flex-col items-center gap-6 text-center max-w-sm animate-in fade-in zoom-in duration-500 px-4">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 flex items-center justify-center border border-white/10 shadow-2xl shadow-indigo-500/20">
                                        <Layout size={40} className="md:w-12 md:h-12 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Welcome to your new board!</h3>
                                        <p className="text-sm md:text-base text-slate-400 leading-relaxed">It looks a bit empty here. Start by adding a list to organize your workflow efficiently.</p>
                                    </div>
                                    <button
                                        onClick={onAddColumn}
                                        className="btn-primary px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-medium flex items-center gap-2"
                                    >
                                        <Plus size={20} /> Create First List
                                    </button>
                                </div>
                            ) : (
                                activeBoard.columnOrder.map((columnId, index) => {
                                    const column = activeBoard.columns[columnId];
                                    const tasks = column.taskIds.map(taskId => activeBoard.tasks[taskId]);

                                    return (
                                        <Column
                                            key={column.id}
                                            column={column}
                                            tasks={tasks}
                                            index={index}
                                            onAddTask={onAddTask}
                                            onEditTask={onEditTask}
                                            onDeleteTask={onDeleteTask}
                                            onDeleteColumn={onDeleteColumn}
                                        />
                                    );
                                })
                            )}
                            {provided.placeholder}

                            {/* Quick Add Column Button */}
                            {activeBoard.columnOrder.length > 0 && (
                                <button
                                    onClick={onAddColumn}
                                    className="w-[85vw] sm:w-80 h-14 shrink-0 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group mb-4"
                                >
                                    <Plus size={20} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">Add another list</span>
                                </button>
                            )}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
    );
};

export default Board;
