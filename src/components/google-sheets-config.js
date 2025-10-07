/**
 * Web App para escribir confirmaciones en Google Sheets
 * Hoja: GRADUACION  |  Columnas: [Nombre, Fecha, Estado]
 */

const SHEET_ID  = '1I4AglHgs6S-W4SZ52qmmpYlT8EwiMffv8QXzqNNq2Rc';
const SHEET_NAME = 'GRADUACION';            // <— tu pestaña
const TIMEZONE   = 'America/Guatemala';

/* ---------- Utilidades ---------- */
function json(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);

  // Headers CORS simplificados
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', '*');
  output.setHeader('Access-Control-Allow-Headers', '*');

  return output;
}

/* ---------- Preflight CORS ---------- */
function doOptions() {
  const output = ContentService.createTextOutput('');
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', '*');
  output.setHeader('Access-Control-Allow-Headers', '*');
  return output;
}

/* ---------- Obtener todas las confirmaciones ---------- */
function doGet() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) throw new Error('No existe la pestaña: ' + SHEET_NAME);

    // Obtener todos los datos (excepto la fila de encabezado si existe)
    const data = sh.getDataRange().getValues();

    // Si hay datos, devolverlos formateados
    const confirmaciones = data.slice(1).map((row, index) => ({
      id: index + 1,
      nombre: String(row[0] || '').trim(),
      timestamp: String(row[1] || '').trim(),
      estado: String(row[2] || 'Confirmado').trim()
    })).filter(conf => conf.nombre); // Filtrar entradas vacías

    return json({
      ok: true,
      confirmaciones: confirmaciones,
      total: confirmaciones.length
    });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
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
