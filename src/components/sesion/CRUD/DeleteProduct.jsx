import "./CRUD.css"
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ContextVariables } from "../../ContextVariables";
export const DeleteProduct=()=>{
    const {user} = useAuth0()
    const {datos, borrarProducto}=useContext(ContextVariables);
    let prods = datos.filter((e)=>e.vendedor==user.nickname)
    return(
        <div className="delete-product">
            <div className="product-line">
                <div className="product-info">
                    <div className="minibox-date">
                        <p>Marca</p>
                    </div>
                    <div className="minibox-date">
                        <p>Nombre</p>
                    </div>
                    <div className="minibox-date">
                        <p>Precio</p>
                    </div>
                </div>
            </div>
            {prods.map((e)=>{
                return(
                    <div key={prods.indexOf(e)} className="product-line">
                        <div className="product-info">
                            <div className="minibox-date">
                                <p>{e.marca}</p>
                            </div>
                            <div className="minibox-date">
                                <p>{e.nombre}</p>
                            </div>
                            <div className="minibox-date">
                                <p>{e.stock}</p>
                            </div>
                        </div>
                        <button onClick={()=>{borrarProducto(e.id)}} className="btn-delete"><span>🞬</span></button>
                    </div>
                )
            })}
        </div>
    )
}