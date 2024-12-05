import { createContext,useState,useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { db, agregarProductoFirebase, modificarProductosFirebase, borrarProductosFirebase } from "../utils/firebaseConfig";
import { collection, getDocs,query, where} from "firebase/firestore";
import Swal from "sweetalert2"
import {ToastContainer, toast} from "react-toastify"

export const ContextVariables = createContext();

const ContextVariablesProvider = ({children}) =>{
    const [listCategories,setListCategories]=useState([])
    //vuelve a llenar el listCategories con todos los productos del json
    const reiniciarListCategories=(()=>{
        setListCategories(datos)
    })
    //Devuelve todo slos productos que esten dentro de la categoria seleccionara
    const actualizarListCategories=(prod,cat)=>{
        let aux = prod.filter((e)=>e.categorie==cat);
        setListCategories(aux)
    }
    //devuelve los productos que tienen oferta TRUE
    const mostrarOfertas=(prod)=>{
        let aux=prod.filter((e)=>e.hayDescuento==true)
        setListCategories(aux)
    }

//configurado a firebase

    const [datos,setDatos]=useState([])
    const [datosFiltrados,setDatosFiltrados]=useState([])
    const {user, isAuthenticated} = useAuth0()
    //Agregar productos a firestore
    const agregarProducto = (datosNuevos) => {
        agregarProductoFirebase(datosNuevos)
        .then(result=>{
            Swal.fire({
                title:"¡Felicitaciones!",
                text: '¡Has publicado un nuevo producto!',
                icon:'success',
                width:"75%"
            });
        })
        actualizarProductosMostrar()
        filtrarDatosUser()
    }
    //Modificar producto en firestore
    const modificarProducto = (datosNuevos) =>{
        Swal.fire({
            title: '¿Seguro que desea modificar el producto?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#a07f68',
            confirmButtonColor: '#d2c28e',
            cancelButtonText: '¡No!, me arrepenti...',
            confirmButtonText: '¡Si, quiero hacerlo!',
            width:"75%"
        }).then((result) => {
            if (result.isConfirmed) {
                modificarProductosFirebase(datosNuevos)
                actualizarProductosMostrar()
                filtrarDatosUser()
                //notify Success
                notifyDeleteSuccess();
            }
        });
    }
    //Borrar producto en firestore
    const borrarProducto = (idProd) =>{
        Swal.fire({
            title: '¿Seguro que desea eliminar el producto?',
            text: "Lo borraras de manera irreversible",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#a07f68',
            confirmButtonColor: '#d2c28e',
            cancelButtonText: '¡No!, me arrepenti...',
            confirmButtonText: '¡Si, quiero hacerlo!',
            width:"75%"
            }).then((result) => {
                if (result.isConfirmed) {
                    borrarProductosFirebase(idProd)
                    actualizarProductosMostrar()
                    filtrarDatosUser()
                    //notify Success
                    notifyDeleteSuccess();
                }
        });
    }

    const filtrarDatosUser = () => {
        const filterAsync = async() =>{
            const datosUsuario = query(collection(db, "productos"), where("vendedor", "==", user.nickname));
            const querySnapshot = await getDocs(datosUsuario);
            //metodo "docs" convierte array de documentos a array de objetos
            const dataFromFirestone = querySnapshot.docs.map(item=>({
                id:item.id,
                ...item.data()
            }))
            return dataFromFirestone;
        }
        filterAsync()
            .then(result=>setDatosFiltrados(result))
            .catch(err=>console.log(err))
    }

    const actualizarProductosMostrar=()=>{
        const dbAsync= async()=>{
            //para cambiar categorias
            let q=query(collection(db, "productos"))
            const querySnapshot = await getDocs(q);
            //metodo "docs" convierte array de documentos a array de objetos
            const dataFromFirestone = querySnapshot.docs.map(item=>({
                id:item.id,
                ...item.data()
            }))
            return dataFromFirestone;
        }
        dbAsync()
            .then(result=>setDatos(result))
            .catch(err=>console.log(err))
    }

    //componentDidMount
    useEffect(()=>{
        actualizarProductosMostrar()
    },[]);
    //actualizar Datos de usuarios al loguearse
    useEffect(()=>{
        filtrarDatosUser()
    },[isAuthenticated]);

return(
    <ContextVariables.Provider
        value={{
            datos,
            datosFiltrados,
            agregarProducto,
            modificarProducto,
            borrarProducto,
            filtrarDatosUser,
            listCategories,
            actualizarListCategories,
            reiniciarListCategories,
            mostrarOfertas,
        }}>
        {children}
    </ContextVariables.Provider>
)
}

export default ContextVariablesProvider