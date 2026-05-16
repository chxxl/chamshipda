"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  approveSubmission,
  formatRelativeTime,
  getPendingReviews,
  rejectSubmission,
  type PendingReview,
  type ReviewCardType,
} from "@/lib/tasks";

type FilterType = "all" | "urgent" | "rework" | "normal";

const FILTER_CONFIG: Record<
  FilterType,
  { label: string; activeBg: string; activeText: string; inactiveBg: string; inactiveText: string }
> = {
  all: {
    label: "전체",
    activeBg: "#0052cc",
    activeText: "#ffffff",
    inactiveBg: "#0052cc",
    inactiveText: "#ffffff",
  },
  urgent: {
    label: "긴급",
    activeBg: "#DC2626",
    activeText: "#ffffff",
    inactiveBg: "#FEE2E2",
    inactiveText: "#DC2626",
  },
  rework: {
    label: "재작업",
    activeBg: "#FF6B00",
    activeText: "#ffffff",
    inactiveBg: "#FFEDD5",
    inactiveText: "#FF6B00",
  },
  normal: {
    label: "일반",
    activeBg: "#475569",
    activeText: "#ffffff",
    inactiveBg: "#F1F5F9",
    inactiveText: "#475569",
  },
};

const STATUS_CHIP: Record<ReviewCardType, { label: string; bg: string; text: string; borderL: string }> = {
  urgent: { label: "긴급", bg: "#FEE2E2", text: "#DC2626", borderL: "#DC2626" },
  rework: { label: "재작업", bg: "#FFEDD5", text: "#FF6B00", borderL: "#FF6B00" },
  normal: { label: "신규 신청", bg: "#F1F5F9", text: "#475569", borderL: "transparent" },
};

export default function ReviewPage() {
  const router = useRouter();
  const [reviewerId, setReviewerId] = useState<string | null>(null);
  const [cards, setCards] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [rejectingCard, setRejectingCard] = useState<PendingReview | null>(null);
  const [viewingCard, setViewingCard] = useState<PendingReview | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

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
      setReviewerId(u.id);
      const list = await getPendingReviews();
      setCards(list);
      setLoading(false);
    })();
  }, [router]);

  const refresh = async () => {
    const list = await getPendingReviews();
    setCards(list);
  };

  const handleApprove = async (card: PendingReview) => {
    if (!reviewerId) return;
    setBusyId(card.submissionId);
    const ok = await approveSubmission(card.submissionId, reviewerId);
    if (!ok) {
      alert("승인 처리에 실패했습니다.");
      setBusyId(null);
      return;
    }
    setCards((prev) => prev.filter((c) => c.submissionId !== card.submissionId));
    setBusyId(null);
  };

  const handleRejectSubmit = async (
    card: PendingReview,
    reason: string,
    detail: string
  ) => {
    if (!reviewerId) return;
    setBusyId(card.submissionId);
    const ok = await rejectSubmission(card.submissionId, reviewerId, {
      reason,
      detail,
    });
    if (!ok) {
      alert("반려 처리에 실패했습니다.");
      setBusyId(null);
      return;
    }
    setCards((prev) => prev.filter((c) => c.submissionId !== card.submissionId));
    setBusyId(null);
    setRejectingCard(null);
  };

  const filteredCards = filter === "all" ? cards : cards.filter((c) => c.type === filter);

  const countByType: Record<FilterType, number> = {
    all: cards.length,
    urgent: cards.filter((c) => c.type === "urgent").length,
    rework: cards.filter((c) => c.type === "rework").length,
    normal: cards.filter((c) => c.type === "normal").length,
  };

  return (
    <div
      className="min-h-screen bg-white text-[#131c2b] pb-[100px]"
      style={{ fontFamily: "var(--font-hanken), sans-serif" }}
    >
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-white border-b border-[#c3c6d6] flex items-center justify-between px-4 z-50 max-w-screen-sm mx-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center"
            aria-label="뒤로 가기"
          >
            <span className="material-symbols-outlined text-[28px] text-[#0E1726]">chevron_left</span>
          </button>
          <h1 className="text-[18px] font-bold text-[#0E1726]">검토 대기</h1>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined text-[24px] text-[#434654]">notifications</span>
          <div className="absolute top-[2px] right-[2px] w-2 h-2 bg-[#ba1a1a] rounded-full border border-white" />
        </div>
      </header>

      <nav
        className="fixed top-[56px] left-0 right-0 h-[56px] bg-white flex items-center gap-2 px-4 z-40 max-w-screen-sm mx-auto overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {(Object.keys(FILTER_CONFIG) as FilterType[]).map((key) => {
          const cfg = FILTER_CONFIG[key];
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="flex-shrink-0 h-[36px] px-4 rounded-full text-[14px] font-medium flex items-center justify-center transition-colors"
              style={{
                backgroundColor: active ? cfg.activeBg : cfg.inactiveBg,
                color: active ? cfg.activeText : cfg.inactiveText,
              }}
            >
              {cfg.label} {countByType[key]}
            </button>
          );
        })}
      </nav>

      <main className="pt-[128px] px-4 space-y-4 max-w-screen-sm mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#94A3B8]">
            <p className="text-[14px]">불러오는 중...</p>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#94A3B8]">
            <span className="material-symbols-outlined text-[48px] mb-2">inbox</span>
            <p className="text-[14px]">검토 대기 항목이 없습니다</p>
          </div>
        ) : (
          filteredCards.map((card) => (
            <ReviewCardItem
              key={card.submissionId}
              card={card}
              disabled={busyId === card.submissionId}
              onReject={() => setRejectingCard(card)}
              onApprove={() => handleApprove(card)}
              onView={() => setViewingCard(card)}
            />
          ))
        )}
      </main>

      {rejectingCard && (
        <RejectModal
          card={rejectingCard}
          submitting={busyId === rejectingCard.submissionId}
          onClose={() => setRejectingCard(null)}
          onSubmit={(reason, detail) =>
            handleRejectSubmit(rejectingCard, reason, detail)
          }
        />
      )}

      {viewingCard && (
        <ViewerModal card={viewingCard} onClose={() => setViewingCard(null)} />
      )}

      <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[#E2E8F0] flex items-center px-2 z-50 max-w-screen-sm mx-auto">
        <BottomNavItem icon="home" label="홈" onClick={() => router.push("/home_admin")} />
        <BottomNavItem icon="group" label="팀원" onClick={() => router.push("/team")} />
        <BottomNavItem icon="description" label="도면" onClick={() => router.push("/drawing")} />
        <BottomNavItem icon="chat_bubble" label="메시지" badge={3} onClick={() => router.push("/message_admin")} />
      </nav>

      {/* Hide refresh helper */}
      <button
        type="button"
        onClick={refresh}
        aria-label="새로고침"
        className="hidden"
      />
    </div>
  );
}

function ReviewCardItem({
  card,
  disabled,
  onReject,
  onApprove,
  onView,
}: {
  card: PendingReview;
  disabled: boolean;
  onReject: () => void;
  onApprove: () => void;
  onView: () => void;
}) {
  const chip = STATUS_CHIP[card.type];
  const hasFeedback = !!card.previousFeedback;
  const feedbackBg = card.type === "urgent" ? "#FEE2E2" : "#e8eeff";

  return (
    <article
      className="bg-white rounded-xl border border-[#c3c6d6] p-5 shadow-sm"
      style={{
        borderLeftWidth: chip.borderL === "transparent" ? undefined : "3px",
        borderLeftColor: chip.borderL === "transparent" ? undefined : chip.borderL,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className="px-2 py-1 rounded text-[13px] font-medium"
          style={{ backgroundColor: chip.bg, color: chip.text }}
        >
          {chip.label}
        </span>
        <span className="text-[#434654] text-[13px]">
          {card.authorName} · {formatRelativeTime(card.submittedAt)}
        </span>
      </div>
      <h2 className="text-[18px] font-bold text-[#0E1726] mb-1 leading-6">{card.taskTitle}</h2>
      {card.drawingCode && (
        <p className="text-[#434654] text-[14px] mb-4">
          <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{card.drawingCode}</span>
        </p>
      )}

      {hasFeedback && card.previousFeedback && (
        <div
          className="p-3 rounded-lg mb-4"
          style={{ backgroundColor: feedbackBg }}
        >
          <p className="text-[#131c2b] text-[14px]">
            <span className="font-semibold">이전 반려 — {card.previousFeedback.author}:</span>{" "}
            {card.previousFeedback.message}
          </p>
        </div>
      )}

      <button
        onClick={onView}
        className="flex items-center gap-1 text-[#003d9b] font-medium text-[14px] mb-4"
      >
        <span className="material-symbols-outlined text-[16px]">image</span>
        도면 보기
      </button>

      <div className="flex gap-3">
        <button
          onClick={onReject}
          disabled={disabled}
          className="flex-1 h-12 border-[1.5px] border-[#DC2626] text-[#DC2626] rounded-lg font-semibold text-[16px] disabled:opacity-50"
        >
          반려
        </button>
        <button
          onClick={onApprove}
          disabled={disabled}
          className="flex-1 h-12 bg-[#16A34A] text-white rounded-lg font-semibold text-[16px] disabled:bg-gray-400"
        >
          {disabled ? "처리 중..." : "승인"}
        </button>
      </div>
    </article>
  );
}

function BottomNavItem({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: string;
  label: string;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-1/4 text-[#94A3B8] gap-1 relative"
    >
      <span className="material-symbols-outlined text-[22px]">{icon}</span>
      <span className="text-[12px] font-medium">{label}</span>
      {badge && (
        <div className="absolute top-[4px] right-[25%] bg-[#DC2626] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
          {badge}
        </div>
      )}
    </button>
  );
}

const REJECT_REASONS = [
  "시공 품질 불량",
  "도면과 불일치",
  "안전 기준 미달",
  "사진·증빙 부족",
];

function RejectModal({
  card,
  submitting,
  onClose,
  onSubmit,
}: {
  card: PendingReview;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (reason: string, detail: string) => void;
}) {
  const [selectedReason, setSelectedReason] = useState<string>(REJECT_REASONS[0]);
  const [detail, setDetail] = useState("");

  const canSubmit = detail.trim().length > 0 && !submitting;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0E1726]/60"
        style={{ backdropFilter: "blur(2px)" }}
      />

      <div
        className="relative w-full max-w-screen-sm bg-white rounded-t-[20px] flex flex-col"
        style={{
          height: "min(720px, 90vh)",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.15)",
          fontFamily: "var(--font-hanken), sans-serif",
        }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-[40px] h-[4px] bg-[#CBD5E1] rounded-full" />
        </div>

        <header className="flex items-center justify-between px-4 pb-4 border-b border-[#E2E8F0]">
          <div className="flex flex-col">
            <h1 className="text-[22px] font-bold text-[#DC2626] leading-tight">작업 반려</h1>
            <span className="text-[14px] text-[#475569] mt-0.5">{card.taskTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="w-[28px] h-[28px] flex items-center justify-center text-[#475569]"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>
        </header>

        <main
          className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          <section className="space-y-3">
            <label className="text-[14px] font-medium text-[#475569] block">반려 사유</label>
            <div className="space-y-2">
              {REJECT_REASONS.map((reason) => {
                const selected = selectedReason === reason;
                return (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full flex items-center justify-between h-[56px] px-4 rounded-lg border-[1.5px] transition-colors ${
                      selected
                        ? "border-[#0052cc] bg-[#E6EFFF]"
                        : "border-[#CBD5E1] bg-white"
                    }`}
                  >
                    <span className={`text-[15px] ${selected ? "font-semibold text-[#131c2b]" : "text-[#131c2b]"}`}>
                      {reason}
                    </span>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: selected ? "#0052cc" : "#CBD5E1",
                        fontVariationSettings: selected ? "'FILL' 1" : undefined,
                      }}
                    >
                      {selected ? "radio_button_checked" : "radio_button_unchecked"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-2">
            <label className="text-[14px] font-medium text-[#475569] block">
              상세 사유 <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value.slice(0, 200))}
                placeholder="무엇을 어떻게 수정해야 하는지 적어주세요"
                className="w-full h-[120px] p-4 text-[15px] border-[1.5px] border-[#CBD5E1] rounded-xl focus:border-[#0052cc] outline-none resize-none placeholder:text-[#94A3B8]"
              />
              <span
                className="absolute bottom-3 right-4 text-[12px] text-[#94A3B8]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {detail.length} / 200자
              </span>
            </div>
          </section>

          <section className="p-3 bg-[#FEF3C7] rounded-lg flex gap-2">
            <span className="material-symbols-outlined text-[#0E1726] text-[20px] mt-0.5">warning</span>
            <p className="text-[14px] leading-relaxed text-[#0E1726]">
              반려 시 {card.authorName}님의 <strong className="font-bold">&apos;할 일&apos;</strong>{" "}
              목록에 빨간색으로 <strong className="font-bold">&apos;재작업 필요&apos;</strong> 표시됩니다.
            </p>
          </section>

          <div className="h-20" />
        </main>

        <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E2E8F0] flex gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="w-[40%] h-[52px] border-[1.5px] border-[#CBD5E1] text-[#475569] font-medium text-[16px] rounded-lg disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={() => onSubmit(selectedReason, detail.trim())}
            disabled={!canSubmit}
            className="w-[60%] h-[52px] bg-[#DC2626] text-white font-bold text-[17px] rounded-lg active:scale-95 transition-transform duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? "처리 중..." : "반려 보내기"}
          </button>
        </footer>
      </div>
    </div>
  );
}

function ViewerModal({ card, onClose }: { card: PendingReview; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#0a1525]"
      style={{ fontFamily: "var(--font-hanken), sans-serif" }}
    >
      <header className="h-[56px] flex items-center justify-between px-4 text-white">
        <button onClick={onClose} aria-label="닫기" className="flex items-center justify-center">
          <span className="material-symbols-outlined text-[26px]">close</span>
        </button>
        <h1 className="text-[15px] font-semibold truncate mx-3 flex-1 text-center">{card.taskTitle}</h1>
        <button aria-label="더보기" className="flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">more_vert</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="bg-white rounded-md p-4 mx-auto max-w-[320px]">
          <div
            className="aspect-[4/3] w-full bg-[#fafafa] border border-[#d1d5db] flex items-center justify-center text-[#6b7280]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 14px, #e5e7eb 14px, #e5e7eb 15px), repeating-linear-gradient(90deg, transparent, transparent 14px, #e5e7eb 14px, #e5e7eb 15px)",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[40px]">architecture</span>
              <span className="text-[12px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {card.drawingCode ?? "도면 없음"}
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 px-4 py-3 flex items-center justify-between text-white/80 text-[12px]">
        <div className="flex flex-col">
          <span className="font-semibold" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            {card.drawingCode ?? "—"}
          </span>
          <span className="text-white/50 mt-0.5">{card.drawingTitle ?? "메인 배관 설치도"}</span>
        </div>
        <span className="text-white/60">1 / 1</span>
      </footer>
    </div>
  );
}
