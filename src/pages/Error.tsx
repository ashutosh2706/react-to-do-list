import { useEffect } from "react"

export default function Error() {

    useEffect(() => {
        document.title = "Page not found";
    }, [])

    return (
        <>
            <div className="flex text-3xl h-screen justify-center items-center">
                <div className="absolute">
                <div className="items-center flex justify-center">
                <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                </div>
                    <p className="text-red-500">Error 404</p>
                </div>
            </div>

        </>
    )
}