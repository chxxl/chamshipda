"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Member {
  id: string;
  name: string;
  initial: string;
  role: string;
}

const MEMBERS: Record<string, Member> = {
  "1": { id: "1", name: "최신입", initial: "최", role: "협력업체 · 배관" },
  "2": { id: "2", name: "이용접", initial: "이", role: "협력업체 · 용접" },
  "3": { id: "3", name: "김작업", initial: "김", role: "협력업체 · 배관" },
  "4": { id: "4", name: "정반장", initial: "정", role: "협력업체 · 배관" },
  "5": { id: "5", name: "박경호", initial: "박", role: "협력업체 · 배관" },
};

interface Drawing {
  id: string;
  code: string;
  name: string;
}

const DRAWINGS: Drawing[] = [
  { id: "p101", code: "P-101 Rev.D", name: "메인 배관 설치도" },
  { id: "p102", code: "P-102 Rev.A", name: "보조 배관 라인" },
  { id: "m305", code: "M-305 Rev.C", name: "티 분기관 설치도" },
  { id: "s901", code: "S-901 Rev.B", name: "도색·표면 처리 도면" },
];

export default function AssignPage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();
  const member = MEMBERS[params.memberId] ?? MEMBERS["3"];

  const [taskName, setTaskName] = useState("");
  const [drawingId, setDrawingId] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const selectedDrawing = useMemo(
    () => DRAWINGS.find((d) => d.id === drawingId) ?? null,
    [drawingId]
  );

  const isValid = taskName.trim().length > 0 && !!selectedDrawing;

  const handleSubmit = () => {
    if (!isValid) return;
    alert(`${member.name}님에게 "${taskName}" 작업이 부여되었습니다.`);
    router.push("/team");
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0E1726] flex flex-col"
      style={{ fontFamily: "var(--font-hanken), sans-serif" }}
    >
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-white border-b border-[#E2E8F0] flex items-center px-4 z-50 max-w-screen-sm mx-auto">
        <button
          onClick={() => router.back()}
          aria-label="뒤로 가기"
          className="flex items-center justify-center active:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-[28px] text-[#475569]">chevron_left</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-[18px] font-bold text-[#0E1726]">작업 부여</h1>
        </div>
        <div className="w-[28px]" />
      </header>

      {/* Main */}
      <main className="flex-1 pt-[56px] pb-[100px] max-w-screen-sm mx-auto w-full">
        {/* Recipient */}
        <section className="bg-white border-b border-[#E2E8F0] p-4 flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#475569]">받는 사람</label>
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-[#F1F5F9] flex items-center justify-center">
              <span className="text-[14px] font-medium text-[#475569]">{member.initial}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-medium text-[#0E1726]">{member.name}</span>
              <span className="inline-flex items-center px-2 py-0.5 h-[20px] text-[11px] font-medium text-[#475569] bg-[#F1F5F9] rounded-full">
                {member.role}
              </span>
            </div>
          </div>
        </section>

        {/* Form */}
        <div className="p-4 space-y-6">
          {/* 작업명 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#475569]">
              작업명 <span className="text-[#ba1a1a] font-bold">*</span>
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="예: V-301 게이트밸브 설치"
              className="h-[52px] w-full px-4 bg-white border-[1.5px] border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#003d9b] focus:border-[#003d9b] outline-none text-[16px] placeholder:text-[#94A3B8]"
            />
          </div>

          {/* 도면 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#475569]">
              도면 <span className="text-[#ba1a1a] font-bold">*</span>
            </label>
            <button
              onClick={() => setPickerOpen(true)}
              className="w-full h-[80px] bg-white border-[1.5px] border-[#CBD5E1] rounded-lg p-4 flex items-center gap-4 active:bg-[#f0f3ff] transition-colors text-left"
            >
              <div className="w-[48px] h-[48px] rounded bg-[#1E293B] flex-shrink-0 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[24px]">architecture</span>
              </div>
              <div className="flex-1 min-w-0">
                {selectedDrawing ? (
                  <>
                    <div
                      className="text-[15px] font-semibold text-[#0E1726] truncate"
                      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      {selectedDrawing.code}
                    </div>
                    <div className="text-[13px] text-[#475569] truncate">
                      {selectedDrawing.name}
                    </div>
                  </>
                ) : (
                  <div className="text-[14px] text-[#94A3B8]">도면을 선택하세요</div>
                )}
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#94A3B8]">
                chevron_right
              </span>
            </button>
          </div>

          {/* 작업 내용 / 주의사항 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#475569]">
              작업 내용 / 주의사항 (선택)
            </label>
            <div className="relative">
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value.slice(0, 300))}
                placeholder="예: 오늘 18시까지 마감, 긴급&#10;가스켓 방향 주의해서 작업해주세요"
                className="w-full h-[140px] px-4 py-3 bg-white border-[1.5px] border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#003d9b] focus:border-[#003d9b] outline-none text-[16px] placeholder:text-[#94A3B8] resize-none"
              />
              <span className="absolute bottom-3 right-4 text-[12px] text-[#94A3B8]">
                {details.length} / 300자
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 bg-[#FEF3C7] p-3 rounded-lg border border-[#FDE68A]">
            <span
              className="material-symbols-outlined text-[20px] text-[#B45309] mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            <p className="text-[14px] leading-tight text-[#0E1726]">
              부여 시 {member.name}님께 즉시 알림이 발송되며, &apos;할 일&apos; 목록에
              추가됩니다.
            </p>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] p-4 flex gap-3 z-50 max-w-screen-sm mx-auto">
        <button
          onClick={() => router.back()}
          className="w-[40%] h-[52px] bg-white border-[1.5px] border-[#CBD5E1] rounded-lg text-[#475569] font-medium active:bg-[#F1F5F9] transition-colors"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-[60%] h-[52px] bg-[#0052CC] rounded-lg text-white font-bold active:opacity-90 transition-opacity disabled:bg-[#94A3B8] disabled:cursor-not-allowed"
        >
          부여하기
        </button>
      </footer>

      {pickerOpen && (
        <DrawingPicker
          selectedId={drawingId}
          onPick={(id) => {
            setDrawingId(id);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}

function DrawingPicker({
  selectedId,
  onPick,
  onClose,
}: {
  selectedId: string | null;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0E1726]/60"
        style={{ backdropFilter: "blur(2px)" }}
      />
      <div
        className="relative w-full max-w-screen-sm bg-white rounded-t-[20px] flex flex-col"
        style={{ maxHeight: "70vh", boxShadow: "0 -8px 24px rgba(0,0,0,0.15)" }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-[40px] h-[4px] bg-[#CBD5E1] rounded-full" />
        </div>
        <header className="flex items-center justify-between px-4 pb-3 border-b border-[#E2E8F0]">
          <h2 className="text-[18px] font-bold text-[#0E1726]">도면 선택</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-[28px] h-[28px] flex items-center justify-center text-[#475569]"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </header>
        <ul className="overflow-y-auto p-2">
          {DRAWINGS.map((d) => {
            const selected = d.id === selectedId;
            return (
              <li key={d.id}>
                <button
                  onClick={() => onPick(d.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    selected ? "bg-[#E6EFFF]" : "hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div className="w-[48px] h-[48px] rounded bg-[#1E293B] flex-shrink-0 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[24px]">architecture</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[15px] font-semibold text-[#0E1726] truncate"
                      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      {d.code}
                    </div>
                    <div className="text-[13px] text-[#475569] truncate">{d.name}</div>
                  </div>
                  {selected && (
                    <span
                      className="material-symbols-outlined text-[24px] text-[#0052cc]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
