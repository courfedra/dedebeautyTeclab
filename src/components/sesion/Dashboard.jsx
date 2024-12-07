import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { ContextVariables } from "../ContextVariables";
import { MostrarProductoLista } from "../productos/MostrarProductoLista";
import "./dashboard.css";
import { CreateProduct } from "./CRUD/CreateProduct";
import { DeleteProduct } from "./CRUD/DeleteProduct";
import { ModifyProduct } from "./CRUD/ModifyProduct";
import { MostrarCompras } from "../carrito/mostrarCompras";

export const Dashboard=()=>{
    const [option,setOption] = useState('cargar')
    const {isAuthenticated} = useAuth0()
    const {datosFiltrados}=useContext(ContextVariables);

    const CargarData=()=>{
        switch (option) {
            case 'cargar':
                return(
                    datosFiltrados.map((e)=>{
                        return(<MostrarProductoLista producto={e} key={datosFiltrados.indexOf(e)}/>)
                    })
                )
                break;
            case 'agregar':
                return(<CreateProduct/>);
                break;
            case 'quitar':
                return(<DeleteProduct/>);
                break;
            case 'modificar':
                return(<ModifyProduct/>);
                break;
            case 'tickets':
                return(<MostrarCompras/>);
                break;
        }
    }

    useEffect(()=>{
        CargarData()
    },[option])
    return(
        !isAuthenticated
            ?<h1>Cargando perfil</h1>
            :<div className="profile-container">
                <div className="profile-menu">
                    <ul>
                        <li onClick={()=>{setOption('cargar')}}>Ver Productos</li>
                        <li onClick={()=>{setOption('agregar')}}>Agregar Producto</li>
                        <li onClick={()=>{setOption('quitar')}}>Quitar producto</li>
                        <li onClick={()=>{setOption('modificar')}}>Modificar producto</li>
                        <li onClick={()=>{setOption('tickets')}}>Ver tickets</li>
                    </ul>
                </div>
                <div className="profile-show">
                    <div className="profile-show-cards">
                        {CargarData()}
                    </div>
                </div>
            </div>

    )
}