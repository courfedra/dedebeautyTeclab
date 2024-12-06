import { Link } from "react-router-dom";
import { NavbarMenu } from "../RoutesConfig";
import {Sesion} from "./Sesion";
import "./navbar.css";
import { useContext, useState } from "react";
import { ContextVariables } from "../components/ContextVariables";
import { TbEye } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";

export const Navbar=()=> {
  const {reiniciarListCategories}=useContext(ContextVariables);
  const [menuBurgerState, setMenuBurgerState]=useState(false)
  
  const menuHambChange=()=>{
    setMenuBurgerState(!menuBurgerState)
  }
  return (
    <navbar>
      <ul className={menuBurgerState?'open':'close'}>
        {NavbarMenu.map((e)=>{
          return(
            e.name!=undefined&&
            <Link
              onClick={()=>{reiniciarListCategories()}}
              key={NavbarMenu.indexOf(e)}
              to={e.path}>
                {e.name}
            </Link>
          )
        })}
      <Sesion/>
      </ul>
      <div onClick={()=>{menuHambChange()}} className="burgerButton">
        {menuBurgerState?<TbEye />:<TbEyeClosed />}
      </div>
    </navbar>
  )
}