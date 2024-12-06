import "./header.css";

import { Logo } from "./Logo";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <header className="header">
      <Logo tamaño="100px"/>
      <Navbar/>
    </header>
  )
}