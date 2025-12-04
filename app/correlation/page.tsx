import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TopNavTabs } from "@/components/top-nav-tabs"
import { CorrelationMatrix } from "@/components/correlation-matrix"
import { ScatterPlot } from "@/components/scatter-plot"
import { AiChat } from "@/components/ai-chat"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Filter, Plus } from "lucide-react"

// Sample correlation matrix data
const correlationData = {
  labels: ["Revenue", "Marketing Spend", "User Acquisition", "Churn Rate", "NPS Score", "Support Tickets"],
  values: [
    [1.0, 0.85, 0.78, -0.45, 0.62, -0.38],
    [0.85, 1.0, 0.72, -0.32, 0.48, -0.25],
    [0.78, 0.72, 1.0, -0.55, 0.58, -0.42],
    [-0.45, -0.32, -0.55, 1.0, -0.68, 0.72],
    [0.62, 0.48, 0.58, -0.68, 1.0, -0.55],
    [-0.38, -0.25, -0.42, 0.72, -0.55, 1.0],
  ],
}

// Sample scatter plot data
const scatterData1 = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 80 + Math.random() * 20,
  z: Math.random() * 100,
}))

const scatterData2 = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: 100 - Math.random() * 80,
  z: Math.random() * 100,
}))

const scatterData3 = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 100,
}))

const insights = [
  {
    title: "Strong Positive Correlation",
    description: "Marketing Spend and Revenue show a strong positive correlation (r=0.85)",
    type: "positive" as const,
  },
  {
    title: "Negative Relationship",
    description: "Churn Rate negatively impacts NPS Score (r=-0.68)",
    type: "negative" as const,
  },
  {
    title: "Actionable Insight",
    description: "Reducing Support Tickets could improve Churn Rate significantly",
    type: "neutral" as const,
  },
]

export default function CorrelationPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavTabs />
        <Header title="Correlation Analysis" subtitle="Discover relationships between your metrics" />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Actions Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter Variables
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Dataset
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main content area */}
            <div className="space-y-6 lg:col-span-2">
              {/* Correlation Matrix */}
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Correlation Matrix</h2>
                  <p className="text-sm text-muted-foreground">Heatmap showing relationships between all variables</p>
                </div>
                <CorrelationMatrix data={correlationData} />
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-destructive/80" />
                    <span>Strong Negative</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-muted" />
                    <span>No Correlation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-success/80" />
                    <span>Strong Positive</span>
                  </div>
                </div>
              </div>

              {/* Scatter Plots */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-foreground">Detailed Scatter Plots</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <ScatterPlot data={scatterData1} xLabel="Marketing Spend" yLabel="Revenue" correlation={0.85} />
                  <ScatterPlot data={scatterData2} xLabel="Churn Rate" yLabel="NPS Score" correlation={-0.68} />
                  <ScatterPlot
                    data={scatterData3}
                    xLabel="Support Tickets"
                    yLabel="User Acquisition"
                    correlation={-0.42}
                  />
                </div>
              </div>

              {/* Insights */}
              <div className="rounded-lg border border-border bg-card p-4">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Key Insights</h2>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border px-4 py-3 ${
                        insight.type === "positive"
                          ? "border-success/30 bg-success/10"
                          : insight.type === "negative"
                            ? "border-destructive/30 bg-destructive/10"
                            : "border-border bg-secondary/50"
                      }`}
                    >
                      <h3
                        className={`text-sm font-medium ${
                          insight.type === "positive"
                            ? "text-success"
                            : insight.type === "negative"
                              ? "text-destructive"
                              : "text-foreground"
                        }`}
                      >
                        {insight.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Assistant Panel */}
            <div className="h-[calc(100vh-220px)] lg:sticky lg:top-6">
              <AiChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
