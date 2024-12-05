import { CategoriesList } from "./Functions"
import { useContext } from "react";
import { ContextVariables } from "../ContextVariables";
export const ShowCategories=({prod})=>{
    let list=CategoriesList(prod);
    const {reiniciarListCategories, actualizarListCategories,mostrarOfertas}=useContext(ContextVariables);
    return(
        <ul>
            <li onClick={()=>{reiniciarListCategories()}}>Todo</li>
            <li onClick={()=>{mostrarOfertas(prod)}}>¡Ofertas!</li>
            {list.map((e)=>{
                return(
                    <li key={list.indexOf(e)} onClick={()=>{actualizarListCategories(prod,e)}}>
                        {e}
                    </li>
                )
            })}
        </ul>
    )
}