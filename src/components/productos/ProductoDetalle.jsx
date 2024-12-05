import "./productoDetalle.css"
import { Link } from "react-router-dom";
import { porcentaje } from "../functions/Functions";
import { BotonComprar } from "./BotonComprar";
import {MediosPagos} from "../pagos/MediosPagos"
export const ProductoDetalle=({producto})=>{
    return(
        <>
        <div className="btn-back">
            <Link to="/productos">Volver Atrás</Link>
        </div>
        <div className="container-detalle">
            <div className="box-detalle">
                <div className="box-top">
                    <div className="box-img">
                        <img src={producto.foto} alt={`Detalle producto Id ${producto.id}`}/>
                    </div>
                    <div className="box-brand">
                        <div className="brand-status">
                            <p><span>Estado:</span>{producto.status.toUpperCase()}</p>
                            <p><span>Vendedor:</span>{producto.vendedor}</p>
                        </div>
                        <div className="brand-brand">
                            <h2>{producto.marca.toUpperCase()}</h2>
                            <h3>{producto.nombre}</h3>
                        </div>
                        <div className="price-box">
                            {producto.hayDescuento
                            ?<>
                                <p className="price-false">
                                    ${producto.precio}
                                </p>
                                <p className="price-true">
                                    ${porcentaje(producto.precio,producto.totalDescuento)}
                                </p>
                            </>
                            :<>
                                <p className="price-true">
                                    ${producto.precio}
                                </p>
                            </>
                            }
                        </div>
                        <BotonComprar producto={producto}/>
                    </div>
                </div>
                <div className="box-description">
                    <div className="box-text">
                        <p>{producto.descripcion}</p>
                    </div>
                </div>
            </div>
            <div className="payment-detalle">
                <MediosPagos/>
            </div>
        </div>
    </>
    )
}