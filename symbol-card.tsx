"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PIDSymbol } from "@/lib/symbols"

interface SymbolCardProps {
  symbol: PIDSymbol
  similarity?: number
  onClick?: () => void
  selected?: boolean
}

export function SymbolCard({ symbol, similarity, onClick, selected }: SymbolCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="aspect-video relative bg-white rounded-md mb-3 overflow-hidden">
          <Image
            src={symbol.imageUrl}
            alt={symbol.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{symbol.name}</h3>
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {symbol.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {symbol.connectionType}
          </Badge>
        </div>
        {similarity !== undefined && (
          <div className="mt-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">유사도</span>
              <span className={`text-sm font-bold ${
                similarity >= 80 ? "text-green-600" : 
                similarity >= 50 ? "text-yellow-600" : "text-red-600"
              }`}>
                {similarity.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-1">
              <div 
                className={`h-1.5 rounded-full ${
                  similarity >= 80 ? "bg-green-600" : 
                  similarity >= 50 ? "bg-yellow-600" : "bg-red-600"
                }`}
                style={{ width: `${similarity}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
