import { useParams } from "react-router-dom"
import {MostrarProductoLista} from "./MostrarProductoLista"
import { ShowBoxCategories } from "../functions/ShowBoxCategories"
import "./mostrarCategoriasProductos.css"
import BannerCategories from "../../assets/BeFreedomDedeBeauty.jpg"
import { useContext } from "react";
import { ContextVariables } from "../ContextVariables";
export const MostrarCategoriasProducto=()=>{
    const {datos}=useContext(ContextVariables);
    let { IdCategoria } = useParams();
    const prods = datos.filter((e)=>e.categorie==IdCategoria);
    return(
        <div className="categories-container">
            <div className="categories-banner">
                <img src={BannerCategories} alt="banner categories"/>
            </div>
            <div className="categories-categories">
                <div className="categories-products">
                    <ShowBoxCategories prod={datos}/>
                </div>
            </div>
            <div className="categories-products">
                <div className="categories-products-cards">
                    {prods.map((e)=>{
                        return(<MostrarProductoLista producto={e} key={prods.indexOf(e)}/>)
                    })}
                </div>
            </div>
        </div>
    )
}