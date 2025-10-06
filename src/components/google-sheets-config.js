/**
 * Web App para escribir confirmaciones en Google Sheets
 * Hoja: GRADUACION  |  Columnas: [Nombre, Fecha, Estado]
 */

const SHEET_ID  = '1I4AglHgs6S-W4SZ52qmmpYlT8EwiMffv8QXzqNNq2Rc';
const SHEET_NAME = 'GRADUACION';            // <— tu pestaña
const TIMEZONE   = 'America/Guatemala';

/* ---------- Utilidades ---------- */
function withCORS(output) {
  return output
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(data) {
  return withCORS(
    ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON)
  );
}

/* ---------- Preflight CORS ---------- */
function doOptions() {
  return withCORS(ContentService.createTextOutput(''));
}

/* ---------- (Opcional) Ping ---------- */
function doGet() {
  return json({ ok: true, message: 'Web App activa' });
}

/* ---------- Escribir confirmación ---------- */
function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents
      ? JSON.parse(e.postData.contents)
      : {};

    const nombre = String(body.nombre || '').trim();
    const estado = String(body.estado || 'Confirmado').trim();
    if (!nombre) throw new Error('Nombre requerido');

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) throw new Error('No existe la pestaña: ' + SHEET_NAME);

    const ts = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
    sh.appendRow([nombre, ts, estado]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}
