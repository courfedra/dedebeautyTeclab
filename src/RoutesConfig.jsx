import {Inicio} from "./pages/Inicio";
import {Contacto} from "./pages/Contacto";
import {Nosotros} from "./pages/Nosotros";
import {Productos} from "./pages/Productos";
import { MostrarCategoriasProducto } from "./components/productos/MostrarCategoriasProductos";
import { Dashboard } from "./components/sesion/Dashboard";
import {Cart} from "./components/carrito/Cart";
import {MostrarProductoDetalle} from "./components/productos/MostrarProductoDetalle";
export const NavbarMenu = [
    {
        path: "/",
        element: <Inicio />,
        name:"Inicio",
    },
    {
        path: "/contacto",
        element: <Contacto />,
        name: "Contacto",
    },
    {
        path: "/nosotros",
        element: <Nosotros />,
        name: "Nosotros",
    },
    {
        path: "/productos",
        element: <Productos />,
        name: "Productos",
    },
    {
        path:"/producto/:IdProducto",
        element:<MostrarProductoDetalle />
    },
    {
        path:"/categoria/:IdCategoria",
        element:<MostrarCategoriasProducto />
    },
    {
        path:"/perfil/:IdPerfil",
        element:<Dashboard />
    },
    {
        path:"/cart",
        element:<Cart />
    },
]
