import { Login } from "../sesion/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { useState,useEffect,useContext} from "react";
import "./ComprarProducto.css";
import "../../header/sesion.css";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";

export const BotonComprar=({producto})=>{
    const {isAuthenticated} = useAuth0()
    const {cartList, addToCart}=useContext(CartContext);
    const [prodCarrito, setProdCarrito]=useState(1)
    const [btnActiveRestar, setBtnActiveRestar]=useState(false)
    const [btnActiveSumar, setBtnActiveSumar]=useState(true)
    const [cantActualDisponible,setCantActualDisponible]=useState(0)
    let prodEnCarritoVista=cartList.find((e)=>e.id==producto.id)

    useEffect(()=>{
        prodCarrito>1?setBtnActiveRestar(true):setBtnActiveRestar(false)
        prodCarrito<producto.stock?setBtnActiveSumar(true):setBtnActiveSumar(false)
    },[prodCarrito])
    const cantActual=()=>{
        return prodEnCarritoVista!=undefined ? producto.stock-prodEnCarritoVista.cantidad : producto.stock
    }

    const boxSumarRestar = () => {
        return(
            <div className="box-produto-carrito">
                <div className="box-adquirir-restar">
                    <button className={btnActiveRestar?"btn-active":"btn-no-active"} onClick={()=>{prodCarrito>1&&setProdCarrito(prodCarrito-1)}}><span>-</span></button>
                    <div>
                        <span>{prodCarrito}</span>
                    </div>
                    <button className={btnActiveSumar?"btn-active":"btn-no-active"} onClick={()=>{prodCarrito<cantActual()&&setProdCarrito(prodCarrito+1)}}><span>+</span></button>
                </div>
                <div className="box-btn-confirm">
                    <Link onClick={()=>{addToCart(producto,prodCarrito)}} to="/cart">Confirmar y ver carrito</Link>
                </div>
            </div>
        )
    }

    return(
        <div className="btn-buy">
            <div className="cant-stock-word">
                {cantActual()<0?<h4>No hay stock</h4>:<h4>hay {cantActual()} unidades disponibles</h4>}
            </div>
        {producto.stock>0
            ?isAuthenticated
                ?cantActual()>0&&boxSumarRestar()
                :<div className="box-comprar-conectado">
                    <p>Debes iniciar sesión para poder comprar</p>
                    <Login/>
                 </div>
            :<button>Encargar</button>
        }
        </div>
    )
}