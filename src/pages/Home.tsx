import NewTodo from "../components/NewTodo";
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import useTodos from "../hooks/useTodos";


export default function Home() {

    const { todos, addTodo, setTodoCompleted, deleteAllCompletedTodos, deleteTodo } = useTodos();

    return (
        <>
            <main className="py-10 h-screen space-y-5 overflow-y-auto bg-gray-50">
                <h1 className="font-bold text-3xl text-center">Todos</h1>
                <div className="max-w-lg mx-auto bg-gray-100 rounded-2xl p-5 space-y-6 shadow-lg">
                    <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos} />
                    <NewTodo onSubmit={addTodo} />
                    <TodoList
                        todos={todos}
                        onCompletedChange={setTodoCompleted}
                        onDelete={deleteTodo} />
                </div>
            </main>
        </>
    )
}