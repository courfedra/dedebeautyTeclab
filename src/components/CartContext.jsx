import { createContext,useState } from "react"
import Swal from "sweetalert2"
import {ToastContainer, toast} from "react-toastify"
import {porcentaje} from "./functions/Functions"

export const CartContext = createContext();

const CartContextProvider = ({children}) =>{
    //array del carrito
    const [cartList,setCartList]=useState([])
    const [precioFinal,setPrecioFinal]=useState(0)

    //notify Toastify
    const notifyDeleteSuccess = () => toast("Borrado exitosamente");

    //funcion global, ver en el entregable
    const addToCart=(item,cantidad)=>{
        const itemRepetido=cartList.find(prod=>prod.id===item.id)
        const repetido=cartList.some(prod=>prod.id===item.id)

        if (repetido){
            itemRepetido.cantidad+=cantidad
            setCartList([...cartList])
        }else{
            setCartList([
                ...cartList,
                {
                    id:item.id,
                    nombre:item.nombre,
                    marca:item.marca,
                    hayDescuento:item.hayDescuento,
                    totalDescuento:item.totalDescuento,
                    descripcion :item.descripcion,
                    foto:item.foto,
                    precio:item.precio,
                    cantidad:cantidad,
                    stock:item.stock,
                    stockCart:item.stock
                }
            ])
        }
    }

    //borra el item seleccionado y resta el subtotal obtenido al precio final en pantalla
    const deleteThis=(id,cantidad)=>{
        Swal.fire({
            title: '¿Seguro que desea eliminar este producto?',
            text: "Modificaras tu carrito de manera irreversible",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#a07f68',
            confirmButtonColor: '#d2c28e',
            cancelButtonText: '¡No!, me arrepenti...',
            confirmButtonText: '¡Si, quiero hacerlo!',
            width:"75%"
        }).then((result) => {
            if (result.isConfirmed) {
                //notify Success
                notifyDeleteSuccess();
                const itemFind=cartList.find(item=>item.id==id)
                const newCartList=cartList.filter(item=>item.id!==id)
                //setPrecioFinal(precioFinal-(itemFind.precio*(itemFind.cantidad-1)))
                setCartList(newCartList)
                showTotalAmount(porcentaje(itemFind.precio,itemFind.totalDescuento)*(cantidad),false)
            }
            <ToastContainer/>
        });
    }

    //actualizo la cantidad de items agregados dentro del carrito
    const actualizarCantidadCarrito=(id, cant,sumRes)=>{
        const itemFind=cartList.find(item=>item.id==id)
        itemFind.cantidad=cant

        sumRes==true
        ?itemFind.stockCart-=1
        :itemFind.stockCart+=1

        setCartList([...cartList])

    }


    //limpia el carrito y setea el precio final a 0
    const clearCart=(compra)=>{
        if (compra){
            setCartList([]);
            setPrecioFinal(0)
        }else{
            Swal.fire({
                title: '¿Seguro que desea eliminar todo el carrito?',
                text: "Modificaras tu carrito de manera irreversible",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#a07f68',
                confirmButtonColor: '#d2c28e',
                cancelButtonText: '¡No!, me arrepenti...',
                confirmButtonText: '¡Si, quiero hacerlo!',
                width:"75%"
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCartList([]);
                        setPrecioFinal(0);
                        //notify Success
                        notifyDeleteSuccess();
                    }
            });
        };
    }

    //toma el cartList, lo lee, realiza las sumas de los subtotales y lo muestra por primera vez
    const firstTotalPrice=()=>{
        let subTotalArray=cartList.map(item=>porcentaje(item.precio,item.totalDescuento)*item.cantidad)
        let subTotalNumbers=0
        subTotalArray.forEach(item=>subTotalNumbers=item+subTotalNumbers)
        setPrecioFinal(subTotalNumbers)
        //cantida a aumentar en el contador de precio total
    }

    //toma el precio y el valor de si es suma o resta y edita el precio final
    const showTotalAmount=(precio,sumRes)=>{
        let precioInt = parseInt(precio)
        sumRes
        ?setPrecioFinal(precioFinal+precioInt)
        :setPrecioFinal(precioFinal-precioInt);
        }

    return(
        <CartContext.Provider  value={{
                                        cartList,
                                        addToCart,
                                        deleteThis,
                                        clearCart,
                                        firstTotalPrice,
                                        precioFinal,
                                        showTotalAmount,
                                        actualizarCantidadCarrito,
                                        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider