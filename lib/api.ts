// lib/api.ts
// Cliente para TODOS los endpoints del backend FastAPI

const RAW_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export const API_URL = RAW_API_URL.replace(/\/+$/, "");

/**
 * Utilidad para manejar errores de fetch de forma consistente
 */
async function handleJsonResponse(res: Response) {
  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      detail = await res.text();
    }
    throw new Error(
      `Error ${res.status} al llamar a la API: ${JSON.stringify(detail)}`
    );
  }
  return res.json();
}

/**
 * Utilidad para convertir http(s) -> ws(s) para WebSocket
 */
function buildWsUrl(path: string): string {
  const url = new URL(path, API_URL);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  return url.toString();
}

/* ──────────────────────────
 *  BASICS / HEALTH
 * ────────────────────────── */

/** GET /ping */
export async function getPing(): Promise<any> {
  const res = await fetch(`${API_URL}/ping`, {
    cache: "no-store",
  });
  return handleJsonResponse(res);
}

/** GET /status */
export async function getStatus(): Promise<any> {
  const res = await fetch(`${API_URL}/status`, {
    cache: "no-store",
  });
  return handleJsonResponse(res);
}

/* ──────────────────────────
 *  FORECAST
 * ────────────────────────── */

/** GET /forecast/{tenant_code} */
export async function getForecast(
  tenantCode: string
): Promise<any> {
  const res = await fetch(`${API_URL}/forecast/${tenantCode}`, {
    cache: "no-store",
  });
  return handleJsonResponse(res);
}

/* ──────────────────────────
 *  EXPLAIN
 * ────────────────────────── */

/**
 * POST /explain/{tenant_code}
 *
 * El shape del payload debes verlo en /docs de FastAPI.
 * Aquí lo dejamos como `any` para no inventar campos.
 */
export async function postExplain(
  tenantCode: string,
  payload: any
): Promise<any> {
  const res = await fetch(`${API_URL}/explain/${tenantCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

/* ──────────────────────────
 *  UPLOAD SALES
 * ────────────────────────── */

/**
 * POST /upload_sales/{tenant_code}
 *
 * Asume que el backend recibe un archivo (ej. CSV).
 * Revisa en /docs el nombre exacto del campo (ej. "file" o "csv_file").
 * Aquí usamos "file" genérico.
 */
export async function uploadSalesFile(
  tenantCode: string,
  file: File,
  fieldName = "file"
): Promise<any> {
  const formData = new FormData();
  formData.append(fieldName, file);

  const res = await fetch(`${API_URL}/upload_sales/${tenantCode}`, {
    method: "POST",
    body: formData,
  });

  return handleJsonResponse(res);
}

/* ──────────────────────────
 *  REPORTES (PPTX / EXCEL)
 * ────────────────────────── */

/**
 * POST /report/pptx/{tenant_code}
 * Genera un PPTX. Regresa un Blob + nombre sugerido.
 *
 * El payload depende de lo que defina el backend, aquí es genérico.
 */
export async function generateReportPptx(
  tenantCode: string,
  payload: any
): Promise<{ blob: Blob; filename: string }> {
  const res = await fetch(`${API_URL}/report/pptx/${tenantCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      detail = await res.text();
    }
    throw new Error(
      `Error ${res.status} al generar PPTX: ${JSON.stringify(detail)}`
    );
  }

  const blob = await res.blob();

  const cd = res.headers.get("Content-Disposition") ?? "";
  const match = cd.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] ?? "reporte.pptx";

  return { blob, filename };
}

/**
 * POST /report/excel/{tenant_code}
 * Genera un Excel (XLSX/CSV). Igual que el PPTX.
 */
export async function generateReportExcel(
  tenantCode: string,
  payload: any
): Promise<{ blob: Blob; filename: string }> {
  const res = await fetch(`${API_URL}/report/excel/${tenantCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      detail = await res.text();
    }
    throw new Error(
      `Error ${res.status} al generar Excel: ${JSON.stringify(detail)}`
    );
  }

  const blob = await res.blob();

  const cd = res.headers.get("Content-Disposition") ?? "";
  const match = cd.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] ?? "reporte.xlsx";

  return { blob, filename };
}

/* ──────────────────────────
 *  METRICS WEBSOCKET
 * ────────────────────────── */

/**
 * WEBSOCKET /ws/metrics/{tenant_code}
 *
 * Esto crea el WebSocket, el front se encarga de escuchar mensajes.
 */
export function createMetricsWebSocket(
  tenantCode: string
): WebSocket {
  const wsUrl = buildWsUrl(`/ws/metrics/${tenantCode}`);
  return new WebSocket(wsUrl);
}

