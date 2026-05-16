"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  getTaskById,
  markInProgress,
  submitTask,
  type WorkTaskDetail,
} from "@/lib/tasks";

const STATUS_LABEL: Record<WorkTaskDetail["status"], { label: string; bg: string }> = {
  waiting: { label: "대기", bg: "bg-gray-500" },
  in_progress: { label: "진행 중", bg: "bg-blue-600" },
  submitted: { label: "검토 대기 중", bg: "bg-emerald-600" },
  rework: { label: "재작업 필요", bg: "bg-red-500" },
  approved: { label: "완료", bg: "bg-green-600" },
};

function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null;
  const remainingMs = new Date(deadline).getTime() - Date.now();
  if (remainingMs <= 0) return "마감 지남";
  const mins = Math.floor(remainingMs / 60000);
  if (mins < 60) return `${mins}분 남음`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 남음`;
  return `${Math.floor(hours / 24)}일 남음`;
}

function WorkPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const [task, setTask] = useState<WorkTaskDetail | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) {
        router.replace("/");
        return;
      }
      setUserId(u.id);

      if (!taskId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const t = await getTaskById(taskId);
      if (!t) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setTask(t);
      setChecklist(Object.fromEntries(t.materials.map((m) => [m.key, false])));
      setLoading(false);
    })();
  }, [router, taskId]);

  const toggleItem = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    if (!task) return;
    if (task.status === "waiting") {
      await markInProgress(task.id);
    }
    router.push("/home");
  };

  const handleComplete = async () => {
    if (!task || !userId) return;
    setSubmitting(true);
    const ok = await submitTask(task.id, userId);
    setSubmitting(false);
    if (!ok) {
      alert("완료 신청에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    router.push("/home");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center">
        <p className="text-sm text-gray-500">작업 화면 불러오는 중…</p>
      </div>
    );
  }

  if (notFound || !task) {
    return (
      <div className="min-h-screen bg-[#EEF2FF] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-gray-700">작업을 찾을 수 없습니다.</p>
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="px-5 py-2 bg-[#1A3BAE] text-white text-sm font-semibold rounded-lg"
        >
          홈으로
        </button>
      </div>
    );
  }

  const statusConfig = STATUS_LABEL[task.status];
  const drawingLabel = task.drawing?.code ?? "도면 미지정";
  const timeRemaining = formatDeadline(task.deadline);
  const isRework = task.status === "rework";

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      <header className="bg-[#EEF2FF] px-4 pt-5 pb-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="뒤로"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-extrabold text-gray-900 flex-1 truncate">
          {task.title}
        </h1>
      </header>

      <div className="bg-[#EEF2FF] px-4 pb-3 flex items-center gap-2 overflow-x-auto">
        <span className={`${statusConfig.bg} text-white text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0`}>
          {statusConfig.label}
        </span>
        <span className="border border-gray-300 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0 bg-white">
          {drawingLabel}
        </span>
        {task.zone && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs text-gray-600">{task.zone}</span>
          </div>
        )}
        {timeRemaining && (
          <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs font-bold text-red-500">{timeRemaining}</span>
          </div>
        )}
      </div>

      {task.feedback && (
        <div className="mx-4 mb-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed">
          <p className="text-xs font-bold text-red-600 mb-1">반려 사유</p>
          <span className="font-semibold text-gray-900">{task.feedback.author}:</span>{" "}
          {task.feedback.message}
        </div>
      )}

      <main className="flex-1 overflow-y-auto pb-28">
        <DrawingViewer task={task} isRework={isRework} />

        <div className="px-4 pt-4 flex flex-col gap-3">
          {task.materials.length > 0 && (
            <MaterialsCard
              materials={task.materials}
              checklist={checklist}
              onToggle={toggleItem}
            />
          )}

          {task.caution_title && (
            <CautionCard
              title={task.caution_title}
              subtitle={task.caution_subtitle ?? "주의사항"}
              isRework={isRework}
            />
          )}

          {task.details && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-bold text-gray-500 mb-2">작업 내용 / 주의사항</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{task.details}</p>
            </div>
          )}

          {task.estimated_minutes && (
            <div className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm text-gray-600">예상 작업 시간</span>
              </div>
              <span className="text-base font-extrabold text-blue-600">
                {task.estimated_minutes} min
              </span>
            </div>
          )}
        </div>
      </main>

      <BottomActions
        onSave={handleSave}
        onComplete={handleComplete}
        disabled={submitting}
      />
    </div>
  );
}

interface SymbolInfo {
  name_ko?: string;
  name_en?: string;
  category?: string;
  connection_type?: string;
  description?: string;
  size_hint?: string;
  error?: string;
}

function DrawingViewer({ task, isRework }: { task: WorkTaskDetail; isRework: boolean }) {
  const tapColor = isRework ? "bg-red-500" : "bg-blue-600";
  const [showZoom, setShowZoom] = useState(false);
  const [scale, setScale] = useState(1);
  const [tapPoint, setTapPoint] = useState<{ x: number; y: number } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [symbolInfo, setSymbolInfo] = useState<SymbolInfo | null>(null);

  const hasImage = !!task.drawing?.file_url;

  const resetAnalysis = () => {
    setTapPoint(null);
    setSymbolInfo(null);
    setAnalyzing(false);
  };

  const handleClose = () => {
    setShowZoom(false);
    setScale(1);
    resetAnalysis();
  };

  const handleImageTap = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!task.drawing?.file_url) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTapPoint({ x, y });
    setSymbolInfo(null);
    setAnalyzing(true);

    try {
      const res = await fetch("/api/analyze-symbol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: task.drawing.file_url, x, y }),
      });
      const data: SymbolInfo = await res.json();
      setSymbolInfo(data);
    } catch {
      setSymbolInfo({ error: "분석 중 오류가 발생했습니다" });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      {/* 썸네일 뷰 */}
      <div
        className={`relative bg-[#1E2A3A] w-full ${hasImage ? "cursor-pointer" : ""}`}
        style={{ height: "300px" }}
        onClick={hasImage ? () => setShowZoom(true) : undefined}
      >
        {hasImage ? (
          <>
            <img
              src={task.drawing!.file_url!}
              alt={task.drawing!.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span className="text-white text-xs font-semibold">탭하여 AI 심볼 분석</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/50 rounded-lg px-3 py-1">
              <span className="text-white text-xs font-semibold">{task.drawing!.title}</span>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border border-dashed border-gray-500 w-4/5 h-4/5 relative flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" fill="none">
                  <line x1="40" y1="80" x2="160" y2="80" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="160" y1="80" x2="160" y2="40" stroke="#9CA3AF" strokeWidth="2" />
                  <rect x="150" y="32" width="20" height="16" stroke={isRework ? "#EF4444" : "#9CA3AF"} strokeWidth="2" fill="none" />
                  <line x1="160" y1="80" x2="260" y2="80" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="220" y1="80" x2="220" y2="140" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="180" y1="140" x2="260" y2="140" stroke="#9CA3AF" strokeWidth="2" />
                </svg>
                <TapPoint tapColor={tapColor} />
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="text-gray-400 text-xs">{task.drawing?.title ?? "도면 없음"}</span>
            </div>
          </>
        )}
      </div>

      {/* 풀스크린 줌 모달 */}
      {showZoom && hasImage && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center gap-3 px-4 py-3 bg-black/80 flex-shrink-0">
            <button type="button" onClick={handleClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <span className="text-white text-sm font-semibold flex-1 truncate">{task.drawing!.title}</span>
            <div className="flex gap-2 flex-shrink-0">
              <button type="button" onClick={() => { setScale((s) => Math.min(s + 0.5, 3)); resetAnalysis(); }} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg">+</button>
              <button type="button" onClick={() => { setScale((s) => Math.max(s - 0.5, 1)); resetAnalysis(); }} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg">−</button>
              {scale > 1 && (
                <button type="button" onClick={() => { setScale(1); resetAnalysis(); }} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-semibold">↺</button>
              )}
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className="flex-1 overflow-auto" style={{ cursor: "crosshair" }}>
            <div
              className="relative"
              style={{ width: `${scale * 100}%` }}
              onClick={handleImageTap}
            >
              <img
                src={task.drawing!.file_url!}
                alt={task.drawing!.title}
                className="w-full h-auto block select-none"
                draggable={false}
              />

              {/* 탭 포인트 인디케이터 */}
              {tapPoint && (
                <div
                  className="absolute pointer-events-none z-10"
                  style={{ left: `${tapPoint.x}%`, top: `${tapPoint.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  {analyzing ? (
                    <div className="w-11 h-11 rounded-full bg-blue-500/80 flex items-center justify-center shadow-lg">
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full border-2 border-blue-400 bg-blue-500/30 flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-blue-400 rounded-full" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 힌트 텍스트 (탭 전) */}
            {!tapPoint && (
              <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white/80 text-xs">심볼을 탭하면 AI가 분석합니다</span>
                </div>
              </div>
            )}
          </div>

          {/* 심볼 정보 팝업 */}
          {symbolInfo && (
            <div className="flex-shrink-0 bg-white rounded-t-3xl shadow-2xl max-h-[55vh] overflow-y-auto">
              <div className="px-5 pt-5 pb-8">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    {symbolInfo.error ? (
                      <p className="text-sm text-gray-500">{symbolInfo.error}</p>
                    ) : (
                      <>
                        <h3 className="text-xl font-extrabold text-gray-900 leading-tight">{symbolInfo.name_ko}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">{symbolInfo.name_en}</p>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSymbolInfo(null); setTapPoint(null); }}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {!symbolInfo.error && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {symbolInfo.category && (
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{symbolInfo.category}</span>
                      )}
                      {symbolInfo.connection_type && (
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{symbolInfo.connection_type}</span>
                      )}
                      {symbolInfo.size_hint && (
                        <span className="bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">{symbolInfo.size_hint}</span>
                      )}
                    </div>
                    {symbolInfo.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">{symbolInfo.description}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function TapPoint({ tapColor }: { tapColor: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2">
      <div className={`w-12 h-12 ${tapColor} rounded-full flex items-center justify-center shadow-lg`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="8" y2="18" />
          <line x1="12" y1="6" x2="12" y2="18" />
          <line x1="16" y1="6" x2="16" y2="18" />
          <line x1="5" y1="9" x2="19" y2="9" />
          <line x1="5" y1="15" x2="19" y2="15" />
        </svg>
      </div>
      <span className={`${tapColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
        탭해서 설명 보기
      </span>
    </div>
  );
}

function MaterialsCard({
  materials,
  checklist,
  onToggle,
}: {
  materials: { key: string; label: string }[];
  checklist: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3BAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        </svg>
        <span className="font-bold text-gray-900">준비물</span>
      </div>
      <div className="flex flex-col gap-2">
        {materials.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 text-left hover:bg-gray-100 transition-colors"
          >
            <ChecklistBox checked={!!checklist[key]} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChecklistBox({ checked }: { checked: boolean }) {
  return (
    <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${checked ? "bg-blue-600 border-blue-600" : "border-blue-400 bg-white"}`}>
      {checked && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  );
}

function CautionCard({
  title,
  subtitle,
  isRework,
}: {
  title: string;
  subtitle: string;
  isRework: boolean;
}) {
  const boxClass = isRework
    ? "bg-red-50 border-red-200"
    : "bg-orange-50 border-orange-200";
  const iconClass = isRework ? "bg-red-500" : "bg-orange-500";
  const labelClass = isRework ? "text-red-500" : "text-orange-500";

  return (
    <div className={`${boxClass} border rounded-2xl p-4 flex items-center gap-4`}>
      <div className={`w-11 h-11 ${iconClass} rounded-full flex items-center justify-center flex-shrink-0`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div>
        <p className={`text-xs font-medium ${labelClass} mb-0.5`}>{subtitle}</p>
        <p className="text-base font-extrabold text-gray-900">{title}</p>
      </div>
    </div>
  );
}

function BottomActions({
  onSave,
  onComplete,
  disabled,
}: {
  onSave: () => void;
  onComplete: () => void;
  disabled: boolean;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto w-full bg-[#EEF2FF] px-4 py-4 flex gap-3">
      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="flex-none border border-gray-300 bg-white text-gray-700 font-semibold text-sm px-5 py-4 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        임시 저장
      </button>
      <button
        type="button"
        onClick={onComplete}
        disabled={disabled}
        className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:bg-gray-400"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        {disabled ? "신청 중..." : "작업 완료 신청"}
      </button>
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center">
          <p className="text-sm text-gray-500">작업 화면 불러오는 중…</p>
        </div>
      }
    >
      <WorkPageContent />
    </Suspense>
  );
}
