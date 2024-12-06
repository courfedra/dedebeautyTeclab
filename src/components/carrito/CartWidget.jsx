import {BsCart3} from 'react-icons/bs';
import {Link} from "react-router-dom"
import {CartContext} from "../CartContext"
import {useContext} from "react"

export const CartWidget = () => {
    const {cartList}=useContext(CartContext);

    return(

            cartList.length===0
            ?<>
                <Link to="/Cart" ><BsCart3 style={{fontSize:'1.2em'}}/></Link>
             </>
            :<>
                <Link to="/Cart" className='linkCarrito' >
                    <BsCart3 style={{fontSize:'1.2em'}}/>
                    <p>{cartList.length}</p>
                </Link>
            </>

    )
}