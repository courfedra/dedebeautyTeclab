import "./contacto.css"
export const Contacto = () => {
  return (
    <form className="form" action="" method="get" enctype="application/x-www-form-urlencoded">
      <div className="titleForm">
        <h2>Contactanos</h2>
      </div>
      <fieldset className="fieldset">
          <div className="divLabel">
              <label for="nombreApellido">Nombre y Apellido</label>
              <input type="text" name="nombreApellido" placeholder="Nombre y Apellido"/>
          </div>
          <div className="divLabel">
              <label for="email">Correo electrónico</label>
              <input type="email" name="email" placeholder="name@example.com"/>
          </div>
          <div className="divLabel">
              <label for="mensaje">Mensaje</label>
              <textarea placeholder="Tu mensaje" name="mensaje"/>
          </div>
          <div className="divLabel">
              <input className="btn-enviar" type="button" name="enviar" value="Enviar"/>
          </div>
      </fieldset>
    </form>
  )
}