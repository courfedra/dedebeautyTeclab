import { Link } from "react-router-dom";
import { NavbarMenu } from "../RoutesConfig";
import "./navbar.css";
import { useContext } from "react";
import { ContextVariables } from "../components/ContextVariables";

export const Navbar=()=> {
  const {reiniciarListCategories}=useContext(ContextVariables);
  return (
    <navbar>
      <ul>
        {NavbarMenu.map((e)=>{
          return(
            <Link
              onClick={()=>{reiniciarListCategories()}}
              key={NavbarMenu.indexOf(e)}
              to={e.path}>
                {e.name}
            </Link>
          )
        })}
      </ul>
    </navbar>
  )
}