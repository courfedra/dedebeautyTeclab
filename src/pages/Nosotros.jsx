import "./nosotros.css"
export const Nosotros = () => {
    return(
        <div className="nosotrosContainer">
            <div className="nosotrosTitulo">
                <h2>Nosotros</h2>
            </div>
            <article className="boxNosotros">
                <h3>¿Qué hacemos?</h3>
                <p>
                    <span>Desde nuestros inicios en el año 2.019 nos hemos en la problematica de ventas de productos de cosméticos en nuestro pueblo, donde la comunicación se da en la vereda desde el inicio.</span>
                    <span>Debido la expansion tecnológica, nos vimos en la obligación de adaptarnos, y aprovecharla para expandir nuestros negocios locales, entre ellos "DEDEBEAUTY"</span>
                    <span>Por lo tanto, nos dedicamos a la venta presencial y online de productos cosméticos</span>
                </p>
            </article>
            <article className="boxNosotros">
                <h3>¿Qué tal los precios?</h3>
                <p>
                    <span>Nuestros contactos nos aportan los mejores precios de la zona, y siempre estamos al tanto de que asi sea.</span>
                    <span>Debido a la distancia que tenemos a la ciudad más cercana, cualquier tipo de trámite nos vemos en la obligación de viajar, y de paso, realizar todo tipo de compras alli, por eso es que nuestra mayor competencia no es local, sino externa</span>
                    <span>Por ende, nuestros precios se mantienen igual, (a veces hasta mejor) que los que encontramos en la ciudad</span>
                </p>
            </article>
            <article className="boxNosotros">
                <h3>¿Cómo conseguir nuestros productos?</h3>
                <div>
                    <p>
                        <span>¡Super fácil!, puedes contactarnos en nuestra sección de contacto o directamente a nuestro correo electrónico o por comunicación telefónica directa o whatsapp.</span>
                        <span>También puedes acercarte a nuestro local en la zona.</span>
                        <span>¡Ahora puedes comprar por nuestra página web!</span>
                    </p>
                </div>
            </article>
            <article className="boxNosotros">
                <h3>¿Dónde estamos?</h3>
                <p>
                    <span>Nos situamos en Argentina, en la provincia de Mendoza.</span>
                    <span>Nuestro local se encuentra en el departamento de La Paz.</span>
                    <span>En tanto a nosotros puedes encontrarnos en el mismo departamento de La Paz</span>
                </p>
            </article>
        </div>
    )
}