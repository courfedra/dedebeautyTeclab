import "./CRUD.css"
import { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CategoriesList } from "../../functions/Functions";
import { ContextVariables } from "../../ContextVariables";
import { storage } from "../../../utils/firebaseConfig";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { GiConsoleController } from "react-icons/gi";
export const CreateProduct=()=>{
    const {listCategories,agregarProducto}=useContext(ContextVariables);
    const categorias=CategoriesList(listCategories);
    const {user} = useAuth0()
    const [datosImg,setDatosImg]=useState(null)
    const [esNuevaCategoria,setEsNuevaCategoria]=useState(false)

    const preventDefaultSubmit=(event)=>{
        event.preventDefault();
        cargarProducto()
    }

    const cargarProducto=async ()=>{
        let fotoUrl= await imgUrl()
        let datos = {
            "marca":document.getElementById('marca').value,
            "nombre":document.getElementById('nombre').value,
            "descripcion":document.getElementById('descripcion').value,
            "foto":fotoUrl,
            "precio":document.getElementById('precio').value,
            "hayDescuento":document.getElementById('descuento').value!=''?true:false,
            "totalDescuento":document.getElementById('descuento').value!=''&&parseFloat(document.getElementById('descuento').value),
            "stock":document.getElementById('stock').value,
            "status":document.getElementById('nuevoUsado').value,
            "categorie":!esNuevaCategoria?document.getElementById('categoria').value:document.getElementById('nuevaCategoria').value,
            "vendedor":user.nickname,
        }
        await agregarProducto(datos)
    }

    const imgUrl = async ()=>{
        let urlImg=''
        if (datosImg.nombreArchivo!=undefined){
            const result = await cargarImg(datosImg.archivo,datosImg.nombreArchivo,datosImg.creadorArchivo)
            return urlImg = await getDownloadURL(ref(storage,`imagenes-productos/${datosImg.creadorArchivo}/${datosImg.nombreArchivo}`))
        }
    }

    const cargarImg = async (file,fileName,route) =>{
        const storageRef = ref(storage, `imagenes-productos/${route}/${fileName}`);
        return await uploadBytes(storageRef,file)
    }

    const esCategoria=()=>{
        let esCategoria=document.getElementById('categoria').value
        esCategoria=="Nueva Categoria"?setEsNuevaCategoria(true):setEsNuevaCategoria(false)
    }
    const mostrarOpcionesCategoria=()=>{
        return(
            <>
            <select id="categoria" name="categoria">
                {categorias.map((e)=>{
                    return(
                        <option key={categorias.indexOf(e)} value={e}>{e}</option>
                    )
                })}
                <option>
                    Nueva Categoria
                </option>
            </select>
            {esNuevaCategoria&&
                <label for="nuevaCategoria">
                    <input type="text" id ="nuevaCategoria" placeholder="Nueva Categoria" name="nuevaCategoria"/>
                </label>}
            </>
            )
    }
    useEffect(()=>{
        mostrarOpcionesCategoria
    },[esNuevaCategoria])

    return(
        <>
        <form onSubmit={preventDefaultSubmit}>
            <div className="add-product">
                <div className="block-inputs">
                    <label for="nombre">Agregar nombre
                        <input type="text" id ="nombre" name="nombre"/>
                    </label>
                    <label for="marca">Agregar marca
                        <input type="text" id="marca" name="marca"/>
                    </label>
                    <label for="descripcion">Agregar descripción
                        <textarea type="text" id="descripcion" name="descripcion"/>
                    </label>
                </div>
                <div className="block-inputs">
                    <label for="precio">Agregar precio
                        <input type="number" id="precio" name="precio"/>
                    </label>
                    <label for="descuento">Agregar descuento
                        <input type="number" id="descuento" name="descuento"/>
                    </label>
                    <label for="stock">Agregar stock
                        <input type="number" id="stock" name="stock"/>
                    </label>
                </div>
                <div className="block-inputs">
                    <label for="nuevoUsado">¿Es usado o es nuevo?
                        <select id="nuevoUsado" name="nuevoUsado">
                            <option value="nuevo" selected>Nuevo</option>
                            <option value="usado">Usado</option>
                        </select>
                    </label>
                    <label for="categoria" onClick={()=>{esCategoria()}}>Seleccione una categoria
                        {mostrarOpcionesCategoria()}
                    </label>
                    <label for="foto">Subir foto
                        <input type="file" id="foto" name="foto"
                            onChange={()=>{
                                setDatosImg({
                                    'archivo':document.getElementById('foto').files[0],
                                    'nombreArchivo':document.getElementById('foto').files[0].name,
                                    'creadorArchivo':user.nickname
                                })
                            }}
                        />
                    </label>
                </div>
                <button className="btn-enviar">
                    <input value="Agregar" type="submit" onClick={()=>{alert("Agregado")}}/>
                </button>
            </div>
        </form>
        </>
    )
}
