import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { getCookie } from "../utils/cookieUtil";
import Home from "./Home";
import Login from "./Login";

export default function Check() {

    const [loading, setLoading] = useState<boolean>(true);
    const [verified, setVerified] = useState<boolean>(false);

    useEffect(() => {
        const uid = getCookie("token");
        auth.onAuthStateChanged((user) => {
            if (user && uid) {
                if (user.uid === uid) {
                    setVerified(true);
                }
            }
            setLoading(false);
        })
    }, [verified]);


    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
                <button type="button" className="flex items-center rounded-lg bg-[#4369ff] px-4 py-2 text-white shadow-lg" disabled>
                    <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-medium"> Please Wait </span>
                </button>
            </div>
        )
    } else {
        return verified ? (<Home />) : (<Login setVerified={setVerified} setLoading={setLoading} />)
    }

}