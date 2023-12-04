import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./PrivacyPolicies.scss";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const PrivacyPolicies = () => {
  const policy1 = `<h2>Interpretación y Definiciones</h2>
  <h3>Interpretación</h3>
  <p>Las palabras cuya letra inicial está en mayúscula tienen significados definidos bajo las siguientes condiciones. Las siguientes definiciones tendrán el mismo significado independientemente de que aparezcan en singular o en plural.</p>
  <h3>Definiciones</h3>
  <p>A los efectos de esta Política de Privacidad:</p>
  <ul>
  <li>
  <p><strong>Cuenta</strong> significa una cuenta única creada para que Usted pueda acceder a nuestro Servicio o partes de nuestro Servicio.</p>
  </li>
  <li>
  <p><strong>Afiliada</strong> significa una entidad que controla, está controlada por o está bajo control común con una parte, donde &quot;control&quot; significa propiedad del 50% o más de las acciones, participación accionaria u otros valores con derecho a votar para la elección de directores u otra autoridad administrativa.</p>
  </li>
  <li>
  <p><strong>Compañía</strong> (denominada "la Compañía", "Nosotros", "Nosotros" o "Nuestro" en este Acuerdo) se refiere al front-end.</p>
  </li>
  <li>
  <p><strong>Las cookies</strong> son pequeños archivos que un sitio web coloca en su computadora, dispositivo móvil o cualquier otro dispositivo y que contienen los detalles de su historial de navegación en ese sitio web, entre sus muchos usos.</p>
  </li>
  <li>
  <p><strong>País</strong> se refiere a: Colombia</p>
  </li>
  <li>
  <p><strong>Dispositivo</strong> significa cualquier dispositivo que pueda acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.</p>
  </li>
  <li>
  <p><strong>Datos personales</strong> es cualquier información que se relacione con un individuo identificado o identificable.</p>
  </li>
  <li>
  <p><strong>Servicio</strong> se refiere al Sitio Web.</p>
  </li>
  <li>
  <p><strong>Proveedor de Servicios</strong> significa cualquier persona física o jurídica que procesa los datos en nombre de la Compañía. Se refiere a empresas de terceros o personas empleadas por la Compañía para facilitar el Servicio, proporcionar el Servicio en nombre de la Compañía, realizar servicios relacionados con el Servicio o ayudar a la Compañía a analizar cómo se utiliza el Servicio.</ p>
  </li>
  <li>
  <p><strong>Datos de uso</strong> se refiere a datos recopilados automáticamente, ya sea generados por el uso del Servicio o por la propia infraestructura del Servicio (por ejemplo, la duración de una visita a una página).</p>
  </li>
  <li>
  <p><strong>Sitio web</strong> se refiere a la interfaz, accesible desde <a href="http://localhost:3000/" rel="external nofollow noopener" target="_blank">http://localhost :3000/</a></p>
  </li>
  <li>
  <p><strong>Usted</strong> significa la persona que accede o utiliza el Servicio, o la empresa u otra entidad legal en nombre de la cual dicha persona accede o utiliza el Servicio, según corresponda.</p>
  </li>
  </ul>`;
  const policy2 = `<h2>Recopilación y uso de sus datos personales</h2>
  <h3>Tipos de datos recopilados</h3>
  <h4>Datos Personales</h4>
  <p>Mientras utilizamos nuestro servicio, podemos pedirle que nos proporcione cierta información de identificación personal que pueda usarse para contactarlo o identificarlo. La información de identificación personal puede incluir, entre otros:</p>
  <ul>
  <li>
  <p>Dirección de correo electrónico</p>
  </li>
  <li>
  <p>Nombre y apellido</p>
  </li>
  <li>
  <p>Dirección, Estado, Provincia, Código Postal, Ciudad</p>
  </li>
  <li>
  <p>Datos de uso</p>
  </li>
  </ul>
  <h4>Datos de uso</h4>
  <p>Los datos de uso se recopilan automáticamente cuando se utiliza el Servicio.</p>
  <p>Los datos de uso pueden incluir información como la dirección de protocolo de Internet de su dispositivo (por ejemplo, dirección IP), el tipo de navegador, la versión del navegador, las páginas de nuestro Servicio que visita, la hora y fecha de su visita, el tiempo que pasa en esas páginas. , identificadores únicos de dispositivos y otros datos de diagnóstico.</p>
  <p>Cuando accede al Servicio mediante o a través de un dispositivo móvil, podemos recopilar cierta información automáticamente, que incluye, entre otros, el tipo de dispositivo móvil que utiliza, la ID única de su dispositivo móvil y la dirección IP de su dispositivo móvil. , Su sistema operativo móvil, el tipo de navegador de Internet móvil que utiliza, identificadores únicos de dispositivo y otros datos de diagnóstico.</p>
  <p>También podemos recopilar información que su navegador envía cada vez que visita nuestro Servicio o cuando accede al Servicio mediante un dispositivo móvil.</p>
  <h4>Tecnologías de seguimiento y cookies</h4>
  <p>Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en Nuestro Servicio y almacenar cierta información. Las tecnologías de seguimiento utilizadas son balizas, etiquetas y scripts para recopilar y rastrear información y mejorar y analizar Nuestro Servicio. Las tecnologías que utilizamos pueden incluir:</p>
  <ul>
  <li><strong>Cookies o cookies del navegador.</strong> Una cookie es un pequeño archivo que se coloca en su dispositivo. Puede indicarle a su navegador que rechace todas las cookies o que indique cuándo se envía una cookie. Sin embargo, si no acepta las cookies, es posible que no pueda utilizar algunas partes de nuestro Servicio. A menos que haya ajustado la configuración de su navegador para que rechace cookies, nuestro Servicio puede utilizar cookies.</li>
  <li><strong>Balizas web.</strong> Ciertas secciones de nuestro Servicio y nuestros correos electrónicos pueden contener pequeños archivos electrónicos conocidos como balizas web (también conocidos como gifs transparentes, etiquetas de píxeles y gifs de un solo píxel) que permiten la Company, por ejemplo, para contar los usuarios que visitaron esas páginas o abrieron un correo electrónico y para otras estadísticas relacionadas con el sitio web (por ejemplo, registrar la popularidad de una determinada sección y verificar la integridad del sistema y del servidor).</li>
  </ul>
  <p>Las cookies pueden ser &quot;persistentes&quot; o &quot;Sesión&quot; Galletas. Las cookies persistentes permanecen en su computadora personal o dispositivo móvil cuando se desconecta, mientras que las cookies de sesión se eliminan tan pronto como cierra su navegador web. Obtenga más información sobre las cookies en el artículo del <a href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking" target="_blank">Políticas de Privacidad</a>.</p >
  <p>Utilizamos cookies de sesión y persistentes para los fines que se detallan a continuación:</p>
  <ul>
  <li>
  <p><strong>Cookies necesarias/esenciales</strong></p>
  <p>Tipo: Cookies de sesión</p>
  <p>Administrado por: Nosotros</p>
  <p>Propósito: Estas cookies son esenciales para brindarle los servicios disponibles a través del sitio web y permitirle utilizar algunas de sus funciones. Ayudan a autenticar a los usuarios y evitar el uso fraudulento de cuentas de usuario. Sin estas Cookies, los servicios que Usted ha solicitado no se pueden proporcionar y solo utilizamos estas Cookies para brindarle esos servicios.</p>
  </li>
  <li>
  <p><strong>Política de Cookies / Aviso de Aceptación de Cookies</strong></p>
  <p>Tipo: Cookies persistentes</p>
  <p>Administrado por: Nosotros</p>
  <p>Finalidad: Estas Cookies identifican si los usuarios han aceptado el uso de cookies en el Sitio Web.</p>
  </li>
  <li>
  <p><strong>Cookies de funcionalidad</strong></p>
  <p>Tipo: Cookies persistentes</p>
  <p>Administrado por: Nosotros</p>
  <p>Propósito: Estas cookies nos permiten recordar las elecciones que realiza cuando utiliza el sitio web, como recordar sus datos de inicio de sesión o su preferencia de idioma. El propósito de estas Cookies es brindarle una experiencia más personal y evitar que tenga que volver a ingresar sus preferencias cada vez que utilice el sitio web.</p>
  </li>
  </ul>
  <p>Para obtener más información sobre las cookies que utilizamos y sus opciones con respecto a las cookies, visite nuestra Política de Cookies o la sección de Cookies de nuestra Política de Privacidad.</p>
  <h3>Uso de sus datos personales</h3>
  <p>La Empresa podrá utilizar Datos Personales para los siguientes fines:</p>
  <ul>
  <li>
  <p><strong>Para proporcionar y mantener nuestro Servicio</strong>, incluido monitorear el uso de nuestro Servicio.</p>
  </li>
  <li>
  <p><strong>Para administrar su cuenta:</strong> para administrar su registro como usuario del Servicio. Los Datos Personales que usted proporciona pueden darle acceso a diferentes funcionalidades del Servicio que están disponibles para Usted como usuario registrado.</p>
  </li>
  <li>
  <p><strong>Para la ejecución de un contrato:</strong> el desarrollo, cumplimiento y ejecución del contrato de compra de los productos, artículos o servicios que Usted haya adquirido o de cualquier otro contrato con Nosotros a través del Servicio.</strong> p>
</li>
<li>
<p><strong>Para contactarlo:</strong> Para contactarlo por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica, como notificaciones push de una aplicación móvil sobre actualizaciones o comunicaciones informativas relacionadas con las funcionalidades, productos o servicios contratados, incluidas las actualizaciones de seguridad, cuando sean necesarios o razonables para su implementación.</p>
</li>
<li>
<p><strong>Para brindarle</strong> noticias, ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos que son similares a los que ya compró o sobre los que ya realizó consultas, a menos que haya optado por no hacerlo. recibir dicha información.</p>
</li>
<li>
<p><strong>Para gestionar Sus solicitudes:</strong> Para atender y gestionar Sus solicitudes hacia Nosotros.</p>
</li>
<li>
<p><strong>Para transferencias comerciales:</strong> podemos utilizar su información para evaluar o llevar a cabo una fusión, desinversión, reestructuración, reorganización, disolución u otra venta o transferencia de algunos o todos nuestros activos, ya sea como una empresa en funcionamiento o como parte de una quiebra, liquidación o procedimiento similar, en el que los datos personales que poseemos sobre los usuarios de nuestros servicios se encuentran entre los activos transferidos.</p>
</li>
<li>
<p><strong>Para otros fines</strong>: podemos utilizar su información para otros fines, como análisis de datos, identificación de tendencias de uso, determinación de la efectividad de nuestras campañas promocionales y para evaluar y mejorar nuestro Servicio, productos y servicios. , marketing y tu experiencia.</p>
</li>
</ul>
<p>Podemos compartir su información personal en las siguientes situaciones:</p>
<ul>
<li><strong>Con proveedores de servicios:</strong> podemos compartir su información personal con proveedores de servicios para monitorear y analizar el uso de nuestro servicio y comunicarnos con usted.</li>
<li><strong>Para transferencias comerciales:</strong> Podemos compartir o transferir su información personal en relación con, o durante las negociaciones de, cualquier fusión, venta de activos de la Compañía, financiamiento o adquisición de todo o una parte de Nuestra negocio a otra empresa.</li>
<li><strong>Con afiliados:</strong> Podemos compartir su información con nuestros afiliados, en cuyo caso les exigiremos que respeten esta Política de privacidad. Las afiliadas incluyen nuestra empresa matriz y cualquier otra subsidiaria, socios de empresas conjuntas u otras empresas que controlamos o que están bajo control común con nosotros.</li>
<li><strong>Con socios comerciales:</strong> podemos compartir su información con nuestros socios comerciales para ofrecerle ciertos productos, servicios o promociones.</li>
<li><strong>Con otros usuarios:</strong> cuando comparte información personal o interactúa de otro modo en las áreas públicas con otros usuarios, dicha información puede ser vista por todos los usuarios y puede distribuirse públicamente en el exterior.</li>
<li><strong>Con su consentimiento</strong>: podemos divulgar su información personal para cualquier otro fin con su consentimiento.</li>
</ul>
<h3>Retención de sus datos personales</h3>
<p>La Compañía conservará sus datos personales solo durante el tiempo que sea necesario para los fines establecidos en esta Política de privacidad. Conservaremos y utilizaremos sus datos personales en la medida necesaria para cumplir con nuestras obligaciones legales (por ejemplo, si debemos conservar sus datos para cumplir con las leyes aplicables), resolver disputas y hacer cumplir nuestros acuerdos y políticas legales.</ p>
<p>La Compañía también conservará los Datos de uso para fines de análisis interno. Los datos de uso generalmente se conservan durante un período de tiempo más corto, excepto cuando estos datos se utilizan para fortalecer la seguridad o mejorar la funcionalidad de nuestro servicio, o cuando estamos legalmente obligados a conservar estos datos durante períodos de tiempo más largos.</p>
<h3>Transferencia de sus datos personales</h3>
<p>Su información, incluidos los Datos Personales, es procesada en las oficinas operativas de la Compañía y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Significa que esta información puede transferirse y mantenerse en computadoras ubicadas fuera de Su estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de Su jurisdicción.</p>
<p>Su consentimiento a esta Política de Privacidad seguido del envío de dicha información representa su aceptación de esa transferencia.</p>
<p>La Compañía tomará todas las medidas razonablemente necesarias para garantizar que Sus datos sean tratados de forma segura y de acuerdo con esta Política de Privacidad y no se realizará ninguna transferencia de Sus Datos Personales a una organización o país a menos que existan controles adecuados establecidos, incluidos la seguridad de sus datos y otra información personal.</p>
<h3>Eliminar sus datos personales</h3>
<p>Tiene derecho a eliminar o solicitar que le ayudemos a eliminar los datos personales que hemos recopilado sobre usted.</p>
<p>Nuestro Servicio puede brindarle la posibilidad de eliminar cierta información sobre Usted desde el Servicio.</p>
<p>Puede actualizar, modificar o eliminar Su información en cualquier momento iniciando sesión en Su Cuenta, si tiene una, y visitando la sección de configuración de la cuenta que le permite administrar Su información personal. También puede comunicarse con nosotros para solicitar acceso, corregir o eliminar cualquier información personal que nos haya proporcionado.</p>
<p>Sin embargo, tenga en cuenta que es posible que necesitemos conservar cierta información cuando tengamos una obligación legal o una base legal para hacerlo.</p>
<h3>Divulgación de sus datos personales</h3>
<h4>Transacciones comerciales</h4>
<p>Si la Compañía participa en una fusión, adquisición o venta de activos, sus datos personales pueden ser transferidos. Le avisaremos antes de que sus datos personales se transfieran y queden sujetos a una política de privacidad diferente.</p>
<h4>Aplicación de la ley</h4>
<p>En determinadas circunstancias, es posible que se le solicite a la Compañía que revele sus datos personales si así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).</p>
<h4>Otros requisitos legales</h4>
<p>La Compañía puede divulgar sus datos personales de buena fe cuando considere que dicha acción es necesaria para:</p>
<ul>
<li>Cumplir con una obligación legal</li>
<li>Proteger y defender los derechos o bienes de la Empresa</li>
<li>Prevenir o investigar posibles irregularidades en relación con el Servicio</li>
<li>Proteger la seguridad personal de los Usuarios del Servicio o del público</li>
<li>Protección contra responsabilidad legal</li>
</ul>
<h3>Seguridad de sus datos personales</h3>
<p>La seguridad de sus datos personales es importante para nosotros, pero recuerde que ningún método de transmisión a través de Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger sus datos personales, no podemos garantizar su seguridad absoluta.</p>`;
  const policy3 = `<h2>Enlaces a otros sitios web</h2>
  <p>Nuestro Servicio puede contener enlaces a otros sitios web que no son operados por Nosotros. Si hace clic en un enlace de un tercero, será dirigido al sitio de ese tercero. Le recomendamos encarecidamente que revise la Política de privacidad de cada sitio que visite.</p>
  <p>No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios o servicios de terceros.</p>`;
  const policy4 = `<h2>Cambios en esta Política de Privacidad</h2>
  <p>Podemos actualizar nuestra Política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.</p>
  <p>Le informaremos por correo electrónico y/o un aviso destacado en Nuestro Servicio, antes de que el cambio entre en vigencia y actualizaremos la sección &quot;Última actualización&quot; fecha en la parte superior de esta Política de Privacidad.</p>
  <p>Se recomienda revisar esta Política de Privacidad periódicamente para detectar cualquier cambio. Los cambios a esta Política de Privacidad entran en vigencia cuando se publican en esta página.</p>
  <h2>Contáctenos</h2>
  <p>Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos:</p>
  <ul>
  <li>
  <p>Por correo electrónico: front@gmail.com</p>
  </li>
  <li>
  <p>Visitando esta página en nuestro sitio web: <a href="http://localhost:3000/pqrs" rel="external nofollow noopener" target="_blank">http://localhost:3000/pqrs</ a></p>
  </li>
  <li>
  <p>Por número de teléfono: <p>3184369690</p></p>
  </li>
  </ul>`;
  const policy5 = `<h2>AVISO LEGAL</h2>
  <p>La Universidad no ofrece premios ni realiza juegos promocionales relacionados con sus servicios. Por lo tanto, se advierte a los usuarios que la universidad no promociona ni avala ninguna promoción de esta naturaleza, especialmente aquellas que puedan ser enviadas a través de mensajes o enlaces en nuestro sitio web.</p>
  
  <p>En caso de recibir este tipo de mensajes fraudulentos en nombre de este sitio web, por favor contáctanos a través de nuestro correo electrónico o contacto telefónico</p>
  
  <h2>POLÍTICAS DE USO DE LA PÁGINA WEB</h2>
  <p>Nuestra página web tiene por objeto proporcionar información, sin que constituya una oferta pública de productos y/o servicios.</p>
  
  <p>Toda la información contenida en la página web podrá ser modificada de manera unilateral, y se ha dispuesto como un recurso informativo para nuestros visitantes.</p>
  
  <p>Lea la información contenida en este Aviso Legal antes de utilizar nuestro sitio web, donde se establecen los términos y condiciones que el usuario reconoce, entiende y se compromete a cumplir.</p>
  
  <h2>DERECHOS DE PROPIEDAD INTELECTUAL</h2>
  <p>Los contenidos, incluyendo texto, imágenes, y otros materiales, en nuestra página web están cumpliendo con las leyes de adquisición de derechos de autor.</p>
  
  <p>La utilización, reproducción, distribución o cualquier otro uso de los contenidos de este sitio web sin la autorización previa será considerada ilícita y sujeta a sanciones legales.</p>
`;

  const [currentPolicy, setCurrentPolicy] = useState(null);

  const changePolicy = (newPolicy) => {
    setCurrentPolicy(newPolicy);
  };

  return (
    <div className="privacy-content">
      {/* <div className="arrow-back-policies">
        <Link to="/">
          <ArrowBack />
        </Link>
      </div> */}
      <div className="privacy-card">
        <div className="header">
          <div className="header-content-button">
            <div className="div">
              <Button
                className="button-style"
                onClick={() => changePolicy(policy1)}
              >
                INTERPRETACIONES Y DEFINICIONES
              </Button>
            </div>
            <div className="div">
              <Button
                className="button-style"
                onClick={() => changePolicy(policy2)}
              >
                RECOPILACION Y USO DE SUS DATOS PERSONALES
              </Button>
            </div>
            <div className="div">
              <Button
                className="button-style"
                onClick={() => changePolicy(policy5)}
              >
                AVISOS LEGALES
              </Button>
            </div>
            <div className="div">
              <Button
                className="button-style"
                onClick={() => changePolicy(policy3)}
              >
                ENLACES A OTROS SITIOS WEB
              </Button>
            </div>
            <div className="div">
              <Button
                className="button-style"
                onClick={() => changePolicy(policy4)}
              >
                CAMBIOS EN LAS POLÍTICAS DE PRIVACIDAD
              </Button>
            </div>
          </div>
        </div>
        <div className="policies-card-content">
          {currentPolicy == null ? (
            <div className="policies">
              <h1>Política de Privacidad</h1>
              <p>Última actualización: 01 de noviembre de 2023</p>
              <p>
                Esta Política de Privacidad describe Nuestras políticas y
                procedimientos sobre la recopilación, el uso y la divulgación de
                Su información cuando utiliza el Servicio y le informa sobre Sus
                derechos de privacidad y cómo la ley lo protege.
              </p>
              <p>
                Utilizamos sus datos personales para proporcionar y mejorar el
                Servicio. Al utilizar el Servicio, usted acepta la recopilación
                y el uso de información de acuerdo con esta Política de
                Privacidad. Esta Política de Privacidad se ha creado con la
                ayuda del{" "}
                <a
                  href="https://www.privacypolicies.com/privacy-policy-generator/"
                  target="_blank"
                >
                  Generador de Políticas de Privacidad
                </a>
                .
              </p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: currentPolicy }}></div>
          )}
        </div>
      </div>
    </div>
  );
};
