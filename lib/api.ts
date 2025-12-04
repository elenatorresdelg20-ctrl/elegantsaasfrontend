const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

const AUTH_TOKEN_KEY = "authToken"
const TENANT_KEY = "tenantId"

type ApiOptions = RequestInit & { skipAuth?: boolean }

function getStoredValue(key: string) {
  if (typeof window === "undefined") return null
  return localStorage.getItem(key)
}

export function getAuthToken() {
  return getStoredValue(AUTH_TOKEN_KEY)
}

export function getTenantId() {
  return getStoredValue(TENANT_KEY)
}

export function setSession(token: string, tenantId?: string) {
  if (typeof window === "undefined") return
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  if (tenantId) {
    localStorage.setItem(TENANT_KEY, tenantId)
  }
}

export function clearSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(TENANT_KEY)
}

async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { skipAuth, headers, ...rest } = options
  const token = !skipAuth ? getAuthToken() : null

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export interface LoginResponse {
  access_token: string
  token_type?: string
  tenant?: string
}

export async function login(email: string, password: string) {
  const body = { username: email, password }
  const data = await apiFetch<LoginResponse>(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    skipAuth: true,
  })
  setSession(data.access_token, data.tenant)
  return data
}

export interface UploadAnalysisResponse {
  columns: { name: string; type: "date" | "number" | "text"; sample: any }[]
  charts: { id: string; type: "line" | "bar" | "pie" | "area"; title: string; data: any[]; xKey: string; yKey: string; description: string }[]
  kpis: { label: string; value: string; change?: number; icon?: string }[]
  rawData: any[]
  rowCount: number
  vendedores: string[]
  clientes: string[]
  tiendas: string[]
}

export async function uploadDataset(file: File) {
  const token = getAuthToken()
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/api/upload/process`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Upload failed with status ${response.status}`)
  }

  return (await response.json()) as UploadAnalysisResponse
}

export interface AnalysisOverview {
  ishikawa: {
    problem: string
    branches: { category: string; color: string; causes: { id: string; text: string; subCauses?: string[] }[] }[]
  }
  actions: {
    id: string
    title: string
    description?: string
    status: "pending" | "in-progress" | "completed"
    owner?: string
    dueDate?: string
    impact?: "low" | "medium" | "high"
    children?: AnalysisOverview["actions"]
  }[]
}

export async function fetchAnalysisOverview() {
  return apiFetch<AnalysisOverview>("/api/analysis/overview")
}

export interface SalesDashboardData {
  kpis: {
    ingresosMes: { value: string; change: number }
    pipeline: { value: string; change: number }
    cierre: { value: string; change: number }
    nuevosClientes: { value: string; change: number }
  }
  revenueData: { name: string; actual: number | null; forecast: number | null }[]
  topVendedores: { nombre: string; ventas: string; deals: number; meta: number; avatar: string; rank: number }[]
  topCompradores: { empresa: string; compras: string; pedidos: number; frecuencia: string; crecimiento: number }[]
  topProductos: { nombre: string; ventas: string; unidades: number; tendencia: "up" | "down"; cambio: number }[]
  forecastProductos: { nombre: string; actual: number; prediccion: number; tendencia: "up" | "down" }[]
  pipelineData: { name: string; value: number; color: string }[]
}

export async function fetchSalesDashboard() {
  return apiFetch<SalesDashboardData>("/api/sales/dashboard")
}
