'use strict';

// Valida los datos del formulario. Devuelve {campo: mensaje} con los errores; vacío si todo está bien.
function validar(d) {
  var e = {};
  if (!/^[\p{L} .'-]{2,80}$/u.test(d.nombre)) e.nombre = 'Escriba su nombre (solo letras, entre 2 y 80 caracteres).';
  if (d.municipio.length < 2 || d.municipio.length > 60) e.municipio = 'Escriba el municipio donde está el proyecto.';
  if (d.kwh !== '' && (!/^\d{1,6}$/.test(d.kwh) || Number(d.kwh) < 1)) e.kwh = 'Escriba el consumo en números, por ejemplo 450.';
  if (d.mensaje.length > 500) e.mensaje = 'El detalle admite máximo 500 caracteres.';
  if (!d.acepto) e.acepto = 'Para continuar debe autorizar el tratamiento de sus datos.';
  return e;
}

function mensajeWhatsApp(d, urlPolitica) {
  return 'Hola, soy ' + d.nombre + ' de ' + d.municipio + '.\nProyecto: ' + d.tipo +
    (d.kwh ? '\nConsumo: ' + d.kwh + ' kWh/mes' : '') +
    (d.mensaje ? '\n' + d.mensaje : '') +
    '\nLes envío la foto de mi factura.' +
    // deja constancia de la autorización en el mismo mensaje (Ley 1581 de 2012, art. 9)
    '\nAutorizo el tratamiento de mis datos según la política publicada en ' + urlPolitica;
}

if (typeof document !== 'undefined') (function () {
  var $ = function (id) { return document.getElementById(id); };

  var yr = $('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var btn = $('menuBtn'), nav = $('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', nav.classList.toggle('open'));
    });
    nav.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-copy');
      var ok = function () { b.textContent = 'Copiado'; setTimeout(function () { b.textContent = 'Copiar'; }, 1600); };
      try { navigator.clipboard.writeText(t).then(ok, function () { b.textContent = t; }); } catch (e) { b.textContent = t; }
    });
  });

  var f = $('lead');
  if (!f) return;
  var campos = { nombre: 'f-nombre', municipio: 'f-mun', kwh: 'f-kwh', mensaje: 'f-msg', acepto: 'f-acepto' };
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = {
      nombre: $('f-nombre').value.trim(), municipio: $('f-mun').value.trim(), tipo: $('f-tipo').value,
      kwh: $('f-kwh').value.trim(), mensaje: $('f-msg').value.trim(), acepto: $('f-acepto').checked
    };
    var errores = validar(d), primero = null;
    Object.keys(campos).forEach(function (k) {
      var el = $(campos[k]), msg = $('e-' + k);
      if (errores[k]) { el.setAttribute('aria-invalid', 'true'); primero = primero || el; }
      else el.removeAttribute('aria-invalid');
      if (msg) { msg.textContent = errores[k] || ''; msg.hidden = !errores[k]; }
    });
    var resumen = $('f-err');
    resumen.hidden = !primero;
    resumen.textContent = primero ? (errores.mensaje || 'Revise los campos marcados.') : '';
    if (primero) { primero.focus(); return; }
    var url = 'https://wa.me/573229032883?text=' + encodeURIComponent(mensajeWhatsApp(d, new URL('privacidad.html', location.href).href));
    var link = $('f-link');
    link.href = url; link.hidden = false;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();

if (typeof module !== 'undefined') module.exports = { validar: validar, mensajeWhatsApp: mensajeWhatsApp };
