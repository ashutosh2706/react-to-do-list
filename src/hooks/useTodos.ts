import { useEffect, useState } from "react";
import { dummyData } from "../data/todo";

// custom hook
export default function useTodos() {

    const [todos, setTodos] = useState(() => {
        return dummyData;
    });
    
    useEffect(() => {
        
    }, [todos]);
    
    function setTodoCompleted(id: string, completed:boolean) {
        setTodos((prevTodos) => 
        prevTodos.map(todo => (todo.id === id ? {...todo, completed} : todo )))
    }
      
    function addTodo(title: string) {
        setTodos(prevTodos => [
          {
            id: Date.now().toString(),
            title,
            completed: false
          },
          ...prevTodos,
        ])
    }
    
    function deleteTodo(id: string) {
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