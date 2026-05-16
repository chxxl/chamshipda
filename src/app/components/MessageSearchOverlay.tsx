import { useEffect, useId, useMemo, useRef, useState } from "react";
import svgPaths from "../../imports/Html→Body-4/svg-9tfx2oxlm9";

export type MessageSearchHit = {
  id: string;
  title: string;
  body: string;
  meta?: string;
};

type MessageSearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  items: MessageSearchHit[];
  /** fullscreen: 전체 화면. nested: 부모(예: 대화 패널) 안에서만 덮음 */
  variant?: "fullscreen" | "nested";
};

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function matches(query: string, hit: MessageSearchHit) {
  const q = normalize(query);
  if (!q) return false;
  const hay = [hit.title, hit.body, hit.meta ?? ""].map(normalize).join(" ");
  return hay.includes(q);
}

export function MessageSearchOverlay({ open, onClose, items, variant = "fullscreen" }: MessageSearchOverlayProps) {
  const labelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return items.filter((hit) => matches(q, hit));
  }, [items, query]);

  if (!open) return null;

  const shell =
    variant === "nested"
      ? "absolute inset-0 z-[30] flex flex-col bg-[#f8f9ff]"
      : "fixed inset-0 z-[220] flex justify-center bg-black/35";

  const panel = variant === "nested" ? "flex h-full w-full flex-col bg-[#f8f9ff]" : "flex h-full w-full max-w-[390px] flex-col bg-[#f8f9ff]";

  return (
    <div className={shell} role="dialog" aria-modal="true" aria-labelledby={labelId}>
      <div className={panel} onClick={(e) => e.stopPropagation()}>
        <div className="shrink-0 border-b border-solid border-[#c3c6d6] bg-[#f8f9ff] px-4 pb-3 pt-3">
          <h1 id={labelId} className="sr-only">
            메시지 내용 검색
          </h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg px-2 py-2 font-['Pretendard:Semi_Bold',sans-serif] text-[15px] text-[#003d9b] hover:bg-[#e8edfc]"
              aria-label="검색 닫기"
            >
              닫기
            </button>
            <div className="relative min-h-[44px] flex-1">
              <div className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2">
                <svg className="size-full" fill="none" viewBox="0 0 21 21" aria-hidden>
                  <path d={svgPaths.p23e76100} fill="#737685" />
                </svg>
              </div>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
                }}
                placeholder="메시지 내용 검색"
                className="h-11 w-full rounded-xl border border-[#c3c6d6] bg-white pl-10 pr-3 font-['Pretendard:Medium',sans-serif] text-[15px] text-[#0d1c2f] outline-none placeholder:text-[#737685] focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20"
                aria-label="메시지 검색어"
              />
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          {query.trim() === "" ? (
            <p className="py-8 text-center font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#737685]">
              검색할 단어를 입력하면 메시지 내용에서 찾습니다.
            </p>
          ) : results.length === 0 ? (
            <p className="py-8 text-center font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#737685]">
              &apos;{query.trim()}&apos;에 맞는 메시지가 없습니다.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {results.map((hit) => (
                <li
                  key={hit.id}
                  className="rounded-[12px] border border-[#c3c6d6] border-solid bg-white p-3.5 shadow-sm"
                >
                  <p className="font-['Pretendard:Semi_Bold',sans-serif] text-[15px] text-[#003d9b]">{hit.title}</p>
                  {hit.meta ? (
                    <p className="mt-0.5 font-['Pretendard:Regular',sans-serif] text-[12px] text-[#737685]">{hit.meta}</p>
                  ) : null}
                  <p className="mt-2 whitespace-pre-wrap font-['Pretendard:Medium',sans-serif] text-[14px] leading-[21px] text-[#0d1c2f]">
                    {hit.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
