import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Todo } from "../types/todo";

// custom hook
export default function useTodos() {

    const COLLECTION_NAME: string = import.meta.env.VITE_DB_COLLECTION_NAME;

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const collectionRef = collection(db, COLLECTION_NAME);
    
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const querySnapshot = await getDocs(collectionRef);
                const todosData: Todo[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    completed: doc.data().completed
                }));
                setTodos(todosData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTodos();

    }, []);

    const updateTodo = async (id: string, completed: boolean) => {
        const existingTodo = doc(db, COLLECTION_NAME, id);
        await updateDoc(existingTodo, {completed: completed});
    }

    const deleteTodoFromDb = async (id: string) => {
        const existingTodo = doc(db, COLLECTION_NAME, id);
        await deleteDoc(existingTodo);
    }

    function setTodoCompleted(id: string, completed: boolean) {
        setTodos((prevTodos) => prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo)));
        updateTodo(id, completed);
    }


    async function addTodo(title: string) {

        await addDoc(collectionRef, { title: title, completed: false }).then((doc) => {
            setTodos(prevTodos => [
                {
                    id: doc.id,
                    title,
                    completed: false
                },
                ...prevTodos,
            ])
        }).catch(err => window.alert(err));

    }

    function deleteTodo(id: string) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        deleteTodoFromDb(id);
    }

    function deleteAllCompletedTodos() {
        todos.forEach(todo => {
            if(todo.completed) deleteTodoFromDb(todo.id);
        })
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