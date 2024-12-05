import "./CRUD.css"
import { useContext,useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ContextVariables } from "../../ContextVariables";
import { storage } from "../../../utils/firebaseConfig";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
export const ModifyProduct=()=>{
    const {user} = useAuth0()
    const {datos,modificarProducto}=useContext(ContextVariables);
    let prods = datos.filter((e)=>e.vendedor==user.nickname)
    const [idPopUp,setIdPopUp]=useState(1000)
    const [prodPopUp,setProdPopUp]=useState({})
    const [showPopUp,setShowPopUp]=useState('popUpHidden')
    const [datosImg,setDatosImg]=useState({})
    useEffect(() => {
        setProdPopUp(AbrirPopUp(idPopUp))
        PopUpUpdate()
    },[idPopUp]);

    const AbrirPopUp=(id)=>{
        return prods.find((e)=>e.id==id)
    }

    const CargarDatos = async (e) => {
        e.preventDefault()
        if (datosImg.nombreArchivo!=undefined){
            const result = await cargarImg(datosImg.archivo,datosImg.nombreArchivo,datosImg.creadorArchivo)
            prodPopUp.foto = await getDownloadURL(ref(storage,`imagenes-productos/${datosImg.creadorArchivo}/${datosImg.nombreArchivo}`))
        }
            modificarProducto(prodPopUp)
            setProdPopUp(null)
    }
    const cargarImg= async (file,fileName,route)=>{
        const storageRef = ref(storage, `imagenes-productos/${route}/${fileName}`);
        return await uploadBytes(storageRef,file)
    }

    const PopUpUpdate=()=>{
        return(
            prodPopUp
            &&<div className={showPopUp}>
                <button
                    className="btn-close-popup"
                    onClick={()=>{
                        setShowPopUp('popUpHidden')
                        setProdPopUp([])
                    }}>Cerrar</button>
                <form onSubmit={CargarDatos}>
                    <div className="infoPopUp">
                        <div className="popUpMiniBox">
                            <label for="marca">Marca
                                <input type="text" placeholder={prodPopUp.marca} id ="marca" name="marca"
                                    onKeyUp={()=>{
                                        prodPopUp.marca=document.getElementById('marca').value
                                    }}
                                />
                            </label>
                            <label for="nombre">Nombre
                                <input type="text" placeholder={prodPopUp.nombre} id ="nombre" name="nombre"
                                    onKeyUp={()=>{
                                        prodPopUp.nombre=document.getElementById('nombre').value
                                    }}
                                />
                            </label>
                            <label for="precio">Precio
                                <input type="text" placeholder={prodPopUp.precio} id ="precio" name="precio"
                                    onKeyUp={()=>{
                                        prodPopUp.precio=document.getElementById('precio').value
                                    }}
                                />
                            </label>
                            <label for="stock">stock
                                <input type="text" placeholder={prodPopUp.stock} id ="stock" name="stock"
                                    onKeyUp={()=>{
                                        prodPopUp.stock=document.getElementById('stock').value
                                    }}
                                />
                            </label>
                            <label for="status">status
                                <input type="text" placeholder={prodPopUp.status} id ="status" name="status"
                                    onKeyUp={()=>{
                                        prodPopUp.status=document.getElementById('status').value
                                    }}
                                />
                            </label>
                            <label for="nombre">categorie
                                <input type="text" placeholder={prodPopUp.categorie} id ="categorie" name="categorie"
                                    onKeyUp={()=>{
                                        prodPopUp.categorie=document.getElementById('categorie').value
                                    }}
                                />
                            </label>
                        </div>
                        <div className="popUpMiniBox">
                            <label for="descripcion">Descripcion
                                <textarea type="text" placeholder={prodPopUp.descripcion} id ="descripcion" name="descripcion"
                                    onKeyUp={()=>{
                                        prodPopUp.descripcion=document.getElementById('descripcion').value
                                    }}
                                />
                            </label>
                            <label for="foto">Foto
                                <input type="file" id ="foto" name="foto"
                                    onChange={()=>{
                                        setDatosImg({
                                            'archivo':document.getElementById('foto').files[0],
                                            'nombreArchivo':document.getElementById('foto').files[0].name,
                                            'creadorArchivo':user.nickname
                                        })
                                    }}
                                />
                            </label>
                            {
                                prodPopUp.hayDescuento
                                ?<label for="totalDescuento">Total Descuento
                                    <input type="text" placeholder={`${prodPopUp.totalDescuento}%`} id ="descuento" name="totalDescuento"
                                        onChange={()=>{
                                            if (document.getElementById('descuento').value!=''||0){
                                                prodPopUp.totalDescuento=document.getElementById('descuento').value
                                                prodPopUp.hayDescuento=true
                                            }else{
                                                prodPopUp.totalDescuento=0
                                                prodPopUp.hayDescuento=false
                                            }
                                        }}
                                    />
                                 </label>
                                :<label for="hayDescuento">Sin descuento
                                    <input type="text" placeholder={'Agregar descuento'} id ="descuento" name="hayDescuento"
                                        onKeyUp={()=>{
                                            if (document.getElementById('descuento').value!=''||0){
                                                prodPopUp.totalDescuento=document.getElementById('descuento').value
                                                prodPopUp.hayDescuento=true
                                            }else{
                                                prodPopUp.totalDescuento=0
                                                prodPopUp.hayDescuento=false
                                            }
                                        }}
                                    />
                                </label>
                            }
                        </div>
                    </div>
                <button
                    className="btn-save-info"
                    onClick={()=>{
                        setShowPopUp('popUpHidden');
                    }}>Modificar
                </button>
                </form>
            </div>
        )
    }

    return(
        <>
            <div className="update-product">
                <div className="product-line">
                    <div className="product-info">
                        <div className="minibox-date">
                            <p>Marca</p>
                        </div>
                        <div className="minibox-date">
                            <p>Nombre</p>
                        </div>
                        <div className="minibox-date">
                            <p>Precio</p>
                        </div>
                    </div>
                    <div className="btn-update">Acción</div>
                </div>
                {prods.map((e)=>{
                    return(
                        <div key={prods.indexOf(e)} className="product-line">
                            <div className="product-info">
                                <div className="minibox-date">
                                    <p>{e.marca}</p>
                                </div>
                                <div className="minibox-date">
                                    <p>{e.nombre}</p>
                                </div>
                                <div className="minibox-date">
                                    <p>${e.precio}</p>
                                </div>
                            </div>
                            <button
                                className="btn-update"
                                onClick={()=>{
                                    setIdPopUp(e.id);
                                    setShowPopUp('popUpAbsolute');
                                    }}>
                                Modificar
                                <span>
                                    🢂
                                </span>
                            </button>
                        </div>
                    )
                })}
                <div className="popUpBox">
                    {PopUpUpdate()}
                </div>
            </div>
        </>
    )
}