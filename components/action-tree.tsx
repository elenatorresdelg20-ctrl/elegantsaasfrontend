"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Circle, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

type ActionStatus = "pending" | "in-progress" | "completed" | "blocked"

interface ActionNode {
  id: string
  title: string
  description?: string
  status: ActionStatus
  owner?: string
  dueDate?: string
  impact?: "high" | "medium" | "low"
  children?: ActionNode[]
}

interface ActionTreeProps {
  data: ActionNode[]
  title: string
}

function StatusIcon({ status }: { status: ActionStatus }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-success" />
    case "in-progress":
      return <Clock className="h-4 w-4 text-warning" />
    case "blocked":
      return <AlertTriangle className="h-4 w-4 text-destructive" />
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />
  }
}

function TreeNode({ node, level = 0 }: { node: ActionNode; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="relative">
      {/* Connection line */}
      {level > 0 && (
        <div className="absolute left-0 top-0 h-full w-px bg-border" style={{ left: `${level * 24 - 12}px` }} />
      )}

      <div
        className={cn(
          "group flex items-start gap-2 rounded-lg p-2 transition-colors hover:bg-secondary/50",
          level > 0 && "ml-6",
        )}
        style={{ marginLeft: `${level * 24}px` }}
      >
        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn("mt-0.5 rounded p-0.5 transition-colors hover:bg-secondary", !hasChildren && "invisible")}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        <StatusIcon status={node.status} />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{node.title}</span>
            {node.impact && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  node.impact === "high" && "bg-destructive/20 text-destructive",
                  node.impact === "medium" && "bg-warning/20 text-warning",
                  node.impact === "low" && "bg-muted text-muted-foreground",
                )}
              >
                {node.impact}
              </span>
            )}
          </div>
          {node.description && <p className="mt-0.5 text-xs text-muted-foreground">{node.description}</p>}
          {(node.owner || node.dueDate) && (
            <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
              {node.owner && <span>Owner: {node.owner}</span>}
              {node.dueDate && <span>Due: {node.dueDate}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ActionTree({ data, title }: ActionTreeProps) {
  const stats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    blocked: 0,
  }

  function countNodes(nodes: ActionNode[]) {
    nodes.forEach((node) => {
      stats.total++
      if (node.status === "completed") stats.completed++
      if (node.status === "in-progress") stats.inProgress++
      if (node.status === "blocked") stats.blocked++
      if (node.children) countNodes(node.children)
    })
  }
  countNodes(data)

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span>{stats.completed} completadas</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-warning" />
            <span>{stats.inProgress} en progreso</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-destructive" />
            <span>{stats.blocked} bloqueadas</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-success transition-all"
            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
          />
        </div>
      </div>
      <div className="max-h-[500px] overflow-y-auto p-4">
        {data.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  )
}
