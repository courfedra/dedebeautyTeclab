import logoDede from "../assets/DedeBeautyLogo24.png"
import { Link } from "react-router-dom"
export const Logo = ({tamaño}) => {
    return(
        <div>
            <Link to="/">
                <img className="logoHeader" src={logoDede} alt="Logo DeDe" style={{width:tamaño}}/>
            </Link>
        </div>
    )
}