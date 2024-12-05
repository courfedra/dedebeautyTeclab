import { OfferList } from "./Functions"
import { MostrarProductoLista } from "../productos/MostrarProductoLista";
export const ShowOfferProductos=({prod})=>{
    let list=OfferList(prod);
    return(
        list.map((e)=>{
            return(
                <MostrarProductoLista key={list.indexOf(e)} producto={e}/>
            )
        })
    )
}