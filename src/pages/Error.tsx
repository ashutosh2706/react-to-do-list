import { useEffect } from "react"

export default function Error() {
    
    useEffect(() => {
        document.title = "Page not found";
    }, [])
    
    return (
        <>
            <div className="flex text-3xl h-screen justify-center items-center">
                <div className="absolute">
                    <p>Error 404</p>
                </div>
            </div>
        </>
    )
}