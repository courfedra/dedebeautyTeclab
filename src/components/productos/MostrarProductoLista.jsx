import "./mostrarProductoLista.css"
import { Link } from "react-router-dom";
import { porcentaje } from "../functions/Functions";
export const MostrarProductoLista = ({producto}) => {
    return(
        <div className="card">
            <div className="card-top">
                <div className="img-descuento">
                    <div className="img-box" style={{backgroundImage:`url(${producto.foto})`}}>
                        {producto.hayDescuento&&<p className="img-descuento-ribbon">-{producto.totalDescuento}%</p>}
                    </div>
                </div>
                <div className="card-top_brand-name">
                    <h3>{producto.marca.toUpperCase()}</h3>
                    <h4>{producto.nombre}</h4>
                    {producto.hayDescuento
                    ?<div className="card-price-precio">
                        <p className="precio-tachado">
                            ${producto.precio}
                        </p>
                        <p className="precio-descuento">
                            ${porcentaje(producto.precio,producto.totalDescuento)}
                        </p>
                    </div>
                    :<div className="card-price-precio">
                        <p className="precio-descuento">${producto.precio}</p>
                    </div>}
                    <div className="card-buy-true">
                        <Link to={`/producto/${producto.id}`}>
                            <button>Ver detalle</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}