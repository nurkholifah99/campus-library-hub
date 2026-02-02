import { cn } from "@/lib/utils";

type Status = "borrowed" | "returned" | "late" | "available" | "unavailable";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  available: {
    label: "Tersedia",
    className: "status-available",
  },
  unavailable: {
    label: "Dipinjam",
    className: "status-borrowed",
  },
  borrowed: {
    label: "Dipinjam",
    className: "bg-info/10 text-info border border-info/20",
  },
  returned: {
    label: "Dikembalikan",
    className: "status-available",
  },
  late: {
    label: "Terlambat",
    className: "status-late",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
