import "./footer.css";
import { Link } from "react-router-dom";
import {Logo} from "../header/Logo"
import { NavbarMenu } from "../RoutesConfig";

export const Footer =()=>{
    return(
        <footer>
            <div className="footerUp">
                <div className="logoFooter">
                    <Logo tamaño="150px"/>
                </div>
                <div className="navbarFooter">
                    <ul className="ulFooter">
                    {NavbarMenu.map((e)=>{
                        return(
                            <Link
                            className="linkFooter"
                            onClick={()=>{scrollTo(top)}}
                            key={NavbarMenu.indexOf(e)}
                            to={e.path}>
                                {e.name}
                            </Link>
                        )
                        })}
                    </ul>
                </div>
                <div className="infoFooter">
                    <ul>
                        <li>Calle Falsa 123</li>
                        <li>Lunes a Sábado</li>
                        <li>9:00hs a 12:30hs / 16:30hs a 21:00hs</li>
                    </ul>
                </div>
                <div className="redesFooter">
                    <i className="fa-brands fa-whatsapp">
                        <p>+54 9 263 1234567</p>
                    </i>
                    <i className="fa-brands fa-instagram">
                        <p>@dedebeauty</p>
                    </i>
                    <i className="fa-solid fa-at">
                        <p>dedebeauty@gmail.com</p>
                    </i>

                </div>
            </div>
            <div className="footerDown">
                <p>Todos los derechos reservados</p>
                <p>Web creada por Courfedra- Francisco Andres</p>
            </div>
        </footer>
    )
}