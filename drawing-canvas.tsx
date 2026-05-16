"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { X, ZoomIn, ZoomOut, Move } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export interface DetectedSymbol {
  symbolId: string
  symbolName: string
  nameKorean?: string
  nameEnglish?: string
  category?: string
  connectionType?: string
  x: number
  y: number
  width: number
  height: number
  confidence: number
  description?: string
  detectedFeatures?: string
}

interface DrawingCanvasProps {
  imageUrl: string
  detectedSymbols: DetectedSymbol[]
  drawingType?: string
  generalDescription?: string
  onClear: () => void
}

export function DrawingCanvas({ 
  imageUrl, 
  detectedSymbols, 
  drawingType,
  generalDescription,
  onClear 
}: DrawingCanvasProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<DetectedSymbol | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSymbolClick = useCallback((symbol: DetectedSymbol) => {
    setSelectedSymbol(symbol)
  }, [])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "border-green-500 bg-green-500/20 hover:bg-green-500/40"
    if (confidence >= 70) return "border-blue-500 bg-blue-500/20 hover:bg-blue-500/40"
    if (confidence >= 50) return "border-yellow-500 bg-yellow-500/20 hover:bg-yellow-500/40"
    return "border-red-500 bg-red-500/20 hover:bg-red-500/40"
  }

  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500"
    if (confidence >= 70) return "bg-blue-500"
    if (confidence >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 90) return "매우 높음"
    if (confidence >= 70) return "높음"
    if (confidence >= 50) return "보통"
    return "낮음"
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5))
  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && e.ctrlKey) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
    }
  }

  // Group symbols by category
  const symbolsByCategory = detectedSymbols.reduce((acc, symbol) => {
    const category = symbol.category || "기타"
    if (!acc[category]) acc[category] = []
    acc[category].push(symbol)
    return acc
  }, {} as Record<string, DetectedSymbol[]>)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{detectedSymbols.length}개 심볼 감지됨</Badge>
            {drawingType && <Badge variant="outline">{drawingType}</Badge>}
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500"></span>90%+</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500"></span>70-89%</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500"></span>50-69%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm w-16 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleResetView}>
              <Move className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={onClear}>
              <X className="h-4 w-4 mr-2" />
              새 도면
            </Button>
          </div>
        </div>
        {generalDescription && (
          <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
            {generalDescription}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Ctrl + 드래그로 이동, Ctrl + 스크롤로 확대/축소, 심볼 클릭하여 상세 정보 확인
        </p>
      </div>

      {/* Canvas */}
      <div 
        ref={containerRef}
        className="relative border rounded-lg overflow-hidden bg-muted/30 cursor-crosshair"
        style={{ height: "600px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          <Image
            src={imageUrl}
            alt="Uploaded P&ID Drawing"
            fill
            className="object-contain"
            unoptimized
          />
          
          {detectedSymbols.map((symbol, index) => {
            // Calculate position - symbol.x and symbol.y are center points
            const left = symbol.x - (symbol.width / 2)
            const top = symbol.y - (symbol.height / 2)
            
            return (
              <button
                key={`${symbol.symbolId}-${index}`}
                className={`absolute border-2 transition-all cursor-pointer rounded-sm ${getConfidenceColor(symbol.confidence)}`}
                style={{
                  left: `${Math.max(0, left)}%`,
                  top: `${Math.max(0, top)}%`,
                  width: `${Math.max(symbol.width, 2)}%`,
                  height: `${Math.max(symbol.height, 2)}%`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSymbolClick(symbol)
                }}
                title={`${symbol.symbolName} (${symbol.confidence}%)\nX: ${symbol.x}%, Y: ${symbol.y}%`}
              >
                <span 
                  className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-white px-1 py-0.5 rounded whitespace-nowrap font-bold ${getConfidenceBadgeColor(symbol.confidence)}`}
                  style={{ zIndex: 10 }}
                >
                  {index + 1}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Symbol List by Category */}
      <div className="space-y-4">
        {Object.entries(symbolsByCategory).map(([category, symbols]) => (
          <div key={category}>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <span>{category}</span>
              <Badge variant="secondary" className="text-xs">{symbols.length}</Badge>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {symbols.map((symbol) => {
                const globalIndex = detectedSymbols.findIndex(s => s === symbol)
                return (
                  <button
                    key={`list-${symbol.symbolId}`}
                    className="flex items-center gap-2 p-2 border rounded-lg hover:bg-muted/50 transition-colors text-left"
                    onClick={() => handleSymbolClick(symbol)}
                  >
                    <span className={`flex items-center justify-center w-6 h-6 text-white rounded text-xs font-medium ${getConfidenceBadgeColor(symbol.confidence)}`}>
                      {globalIndex + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{symbol.nameKorean || symbol.symbolName}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {symbol.connectionType && `${symbol.connectionType} · `}
                        {symbol.confidence}% ({getConfidenceText(symbol.confidence)})
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSymbol} onOpenChange={(open) => !open && setSelectedSymbol(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>심볼 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedSymbol && (
            <div className="space-y-4">
              <div className="space-y-3">
                {/* Symbol Name */}
                <div>
                  <p className="text-sm text-muted-foreground">심볼 이름</p>
                  <p className="font-medium text-lg">{selectedSymbol.nameKorean || selectedSymbol.symbolName}</p>
                  {selectedSymbol.nameEnglish && (
                    <p className="text-sm text-muted-foreground">{selectedSymbol.nameEnglish}</p>
                  )}
                </div>

                {/* Category & Connection Type */}
                <div className="flex flex-wrap gap-2">
                  {selectedSymbol.category && (
                    <Badge variant="secondary">{selectedSymbol.category}</Badge>
                  )}
                  {selectedSymbol.connectionType && selectedSymbol.connectionType !== "N/A" && (
                    <Badge variant="outline">{selectedSymbol.connectionType}</Badge>
                  )}
                </div>

                {/* Confidence */}
                <div>
                  <p className="text-sm text-muted-foreground">인식 신뢰도</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${getConfidenceBadgeColor(selectedSymbol.confidence)}`}
                        style={{ width: `${selectedSymbol.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-20 text-right">
                      {selectedSymbol.confidence}% ({getConfidenceText(selectedSymbol.confidence)})
                    </span>
                  </div>
                </div>

                {/* Description from GPT */}
                {selectedSymbol.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">설명</p>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{selectedSymbol.description}</p>
                  </div>
                )}

                {/* Visual Features / Recognition Basis */}
                {selectedSymbol.detectedFeatures && (
                  <div>
                    <p className="text-sm text-muted-foreground">인식 근거</p>
                    <p className="text-sm bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                      {selectedSymbol.detectedFeatures}
                    </p>
                  </div>
                )}

                {/* Position Info */}
                <div>
                  <p className="text-sm text-muted-foreground">위치 정보</p>
                  <div className="grid grid-cols-2 gap-2 text-sm bg-muted/50 p-3 rounded-lg">
                    <div>X: {selectedSymbol.x.toFixed(1)}%</div>
                    <div>Y: {selectedSymbol.y.toFixed(1)}%</div>
                    <div>너비: {selectedSymbol.width.toFixed(1)}%</div>
                    <div>높이: {selectedSymbol.height.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
