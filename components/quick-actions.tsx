import { Button } from "@/components/ui/button"
import { Upload, FileText, BarChart3, Users } from "lucide-react"

const actions = [
  { label: "New Report", icon: FileText, variant: "default" as const },
  { label: "Create Dashboard", icon: BarChart3, variant: "outline" as const },
  { label: "Import Data", icon: Upload, variant: "outline" as const },
  { label: "Add Team Member", icon: Users, variant: "outline" as const },
]

export function QuickActions() {
  return (
    <div className="flex items-center gap-3">
      {actions.map((action) => (
        <Button key={action.label} variant={action.variant} className="gap-2">
          <action.icon className="h-4 w-4" />
          {action.label}
        </Button>
      ))}
    </div>
  )
}
