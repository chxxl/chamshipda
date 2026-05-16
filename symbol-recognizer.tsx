"use client"

import { useState, useCallback } from "react"
import { Sparkles } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import { ClickToAnalyzeCanvas } from "@/components/click-to-analyze-canvas"

export function SymbolRecognizer() {
  const [drawingImage, setDrawingImage] = useState<string | null>(null)

  const clearDrawing = useCallback(() => {
    setDrawingImage(null)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">P&ID 도면 분석기</h1>
              <p className="text-sm text-muted-foreground">
                도면을 업로드하고 심볼을 클릭하면 AI가 분석합니다
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {drawingImage ? (
          <ClickToAnalyzeCanvas
            imageUrl={drawingImage}
            onClear={clearDrawing}
          />
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">P&ID 도면 업로드</h2>
              <p className="text-sm text-muted-foreground">
                도면을 업로드한 후 알고 싶은 심볼을 클릭하면 AI가 분석합니다
              </p>
            </div>

            <ImageUpload
              onImageUpload={setDrawingImage}
              uploadedImage={drawingImage}
              onClear={clearDrawing}
            />
          </div>
        )}
      </main>
    </div>
  )
}
