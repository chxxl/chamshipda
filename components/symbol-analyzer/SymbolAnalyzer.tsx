"use client";

import { useCallback, useRef, useState } from "react";

interface AnalyzedSymbol {
  id: string;
  x: number;
  y: number;
  nameKorean: string;
  nameEnglish: string;
  category: string;
  connectionType: string;
  description: string;
  confidence: number;
  isMatchedFromDatabase?: boolean;
  imageUrl?: string;
}

interface SymbolAnalyzerProps {
  imageUrl: string;
}

const CONNECTION_HELP: Record<string, string> = {
  "Butt Weld": "맞대기 용접 - 파이프 끝단을 맞대고 용접합니다. 고압·고온 배관에 주로 사용됩니다.",
  "Socket Weld": "소켓 용접 - 파이프를 소켓에 삽입 후 용접합니다. 소구경 배관(2인치 이하)에 주로 사용됩니다.",
  Threaded: "나사 연결 - 암·수 나사로 체결합니다. 저압 유틸리티 배관에 주로 사용됩니다.",
  Flanged: "플랜지 연결 - 볼트로 체결합니다. 분해·조립이 필요한 곳에 사용됩니다.",
};

function confidenceColor(confidence: number): string {
  if (confidence >= 90) return "bg-green-500";
  if (confidence >= 70) return "bg-blue-500";
  if (confidence >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

export function SymbolAnalyzer({ imageUrl }: SymbolAnalyzerProps) {
  const [analyzedSymbols, setAnalyzedSymbols] = useState<AnalyzedSymbol[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<AnalyzedSymbol | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const cropAndAnalyze = useCallback(
    async (clickX: number, clickY: number, rect: DOMRect) => {
      setIsAnalyzing(true);
      try {
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("이미지 로드 실패"));
          img.src = imageUrl;
        });

        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;
        const cropSize = Math.min(img.naturalWidth, img.naturalHeight) * 0.15;
        const halfCrop = cropSize / 2;
        const cropX = Math.max(0, Math.min(img.naturalWidth - cropSize, clickX * scaleX - halfCrop));
        const cropY = Math.max(0, Math.min(img.naturalHeight - cropSize, clickY * scaleY - halfCrop));

        const canvas = document.createElement("canvas");
        canvas.width = cropSize;
        canvas.height = cropSize;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context not available");
        ctx.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, cropSize, cropSize);
        const croppedBase64 = canvas.toDataURL("image/png");

        const response = await fetch("/api/analyze-symbol", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: croppedBase64 }),
        });
        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.error || "분석 실패");
        }
        const result = await response.json();

        const percentX = (clickX / rect.width) * 100;
        const percentY = (clickY / rect.height) * 100;

        if (result.success && result.symbolFound) {
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
          };
          setAnalyzedSymbols((prev) => [...prev, newSymbol]);
          setSelectedSymbol(newSymbol);
        } else {
          setSelectedSymbol({
            id: "not_found",
            x: percentX,
            y: percentY,
            nameKorean: result.nameKorean || "심볼 없음",
            nameEnglish: result.nameEnglish || "No symbol",
            category: result.category || "N/A",
            connectionType: result.connectionType || "N/A",
            description:
              result.description || "이 위치에서 명확한 P&ID 심볼을 찾지 못했습니다.",
            confidence: result.confidence || 0,
          });
        }
      } catch (error) {
        console.error("Analysis error:", error);
        alert(`분석 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [imageUrl]
  );

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isAnalyzing) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      setAnalyzedSymbols([]);
      setSelectedSymbol(null);
      cropAndAnalyze(clickX, clickY, rect);
    },
    [isAnalyzing, cropAndAnalyze]
  );

  return (
    <div className="relative w-full h-full">
      <div
        ref={imageRef}
        className="relative w-full h-full cursor-crosshair select-none"
        onClick={handleImageClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={imageUrl}
          alt="P&ID 도면"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          crossOrigin="anonymous"
        />

        {analyzedSymbols.map((symbol, index) => (
          <button
            key={symbol.id}
            className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110 ${confidenceColor(symbol.confidence)}`}
            style={{ left: `${symbol.x}%`, top: `${symbol.y}%` }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSymbol(symbol);
            }}
            title={`${symbol.nameKorean} (${symbol.confidence}%)`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Instruction badge */}
      <div className="absolute top-2 left-2 right-2 flex justify-center pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-medium">
          기호를 클릭하면 AI가 분석해 드립니다
        </div>
      </div>

      {/* Loading overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
            <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-700">심볼 분석 중...</span>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedSymbol && (
        <SymbolDetailModal
          symbol={selectedSymbol}
          onClose={() => setSelectedSymbol(null)}
        />
      )}
    </div>
  );
}

function SymbolDetailModal({
  symbol,
  onClose,
}: {
  symbol: AnalyzedSymbol;
  onClose: () => void;
}) {
  const connectionHelp = CONNECTION_HELP[symbol.connectionType];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white w-full max-w-md rounded-2xl flex flex-col max-h-[85vh] overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">심볼 상세 정보</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {symbol.imageUrl && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={symbol.imageUrl}
                  alt={symbol.nameKorean}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500">심볼 이름</p>
            <p className="font-bold text-lg text-gray-900">{symbol.nameKorean}</p>
            <p className="text-sm text-gray-500">{symbol.nameEnglish}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {symbol.category}
            </span>
            {symbol.connectionType !== "N/A" && (
              <span className="border border-gray-300 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {symbol.connectionType}
              </span>
            )}
            {symbol.confidence > 0 && (
              <span className={`${confidenceColor(symbol.confidence)} text-white text-xs font-medium px-2.5 py-1 rounded-full`}>
                신뢰도 {symbol.confidence}%
              </span>
            )}
          </div>

          <div>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              설명
              {symbol.isMatchedFromDatabase && (
                <span className="bg-blue-100 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                  DB 매칭
                </span>
              )}
            </p>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mt-1 leading-relaxed">
              {symbol.description}
            </p>
          </div>

          {connectionHelp && (
            <div>
              <p className="text-xs text-gray-500">연결 방식 설명</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mt-1 leading-relaxed">
                {connectionHelp}
              </p>
            </div>
          )}
        </div>

        <footer className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-colors"
          >
            닫기
          </button>
        </footer>
      </div>
    </div>
  );
}
