import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExchangeStatus = "connected" | "syncing" | "error";

interface ExchangeCardProps {
  name: string;
  icon: React.ReactNode;
  status: ExchangeStatus;
  balance: number;
  volume: number;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export function ExchangeCard({
  name,
  icon,
  status,
  balance,
  volume,
  onEdit,
  onDelete,
  className,
}: ExchangeCardProps) {
  // Get status color and text
  const getStatusInfo = () => {
    switch (status) {
      case "connected":
        return {
          color: "bg-green-500",
          text: "Connected",
          textColor: "text-green-500",
        };
      case "syncing":
        return {
          color: "bg-yellow-500",
          text: "Syncing",
          textColor: "text-yellow-500",
        };
      case "error":
        return {
          color: "bg-red-500",
          text: "Error",
          textColor: "text-red-500",
        };
    }
  };

  const { color, text, textColor } = getStatusInfo();

  return (
    <tr className="border-b border-gray-800">
      <td className="py-3 px-5">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-surface mr-3 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-white font-medium">{name}</span>
        </div>
      </td>
      <td className="py-3 px-5">
        <div className={cn("flex items-center", textColor)}>
          <div className={cn("h-2 w-2 rounded-full mr-2", color)}></div>
          {text}
        </div>
      </td>
      <td className="py-3 px-5 text-white">
        ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className="py-3 px-5 text-white">
        ${volume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className="py-3 px-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="text-gray-400 hover:text-white mr-3"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
