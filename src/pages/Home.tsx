import NewTodo from "../components/NewTodo";
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import useTodos from "../hooks/useTodos";
import { auth } from "../firebaseConfig";
import { getCookie } from "../utils/cookieUtil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Todo List";
        const uid = getCookie("token");
        auth.onAuthStateChanged((user) => {
            if (user && uid) {
                if (user.uid !== uid) {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        })
    }, [])

    const { todos, addTodo, setTodoCompleted, deleteAllCompletedTodos, deleteTodo } = useTodos();

    return (
        <>
            <main className="py-10 h-screen space-y-5 overflow-y-auto">
                <h1 className="font-bold text-3xl text-center">Todos</h1>
                <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
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