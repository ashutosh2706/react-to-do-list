import { useState } from "react"


interface NewTodoProps {
    onSubmit: (title: string) => void;
}

export default function NewTodo({onSubmit}: NewTodoProps) {

    const [input, setInput] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!input.trim()) return;
        onSubmit(input);
        setInput("");
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's on your mind ?" className="rounded-s-md grow border border-gray-400 p-2"/>
            <button type="submit" className="w-16 rounded-e-md text-white bg-slate-900 hover:bg-slate-700">Add</button>
        </form>
    )
}