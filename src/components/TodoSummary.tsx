import { Todo } from "../types/todo"

interface TodoSummaryProps {
    todos: Todo[];
    deleteAllCompleted: () => void;
}


export default function TodoSummary({todos, deleteAllCompleted}: TodoSummaryProps) {
    const completedTodos = todos.filter(todo => todo.completed);
    const percentComplete = (completedTodos.length / todos.length) * 100;

    return (
        <div className="text-center space-y-2">
            {todos.length > 0 && (
                <p className="text-lg font-medium">
                    {completedTodos.length}/{todos.length} finished 
                    {percentComplete == 100 ? " 😍" : 
                    percentComplete >= 75 ? " 😀" : 
                    percentComplete >= 50 ? " 🙂" : 
                    percentComplete >= 25 ? " 😠" : 
                    " 😡" }
                </p>
            )}
            {completedTodos.length > 0 && (
                <button onClick={deleteAllCompleted} className="text-red-500 hover:underline text-sm font-medium">
                    Delete all completed
                </button>
            )}
        </div>
    )
}