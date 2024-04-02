import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "../utils/cookieUtil";


interface LoginProps {
    setVerified: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({setVerified, setLoading}: LoginProps) {

    const loginUser = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCookie(userCredential.user.uid);
            setVerified(true);
        } catch (error) {
            window.alert("email/password was incorrect");
        }
    }

    return (
        <>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg pt-10 pb-10">
                    <div className="max-w-3xl px-20">
                        <h2 className="font-bold text-2xl">LOGIN</h2>
                        <p className="text-sm mt-4">Please login to continue</p>
                        <form action="" className="flex flex-col gap-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const email = formData.get("email") as string;
                            const password = formData.get("password") as string;
                            loginUser(email, password);
                        }}>
                            <input className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="Email" required />
                            <input className="p-2 rounded-xl border" type="password" name="password" placeholder="Password" required />
                            <button className="bg-[#4369ff] rounded-xl text-white py-2 font-medium" type="submit">Login</button>
                        </form>

                        <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                            <hr className="border-gray-500" />
                            <p className="text-center">OR</p>
                            <hr className="border-gray-500" />

                        </div>
                        <p className="text-center mt-5 text-gray-600">Contact admin to signup</p>

                    </div>
                </div>
            </section>
        </>
    )
}