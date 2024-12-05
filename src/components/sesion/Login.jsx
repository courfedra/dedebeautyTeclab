import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () =>{
    const { loginWithRedirect } = useAuth0();
    return(
        <div className="anchor-sesion">
            <Link onClick={() => loginWithRedirect()}>Conectarme</Link>
        </div>
    )
}
