# Sitio web de INGELECTRICA SOLAR SAS

Sitio estático (HTML, CSS y JavaScript sin dependencias ni recursos de terceros). NIT 901.471.812-2.

```
index.html        página principal
privacidad.html   política de tratamiento de datos personales (Ley 1581 de 2012)
terminos.html     términos, garantías, retracto y PQR (Ley 1480 de 2011)
css/estilos.css   js/main.js   fonts/   img/   favicon.svg
robots.txt  sitemap.xml  .well-known/security.txt  .nojekyll
```

## Qué cubre

- **Datos personales:** casilla de autorización previa y expresa en el formulario, constancia de la autorización dentro del mensaje de WhatsApp, política con derechos, plazos (10 y 15 días hábiles), encargados, transferencia internacional y horarios de contacto de la Ley 2300 de 2023.
- **Consumidor:** identificación de la empresa, garantías, derecho de retracto, canal de PQR con plazo de respuesta, enlace a la SIC y aviso de que las cifras de ahorro son estimaciones.
- **Seguridad:** política de seguridad de contenido (CSP) que solo permite archivos del propio sitio, sin scripts ni estilos en línea, sin cookies, analítica ni fuentes externas; enlaces externos con `noopener noreferrer`; formulario validado que no envía datos a ningún servidor; fotos sin metadatos de ubicación.
- **Accesibilidad:** navegación por teclado, enlace para saltar al contenido, textos alternativos, etiquetas y mensajes de error en el formulario, contraste AA.

## Antes de publicar: lo que debe confirmar el representante legal

- [ ] Leer `privacidad.html` y `terminos.html` y confirmar que describen lo que la empresa hace. Lo ideal es que los revise un abogado.
- [ ] Confirmar que las fotos de `img/` son de obras de la empresa y que hay permiso del dueño del inmueble para publicarlas.
- [ ] Confirmar que el dominio `ingelectricasolar.com.co` está registrado a nombre de la empresa. Aparece en la política, el `sitemap.xml`, `robots.txt` y las etiquetas `canonical`.
- [ ] Confirmar que la dirección de Fusagasugá es la de notificación judicial que figura en la cámara de comercio.

Datos que conviene agregar (no son obligatorios en el sitio): número de matrícula profesional del ingeniero, matrícula mercantil y horario de atención.

## Obligaciones fuera del sitio

- [ ] Inscribir el sitio web en el registro mercantil (Ley 633 de 2000, art. 91).
- [ ] Registro Nacional de Bases de Datos ante la SIC, solo si los activos totales superan 100.000 UVT (Decreto 090 de 2018).
- [ ] Guardar los mensajes de WhatsApp donde el cliente autoriza el tratamiento de sus datos: son la prueba de la autorización.
- [ ] Poner el enlace a la política de datos en el mensaje de bienvenida de WhatsApp Business.
- [ ] Activar la verificación en dos pasos en WhatsApp, Gmail y GitHub.
- [ ] No publicar testimonios, cifras de ahorro ni proyectos que no se puedan demostrar (Ley 1480 de 2011, arts. 29 y 30).

## Publicar en GitHub Pages

El sitio está publicado en `https://paulmorales-stack.github.io/INGELECTRICASOLAR/` desde la rama `gh-pages`, que es una copia de `main`. Cada cambio debe subirse a las dos ramas. Para publicar solo desde `main`: Settings → Pages → Branch: `main` / `(root)` → Save, y después se puede borrar `gh-pages`.

Dominio propio: Settings → Pages → Custom domain. En el DNS del registrador, cuatro registros A (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) y un CNAME `www` → `paulmorales-stack.github.io`. Después, activar **Enforce HTTPS**.

Límite conocido: GitHub Pages no permite cabeceras HTTP propias. La CSP va en una etiqueta `<meta>`, así que no hay protección contra incrustar el sitio en marcos de terceros (`frame-ancestors`) ni HSTS propio. Si hiciera falta, poner el dominio detrás de Cloudflare y definir allí las cabeceras.

## Poner la foto de un servicio

Cada tarjeta de servicio en `index.html` empieza con un bloque `media`. Las que aún no tienen foto muestran un ícono:

```html
<div class="media ic g" aria-hidden="true"><svg ...></svg></div>
```

Para ponerle foto, guarde la imagen en `img/` (horizontal, 760 × 428 px, menos de 150 KB, sin datos de ubicación) y reemplace ese bloque por:

```html
<div class="media"><img src="img/servicio-piscinas.jpg" width="760" height="428" loading="lazy" alt="Qué se ve en la foto"></div>
```

Use solo fotos de trabajos de la empresa y con permiso del dueño del inmueble.

## Probar la validación del formulario

```bash
node -e "const {validar}=require('./js/main.js');console.log(validar({nombre:'',municipio:'',kwh:'x',mensaje:'',acepto:false}))"
```
