import { Login } from "../components/sesion/Login"
import { Register } from "../components/sesion/Register"
import { useAuth0 } from "@auth0/auth0-react";
import "./sesion.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextVariables } from "../components/ContextVariables";
import { CartContext } from "../components/CartContext";
import {CartWidget} from "../components/carrito/CartWidget"

const LogoutButton=()=>{
    const {logout} = useAuth0()
    return(
        <Link className="anchor-sesion" onClick={()=>{logout({returnTo:window.location.origin})}}>Salir</Link>
    )
}

const Profile=()=>{
    const {user, isAuthenticated,isLoading} = useAuth0()
    const {reiniciarListCategories}=useContext(ContextVariables);
    const {cartList}=useContext(CartContext);
    if (isLoading){
        return(
            <div>Cargando...</div>
        )
    }
    return(
        isAuthenticated &&
        <div className="profile-sesion">
            <div className="profile-sesion-cart-user">
                <p className="profile-sesion-user">¡Bienvenido! <span>{user.name}</span></p>
                <CartWidget/>
            </div>
            <div>
                <Link onClick={()=>{reiniciarListCategories()}} to={`/perfil/${user.nickname}`}>Perfil</Link>
                <LogoutButton/>
            </div>
        </div>
    )
}

export const Sesion =()=>{
    const {isAuthenticated} = useAuth0()
    return(
        isAuthenticated
        ?<Profile/>
        :<div className="sesion">
            <Login/>
            <Register/>
        </div>
    )
}