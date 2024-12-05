import productos from "../assets/products/products.json"
import bannerMadre from "../assets/dedeBeautyBannerOfertaMadre.jpg"
import "./productos.css"
import { MostrarProductoLista } from "../components/productos/MostrarProductoLista";
import { ShowCategories } from "../components/functions/showCategories";
import { useState, useEffect, useContext } from "react";
import { ContextVariables } from "../components/ContextVariables";

export const Productos = () => {
    const {datos,listCategories, actualizarListCategories,reiniciarListCategories}=useContext(ContextVariables);
    useEffect(()=>{
        reiniciarListCategories();
    },[])
    console.log(listCategories)
    return(
        <section className="section-productos">
            <div className="banner-products">
                <img src={bannerMadre} alt="bannerMadre"/>
            </div>
            <div className="categories-products-section">
                <div className="categories-products">
                    {/*<ShowCategories prod={datos}/>*/}
                </div>
                <div className="productos">
                    {listCategories.map((e)=>{
                        return(<MostrarProductoLista key={listCategories.indexOf(e)} producto={e} />)
                    })
                    }
                </div>
            </div>
        </section>
    )
}

