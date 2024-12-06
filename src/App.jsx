import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavbarMenu } from "./RoutesConfig"
import {Header} from "./header/Header"
import {Footer} from "./footer/Footer"
import ContextVariablesProvider from "./components/ContextVariables"
import CartContextProvider from "./components/CartContext"
import "./app.css"

function App() {
  return(
    <BrowserRouter basename="/">
      <CartContextProvider>
        <ContextVariablesProvider>
          <Header />
          <Routes>
            {NavbarMenu.map((e)=>{
              return(
                <Route key={NavbarMenu.indexOf(e.path)} path={e.path} element={e.element} />
              )
            })}
          </Routes>
          <Footer/>
        </ContextVariablesProvider>
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App


