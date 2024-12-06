import "./footer.css";
import { Link } from "react-router-dom";
import {Logo} from "../header/Logo"
import { NavbarMenu } from "../RoutesConfig";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

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
                    <div className="redes">
                        <FaWhatsapp />
                        <p>+54 9 263 1234567</p>
                    </div>
                    <div className="redes">
                        <FaInstagram />
                        <p>@dedebeauty</p>
                    </div>
                    <div className="redes">
                        <FaEnvelope />
                        <p>dedebeauty@gmail.com</p>
                    </div>

                </div>
            </div>
            <div className="footerDown">
                <p>Todos los derechos reservados</p>
                <p>Web creada por Courfedra- Francisco Andres</p>
            </div>
        </footer>
    )
}