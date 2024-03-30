import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onCompletedChange: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export default function TodoList({todos, onCompletedChange, onDelete}: TodoListProps) {

    const sortedList = todos.sort((a, b) => {
        if(a.completed === b.completed) return 2;
        return a.completed ? 1 : -1;
    });

    return (
        <>
            <div className="space-y-2">
                {sortedList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onCompletedChange={onCompletedChange}
                        onDelete={onDelete} />
                ))}
            </div>
            {todos.length === 0 && (
                <p className="text-center text-sm text-gray-500">You've finished.</p>
            )}
        </>
    )

    
}