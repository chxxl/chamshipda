"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { X, ZoomIn, ZoomOut, Move, Loader2, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface AnalyzedSymbol {
  id: string
  x: number
  y: number
  nameKorean: string
  nameEnglish: string
  category: string
  connectionType: string
  description: string
  confidence: number
  isMatchedFromDatabase?: boolean
  imageUrl?: string
}

interface ClickToAnalyzeCanvasProps {
  imageUrl: string
  onClear: () => void
}

export function ClickToAnalyzeCanvas({ imageUrl, onClear }: ClickToAnalyzeCanvasProps) {
  const [analyzedSymbols, setAnalyzedSymbols] = useState<AnalyzedSymbol[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState<AnalyzedSymbol | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzePosition, setAnalyzePosition] = useState<{ x: number; y: number } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  const cropAndAnalyze = useCallback(async (clickX: number, clickY: number, rect: DOMRect) => {
    setIsAnalyzing(true)
    setAnalyzePosition({ x: clickX, y: clickY })

    try {
      // Create a temporary image to get the actual dimensions
      const img = document.createElement("img")
      img.crossOrigin = "anonymous"
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = imageUrl
      })

      // Calculate the click position relative to the image
      const scaleX = img.naturalWidth / rect.width
      const scaleY = img.naturalHeight / rect.height

      // Size of the crop area (in original image pixels)
      const cropSize = Math.min(img.naturalWidth, img.naturalHeight) * 0.15 // 15% of image
      const halfCrop = cropSize / 2

      // Calculate crop position in original image coordinates
      const cropX = Math.max(0, Math.min(img.naturalWidth - cropSize, (clickX * scaleX) - halfCrop))
      const cropY = Math.max(0, Math.min(img.naturalHeight - cropSize, (clickY * scaleY) - halfCrop))

      // Create canvas and crop the image
      const canvas = document.createElement("canvas")
      canvas.width = cropSize
      canvas.height = cropSize
      const ctx = canvas.getContext("2d")
      
      if (!ctx) throw new Error("Canvas context not available")

      ctx.drawImage(
        img,
        cropX, cropY, cropSize, cropSize,
        0, 0, cropSize, cropSize
      )

      const croppedBase64 = canvas.toDataURL("image/png")

      // Send to API for analysis
      const response = await fetch("/api/analyze-symbol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: croppedBase64 }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "분석 실패")
      }

      const result = await response.json()

      if (result.success && result.symbolFound) {
        // Calculate percentage position for display
        const percentX = (clickX / rect.width) * 100
        const percentY = (clickY / rect.height) * 100

        const newSymbol: AnalyzedSymbol = {
          id: `symbol_${Date.now()}`,
          x: percentX,
          y: percentY,
          nameKorean: result.nameKorean,
          nameEnglish: result.nameEnglish,
          category: result.category,
          connectionType: result.connectionType,
          description: result.description,
          confidence: result.confidence,
          isMatchedFromDatabase: result.isMatchedFromDatabase,
          imageUrl: result.imageUrl,
        }

        setAnalyzedSymbols(prev => [...prev, newSymbol])
        setSelectedSymbol(newSymbol)
      } else {
        // Show dialog with "no symbol found" message
        setSelectedSymbol({
          id: "not_found",
          x: (clickX / rect.width) * 100,
          y: (clickY / rect.height) * 100,
          nameKorean: result.nameKorean || "심볼 없음",
          nameEnglish: result.nameEnglish || "No symbol",
          category: result.category || "N/A",
          connectionType: result.connectionType || "N/A",
          description: result.description || "이 위치에서 명확한 P&ID 심볼을 찾지 못했습니다.",
          confidence: result.confidence || 0,
        })
      }
    } catch (error) {
      console.error("Analysis error:", error)
      alert(`분석 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`)
    } finally {
      setIsAnalyzing(false)
      setAnalyzePosition(null)
    }
  }, [imageUrl])

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || e.ctrlKey || isAnalyzing) return

    // 기존 마커들 지우기
    setAnalyzedSymbols([])
    setSelectedSymbol(null)

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = (e.clientX - rect.left) / zoom
    const clickY = (e.clientY - rect.top) / zoom

    cropAndAnalyze(clickX, clickY, {
      ...rect,
      width: rect.width / zoom,
      height: rect.height / zoom,
    } as DOMRect)
  }, [isDragging, isAnalyzing, zoom, cropAndAnalyze])

  const handleSymbolClick = useCallback((symbol: AnalyzedSymbol) => {
    setSelectedSymbol(symbol)
  }, [])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "border-green-500 bg-green-500"
    if (confidence >= 70) return "border-blue-500 bg-blue-500"
    if (confidence >= 50) return "border-yellow-500 bg-yellow-500"
    return "border-red-500 bg-red-500"
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MousePointer2 className="h-3 w-3" />
              심볼 클릭 분석
            </Badge>
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
        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            도면에서 알고 싶은 심볼을 클릭하세요. GPT가 해당 심볼을 분석하여 설명해 드립니다.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Ctrl + 드래그로 이동, Ctrl + 스크롤로 확대/축소
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div 
        className="relative border rounded-lg overflow-hidden bg-muted/30"
        style={{ height: "600px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          ref={imageRef}
          className="relative w-full h-full cursor-crosshair"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
          onClick={handleImageClick}
        >
          <Image
            src={imageUrl}
            alt="P&ID Drawing"
            fill
            className="object-contain pointer-events-none"
            unoptimized
          />
          
          {/* Analyzed symbol markers */}
          {analyzedSymbols.map((symbol, index) => (
            <button
              key={symbol.id}
              className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110 ${getConfidenceColor(symbol.confidence)}`}
              style={{
                left: `${symbol.x}%`,
                top: `${symbol.y}%`,
              }}
              onClick={(e) => {
                e.stopPropagation()
                handleSymbolClick(symbol)
              }}
              title={`${symbol.nameKorean} (${symbol.confidence}%)`}
            >
              {index + 1}
            </button>
          ))}

          {/* Loading indicator */}
          {isAnalyzing && analyzePosition && (
            <div
              className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center animate-pulse"
              style={{
                left: `${(analyzePosition.x / (imageRef.current?.clientWidth || 1)) * 100 * zoom}%`,
                top: `${(analyzePosition.y / (imageRef.current?.clientHeight || 1)) * 100 * zoom}%`,
              }}
            >
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
          )}
        </div>

        {/* Global loading overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center pointer-events-none">
            <div className="bg-background border rounded-lg p-4 flex items-center gap-3 shadow-lg">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>심볼 분석 중...</span>
            </div>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSymbol} onOpenChange={(open) => !open && setSelectedSymbol(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>심볼 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedSymbol && (
            <div className="space-y-4">
              {/* Symbol Image */}
              {selectedSymbol.imageUrl && (
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-white">
                    <Image
                      src={selectedSymbol.imageUrl}
                      alt={selectedSymbol.nameKorean}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {/* Symbol Name */}
              <div>
                <p className="text-sm text-muted-foreground">심볼 이름</p>
                <p className="font-medium text-lg">{selectedSymbol.nameKorean}</p>
                <p className="text-sm text-muted-foreground">{selectedSymbol.nameEnglish}</p>
              </div>

              {/* Category & Connection Type */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{selectedSymbol.category}</Badge>
                {selectedSymbol.connectionType !== "N/A" && (
                  <Badge variant="outline">{selectedSymbol.connectionType}</Badge>
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  설명
                  {selectedSymbol.isMatchedFromDatabase && (
                    <Badge variant="secondary" className="text-xs">DB 매칭</Badge>
                  )}
                </p>
                <p className="text-sm bg-muted/50 p-3 rounded-lg">{selectedSymbol.description}</p>
              </div>

              {/* Connection Type Explanation */}
              {selectedSymbol.connectionType !== "N/A" && (
                <div>
                  <p className="text-sm text-muted-foreground">연결 방식</p>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <Badge className="mb-2">{selectedSymbol.connectionType}</Badge>
                    <p className="text-sm">
                      {selectedSymbol.connectionType === "Butt Weld" && "맞대기 용접 - 파이프 끝단을 맞대고 용접합니다. 고압, 고온 배관에 주로 사용됩니다."}
                      {selectedSymbol.connectionType === "Socket Weld" && "소켓 용접 - 파이프를 소켓에 삽입 후 용접합니다. 소구경 배관(2인치 이하)에 주로 사용됩니다."}
                      {selectedSymbol.connectionType === "Threaded" && "나사 연결 - 암/수 나사로 체결합니다. 저압 유틸리티 배관에 주로 사용됩니다."}
                      {selectedSymbol.connectionType === "Flanged" && "플랜지 연결 - 볼트로 체결합니다. 분해/조립이 필요한 곳에 사용됩니다."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
