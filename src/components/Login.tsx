import { supabase } from "../utils/supabaseClient"
import { Auth } from "@supabase/auth-ui-react"
import { useNavigate } from 'react-router-dom';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Navbar from "./Navbar";

function Login() {
    const navigate = useNavigate();
    supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED_OUT") {
            navigate('/home');
        } else {
            navigate('/');

        }
    })
    return (
        <div className="border-2 border-green-400 flex justify-center items-center flex-col h-screen">
            <Navbar isFull={true} />
            <div className="border-2 border-slate-200 p-5 w-2/5">
                <header className="App-header">
                    <Auth
                        supabaseClient={supabase}
                        providers={[]}
                        appearance={{ theme: ThemeSupa, style: { button: { backgroundColor: "black" }, } }}
                        theme="light"
                    />
                </header>
            </div>
        </div>
    );
}

export default Login