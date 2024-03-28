import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { dummyData } from "../data/todo";

// custom hook
export default function useTodos() {

    const [todos, setTodos] = useState(() => {
        // get initial value
        const savedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        return savedTodos.length > 0 ? savedTodos : dummyData;
    });
    
    useEffect(() => {
        // save the todo to firebase
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    
    function setTodoCompleted(id: number, completed:boolean) {
        setTodos((prevTodos) => 
        prevTodos.map(todo => (todo.id === id ? {...todo, completed} : todo )))
    }
      
    function addTodo(title: string) {
        setTodos(prevTodos => [
          {
            id: Date.now(),
            title,
            completed: false
          },
          ...prevTodos,
        ])
    }
    
    function deleteTodo(id: number) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }
    
    function deleteAllCompletedTodos() {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }

    return {
        todos,
        setTodoCompleted,
        addTodo,
        deleteTodo,
        deleteAllCompletedTodos
    }
}