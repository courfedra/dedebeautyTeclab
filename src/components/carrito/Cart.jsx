import { useAuth0 } from "@auth0/auth0-react";
import {useContext} from "react"
import { CartContext } from "../CartContext"
import {ProdCart} from "./ProdCart"
import {Link} from "react-router-dom"
import { increment,updateDoc,doc,setDoc,collection, serverTimestamp } from "firebase/firestore";
import {db} from "../../utils/firebaseConfig"
import Swal from "sweetalert2"
import {porcentaje} from "../functions/Functions"

export const Cart = () => {
    const {user} = useAuth0()
    const {cartList}=useContext(CartContext);
    const {deleteThis}=useContext(CartContext);
    const {clearCart}=useContext(CartContext);
    const {precioFinal}=useContext(CartContext);
    const {firstTotalPrice}=useContext(CartContext);

    const ctx = useContext(CartContext)

    const createOrder = () =>{
        const order ={
            comprador:{
                nombre:user.nickname,
                email:user.email,
            },
            date: serverTimestamp().toString(),
            items: ctx.cartList.map(item=>({
                id:item.id,
                title:item.nombre,
                price:porcentaje(item.precio,item.totalDescuento),
                qty:item.cantidad//va la cantidad comprada
            })),
            total: ctx.precioFinal
        }
        const createOrderInFirestore= async ()=>{
            const newOrderRef = doc(collection(db, "orders"))
            await setDoc(newOrderRef,order);
            return newOrderRef
        }
        createOrderInFirestore()
            .then(result=>{
                Swal.fire({
                    title:"¡Felicitaciones!",
                    text: 'Has realizado la compra exitosamente',
                    html:'Se ha generado su ticket de compra: '+result.id+'. Seras redireccionado en 5 SEGUNDOS...',
                    icon:'success',
                    width:"75%"
                });
                //actualizar stock deproductos comrpados
                ctx.cartList.forEach(async(item)=>{
                    const itemRef = doc(db,"productos",item.id)
                    await updateDoc(itemRef, {
                        stock: increment(-item.cantidad)
                      });
                    })
                //vacio el carrito y actualizo el preciofinal a 0
                ctx.clearCart(true)
            })
            .catch(err=>console.log(err))
            setTimeout(() => {
                location.reload(window.location.origin)
            }, 5000);
    }
    return(
        <div className="cart">
            <ul className="cartCard">
                {
                    cartList.length === 0
                    ? <>
                        <p>Tu carrito esta vacio</p>
                        <Link to={"/"}><button className="btnVolver">Volver al inicio</button></Link>
                      </>
                    : cartList.map((item)=>{
                        return(
                            <ProdCart
                                key={item.id}
                                img={item.foto}
                                nombre={item.nombre}
                                stock={item.stock}
                                cantidad={item.cantidad}
                                precio={porcentaje(item.precio,item.totalDescuento)}
                                id={item.id}
                                firstTotalPrice={firstTotalPrice}
                                deleteThis={deleteThis}
                            />
                        )}
                    )
                }
            </ul>
            {
                cartList.length>0&&
                <>
                    <div className="totalPrice">Monto total: <span>${precioFinal}</span></div>
                    <div className="btnCard">
                        <button className="btnClearCart" onClick={()=>{clearCart(false)}}>Borrar Carrito</button>
                        <button className="btnBuyCart" onClick={createOrder}>Comprar Carrito</button>
                    </div>
                </>
            }
        </div>
    )
}