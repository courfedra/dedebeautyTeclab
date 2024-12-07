import { useContext } from "react"
import { ContextVariables } from "../ContextVariables";
import { serverTimestamp } from "firebase/firestore";
import "./mostrarCompras.css";
export const MostrarCompras=()=>{
    const {ticketsCompras}=useContext(ContextVariables);
    return(
        <div className="containerTickets">
            {
                ticketsCompras.length>0
                ?ticketsCompras.map((e)=>{
                    return(
                        <div className="boxTicket" key={ticketsCompras.indexOf(e)}>
                            <div className="ticketInfoComprador">
                                <p>ID de compra:
                                    <br/>
                                    <span>{e.id}</span>
                                </p>
                                <p>Correo:
                                    <br/>
                                    <span>{e.comprador.email}</span>
                                </p>
                                <p>Monto de factura:
                                    <br/>
                                    <span>${e.total}</span>
                                </p>
                            </div>
                            {e.items.map((art)=>{
                                return(
                                    <div className="ticketInfoArticulos" key={e.items.indexOf(art)}>
                                        <p>Nombre:
                                            <br/>
                                            <span>{art.title}</span>
                                        </p>
                                        <p>Precio unitario:
                                            <span>${art.price}</span>
                                        </p>
                                        <p>Cantidad:
                                            <span>{art.qty}</span>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
                :<div>Sin Tickets</div>
            }
        </div>
    )
}