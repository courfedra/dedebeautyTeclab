import "./mediosPagos.css"
import MPimage from "../../assets/MPBanner1.webp"
import {logos} from "../../assets/logoBancos/exportLogos"
export const MediosPagos =()=>{
    return(
        <div className="containerMediosPagos">
            <div className="bannerMPdescuento">
                <img src={MPimage}/>
            </div>
            <div className="mediosPagos">
                <h3>Medios de pagos</h3>
                <div className="containerLogos">
                    {logos.map((e)=>{
                        return(
                            <div className="boxLogos">
                                <img src={e.logo}/>
                                <p>{e.texto}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}