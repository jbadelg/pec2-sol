---

title: Apuntes PEC1 - Un workflow moderno de desarrollo front-end
authors:
- ANGEL JAVIER BADEL GASCA
date: 2022-03-16
abstract: PEC1 Un workflow moderno de desarrollo front-end, parcel

---


## Comandos bash

  * [Comandos Bash](https://guide.bash.academy/) 

## Bash: mostrar redirects e imprimir una dirección al principio

  curl https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch -L -I | grep location | awk '{ print "https://developer.mozilla.org" $2 }'

# Sobre los module bundlers

## Actividad 1

- ¿Para qué crees que sirve el comando npx? ¿Qué ha sucedido cuando lo has lanzado?

  > npx para ejecutar paquete que no está instalado globalmente, con npx parcel src/index.html se levantó un servidor en http://localhost:1234.

- ¿Qué diferencias hay entre instalar un paquete en global y en local? ¿Por qué recomendamos instalar en local?
  > En local se usa con require() para un proyecto específico; **global** cuando no se requiere usar require(), cuando el paquete es mas una herramienta, no son usados como dependencias en proyectos node ni enfocados al proyecto como tal, por ejemplo npm. Cuando son herramientas o programas en sí que se usan mediante comandos en la interfaz de linea de comandos CLI.  
  En global otros desarrolladores no tendrán acceso a lo que instale   

- ¿Qué otros cambios has introducido o han aparecido en el archivo package.json?
  > Se añadió **source** con la dirección de index.html y los scripts **start** y **build**

- ¿Sabrías explicar para qué sirve cada script que has añadido a tu package.json?
  
  > **start** ejecuta el servidor, inicia parcel 

  > **Build** alista para el paso a producción 

## Actividad 2

1. Ejecuta la orden npm run build.
  *  ¿Qué ocurre en el terminal?
  > sale:

    pru@1.0.0 build 
    parcel build
    ✨ Built in 1.39s 
    dist/index.html            410 B    397ms
    dist/index.24fea2b8.css    102 B    844ms
    dist/index.250528f9.js      88 B    151ms

  *  ¿Qué ocurre en la carpeta de trabajo?
  
  > Se crea la carpeta dist
  
  *  ¿Qué crees que hay en la nueva carpeta que ha aparecido?

  > están los source mapas y archivos css y js listos para producción, el html también apuntando a los archivos creados 
  
  *  Inspecciona los archivos generados. ¿Qué diferencias hay?
  
  > En los archivos definitivos todo el código está en una sola línea. 

2. Para comparar las diferencias abre algún archivo (por ejemplo, el index.html en ambas rutas) con tu editor de texto. Observa de nuevo el terminal. Habiendo explorado la carpeta, ¿cómo interpretas la información que aparece en el terminal?

    > Se refiere al archivo definitivo que se insertó en el html, 

3. Ejecuta la orden npm run start.
  * ¿Qué ocurre?
    > Inicia el servidor 
  * ¿Qué diferencias hay con la ejecución de la orden anterior?
    > que usa el valor que se le da en el script. 
  *  Mantén esta ventana del terminal abierta. Si no se te abre el navegador automáticamente, abre una ventana del navegador e introduce la URL que te ha aparecido en el terminal (normalmente, http://localhost:1234).
    > Desplegó la aplicación del boundle, la que ya está apuntando a los archivos alistados y minimizados. 
4. Prueba a editar el archivo HTML de la raíz del proyecto. Por ejemplo, sustituye dentro de la etiqueta `h1` el texto `Hello World` por `Hello UOC`. Guarda el archivo y, sin recargar la pestaña del navegador que has abierto en el paso anterior, observa si el cambio aparece en la página.
  *  ¿Cómo crees que esto beneficia a los programadores y programadoras que trabajan en aplicaciones con module bundlers?
  
  > Se supone que debería cargar automáticamente los cambios pero no lo hace, al modificar el index y guardar también va cambiando el archivo de la distribución. 


## Actividad 3
Realiza las siguientes actividades y responde las siguientes preguntas:

1. Vuelve a ejecutar la orden npm run build.
   * ¿Qué ocurre en la carpeta de dist/?
      > Parece que deberían haber nuevos archivos, pero sigo viendo los mismos. En la carpeta caché si salen mas archivos
   * Como habrás podido comprobar, Parcel genera una nueva versión de archivos listos para producción, pero no elimina los antiguos. Si no los vamos borrando, crecerían indefinidamente.


2. Ejecuta la siguiente orden: npm install --save-dev rimraf npm-run-all.

     * ¿Qué cambios se han producido en el fichero package.json? En el mismo package.json, añade las siguientes líneas dentro del apartado "scripts":
      
          `"parcel:dev": "parcel",`

          `"parcel:build": "parcel build",`
      
          `"clean": "rimraf dist .parcel-cache"`

        > se ha creado la nueva dependencia en devDependencies a rimraf

    Finalmente, sustituye las tareas anteriores "start" y "build" por las siguientes:

    "start": "npm-run-all clean parcel:dev",
    "build": "npm-run-all clean parcel:build",

    Vuelve a ejecutar la orden npm run build.
    
    * ¿Qué ocurre ahora en la carpeta de dist/?
      > ya no se ve sino un sólo archivo de index.css, js.css, y html     
    * ¿Qué diferencia hay respecto la ejecución anterior?
      > hay menos archivos 

    * ¿Qué ventajas crees que aporta este cambio?
      > Elimina automáticamente los archivos que no se usan
    
    * ¿Sabrías descifrar cuál es el objetivo de cada una de las órdenes que hemos escrito en los puntos anteriores?
      > Borrar los archivos de cache y dist que no se usan y hacer lo mismo que build y start
    * ¿Y los paquetes adicionales que hemos instalado, para qué sirven?
      > para encargarse de mantener despejado y con las ultimas versiones las carpetas cache y dist.  

# Sobre los preprocesadores de código
## Actividad 1
Parcel ya incorpora una configuración básica de Babel por defecto. Así pues, no es necesario instalar nada para usarlo.

* Ejecuta la orden npm run build. Observa cómo, además del código JavaScript que hemos escrito en la actividad anterior, el archivo resultante incluye más líneas de código que Parcel añade automáticamente.
* Ahora, sustituye el contenido del archivo app.js en la raíz del proyecto por el siguiente:
          
        const name = 'world';
        console.log(`Hello ${name}`); 



*  Ejecuta la orden npm run start. Comprueba que la funcionalidad (escribir un texto en la consola de las herramientas de desarrolladores) no ha cambiado.

    > OK

* Ejecuta la orden npm run build
  * ¿Qué diferencias hay respecto el código JavaScript anterior generado por Parcel?
    > SALE: var name="world";console.log("Hello ".concat(name));

## Actividad 2
Una práctica habitual es indicar sobre qué versiones de navegadores debe ser compatible el código que procesan los preprocesadores por medio de los module bundlers. Esta funcionalidad se implementa utilizando Browserslist.

*  Sabrías explicar en una frase qué navegadores soportará nuestro boilerplate?
    > mayores al 0.5% de las estadísticas de uso globales; las últimas 2 versiones de cada navegador (last 2 versions) y que tengan soporte (not dead)
* Prueba a cambiar los navegadores soportados y crear una configuración personalizada de soporte de navegadores.
    > `> 0.5%, last 2 versions, not ie 11, not dead`

## Actividad 3
En esta actividad entenderemos el uso de los preprocesadores de CSS y los añadiremos a nuestro boilerplate. Al igual que con Babel, Parcel ya incluye postCSS así que no es necesario instalarlo.

1. Ejecuta la orden npm run build. Como hemos hecho anteriormente, comprueba el resultado del archivo style.css creado en la carpeta dist/.

    > en la carpeta no se creo style.css sino un index.css 

2. ¿Qué diferencias ves?

    > cambió la instrucción `to bottom` a `180deg` y el orden en que aparecían las propiedades.

3. ¿Cuáles de los cambios crees que son responsabilidad de PostCSS y el Autoprefixer?
   > El autoprefixer es el encargado de cambiar la instrucción de to bottom para que sirva en los navegadores. PostCss fue el enargado de cambiar el orden en que aparecen las instrucciones. 
4. ¿Sabrías encontrar otra propiedad que necesite ser modificada por el Autoprefixer y otra que no lo necesite?
    > el color por ejemplo o la letra no se cambia. Al agregar por ejemplo `position: sticky;` si hay un cambio ya que agrega: `position:-webkit-sticky; position:sticky `


