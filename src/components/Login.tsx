import { supabase } from "../utils/supabaseClient"
import { Auth } from "@supabase/auth-ui-react"
import { useNavigate } from 'react-router-dom';

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
        <div className="App">
            <header className="App-header">
                <Auth
                    supabaseClient={supabase}
                    providers={[]}
                />
            </header>
        </div>
    );
}

export default Login