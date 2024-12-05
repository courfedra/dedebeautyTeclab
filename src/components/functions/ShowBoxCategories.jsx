import "./showBoxCategories.css"
import { Link } from "react-router-dom"
import { CategoriesList } from "./Functions";
import { useContext } from "react";
import { ContextVariables } from "../ContextVariables";
export const ShowBoxCategories=()=>{
    const {datos}=useContext(ContextVariables);
    let box=CategoriesList(datos)
    return(
        <div className="categories-boxes">
            {box.map((e)=>{
                return(
                    <Link to={`/categoria/${e}`} key={box.indexOf(e)}>
                        <div className="box">
                            {e}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}