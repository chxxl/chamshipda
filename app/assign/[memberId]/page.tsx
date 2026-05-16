"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  createTask,
  getDrawings,
  getUserById,
  type DrawingSummary,
} from "@/lib/tasks";

interface Recipient {
  id: string;
  name: string;
  initial: string;
  affiliation: string | null;
}

export default function AssignPage() {
  const router = useRouter();
  const params = useParams<{ memberId: string }>();

  const [managerId, setManagerId] = useState<string | null>(null);
  const [member, setMember] = useState<Recipient | null>(null);
  const [drawings, setDrawings] = useState<DrawingSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [drawingId, setDrawingId] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) {
        router.replace("/");
        return;
      }
      if (u.role !== "manager") {
        router.replace("/home");
        return;
      }
      setManagerId(u.id);

      const [m, ds] = await Promise.all([
        getUserById(params.memberId),
        getDrawings(),
      ]);
      if (!m) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setMember(m);
      setDrawings(ds);
      setLoading(false);
    })();
  }, [router, params.memberId]);

  const selectedDrawing = useMemo(
    () => drawings.find((d) => d.id === drawingId) ?? null,
    [drawings, drawingId]
  );

  const isValid =
    taskName.trim().length > 0 && !!selectedDrawing && !!member && !!managerId;

  const handleSubmit = async () => {
    if (!isValid || !member || !managerId || !selectedDrawing) return;
    setSubmitting(true);
    const ok = await createTask({
      title: taskName.trim(),
      assigneeId: member.id,
      assignedBy: managerId,
      drawingId: selectedDrawing.id,
      details: details.trim() || undefined,
    });
    setSubmitting(false);
    if (!ok) {
      alert("작업 부여에 실패했습니다.");
      return;
    }
    alert(`${member.name}님에게 "${taskName.trim()}" 작업이 부여되었습니다.`);
    router.push("/team");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-sm text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  if (notFound || !member) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-gray-700">팀원을 찾을 수 없습니다.</p>
        <button
          type="button"
          onClick={() => router.push("/team")}
          className="px-5 py-2 bg-[#0052CC] text-white text-sm font-semibold rounded-lg"
        >
          팀원 목록으로
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0E1726] flex flex-col"
      style={{ fontFamily: "var(--font-hanken), sans-serif" }}
    >
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

      <main className="flex-1 pt-[56px] pb-[100px] max-w-screen-sm mx-auto w-full">
        <section className="bg-white border-b border-[#E2E8F0] p-4 flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#475569]">받는 사람</label>
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-[#F1F5F9] flex items-center justify-center">
              <span className="text-[14px] font-medium text-[#475569]">{member.initial}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-medium text-[#0E1726]">{member.name}</span>
              {member.affiliation && (
                <span className="inline-flex items-center px-2 py-0.5 h-[20px] text-[11px] font-medium text-[#475569] bg-[#F1F5F9] rounded-full">
                  {member.affiliation}
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="p-4 space-y-6">
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
                      {selectedDrawing.title}
                    </div>
                  </>
                ) : (
                  <div className="text-[14px] text-[#94A3B8]">
                    {drawings.length === 0 ? "등록된 도면이 없습니다" : "도면을 선택하세요"}
                  </div>
                )}
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#94A3B8]">chevron_right</span>
            </button>
          </div>

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

          <div className="flex items-start gap-2 bg-[#FEF3C7] p-3 rounded-lg border border-[#FDE68A]">
            <span
              className="material-symbols-outlined text-[20px] text-[#B45309] mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            <p className="text-[14px] leading-tight text-[#0E1726]">
              부여 시 {member.name}님의 &apos;할 일&apos; 목록에 추가됩니다.
            </p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] p-4 flex gap-3 z-50 max-w-screen-sm mx-auto">
        <button
          onClick={() => router.back()}
          disabled={submitting}
          className="w-[40%] h-[52px] bg-white border-[1.5px] border-[#CBD5E1] rounded-lg text-[#475569] font-medium active:bg-[#F1F5F9] transition-colors disabled:opacity-50"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="w-[60%] h-[52px] bg-[#0052CC] rounded-lg text-white font-bold active:opacity-90 transition-opacity disabled:bg-[#94A3B8] disabled:cursor-not-allowed"
        >
          {submitting ? "부여 중..." : "부여하기"}
        </button>
      </footer>

      {pickerOpen && (
        <DrawingPicker
          drawings={drawings}
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
  drawings,
  selectedId,
  onPick,
  onClose,
}: {
  drawings: DrawingSummary[];
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
          {drawings.length === 0 ? (
            <li className="p-6 text-center text-[#94A3B8] text-[14px]">
              등록된 도면이 없습니다
            </li>
          ) : (
            drawings.map((d) => {
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
                      <div className="text-[13px] text-[#475569] truncate">{d.title}</div>
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
            })
          )}
        </ul>
      </div>
    </div>
  );
}
