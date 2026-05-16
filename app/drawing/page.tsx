"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface CustomDrawing {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

interface SelectedDrawing {
  id: string;
  title: string;
  isCustom: boolean;
  imageUrl?: string;
}

const STATIC_DRAWINGS = [
  { id: "s1", title: "메인 배관 설치도", date: "5월 10일 수정", tasks: 5 },
  { id: "s2", title: "부속 배관 설치도", date: "5월 5일 수정", tasks: 3 },
  { id: "s3", title: "냉각수 배관도", date: "4월 20일 수정", tasks: 2 },
  { id: "s4", title: "가스 라인 배관도", date: "4월 15일 수정", tasks: 1 },
  { id: "s5", title: "냉각 펌프 배관도", date: "4월 28일 등록", tasks: 4 },
  { id: "s6", title: "윤활유 배관도", date: "3월 28일 등록", tasks: 0 },
];

function BlueprintThumbnail() {
  return (
    <div className="w-[88px] h-[68px] rounded-lg bg-[#0d1f3c] flex-shrink-0 overflow-hidden">
      <svg viewBox="0 0 88 68" width="88" height="68" fill="none">
        <rect width="88" height="68" fill="#0d1f3c" />
        <line x1="8" y1="20" x2="80" y2="20" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="8" y1="34" x2="80" y2="34" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="8" y1="48" x2="80" y2="48" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="20" y1="8" x2="20" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="44" y1="8" x2="44" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="68" y1="8" x2="68" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="8" y1="20" x2="44" y2="20" stroke="#7eb8f7" strokeWidth="1.5" />
        <line x1="44" y1="20" x2="44" y2="48" stroke="#7eb8f7" strokeWidth="1.5" />
        <line x1="44" y1="48" x2="68" y2="48" stroke="#7eb8f7" strokeWidth="1.5" />
        <rect x="18" y="18" width="5" height="5" stroke="#7eb8f7" strokeWidth="1" fill="none" />
        <rect x="42" y="30" width="5" height="5" stroke="#7eb8f7" strokeWidth="1" fill="none" />
        <circle cx="44" cy="34" r="3" stroke="#a0c8ff" strokeWidth="1" fill="none" />
        <line x1="8" y1="8" x2="80" y2="8" stroke="#2a4a7f" strokeWidth="0.5" />
        <line x1="8" y1="60" x2="80" y2="60" stroke="#2a4a7f" strokeWidth="0.5" />
        <line x1="8" y1="8" x2="8" y2="60" stroke="#2a4a7f" strokeWidth="0.5" />
        <line x1="80" y1="8" x2="80" y2="60" stroke="#2a4a7f" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function DrawingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [titleError, setTitleError] = useState("");
  const [imageError, setImageError] = useState("");
  const [customDrawings, setCustomDrawings] = useState<CustomDrawing[]>([]);
  const [deletedStaticIds, setDeletedStaticIds] = useState<string[]>([]);

  const [selectedDrawing, setSelectedDrawing] = useState<SelectedDrawing | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("custom_drawings");
    if (saved) setCustomDrawings(JSON.parse(saved));
    const deleted = localStorage.getItem("deleted_static_drawings");
    if (deleted) setDeletedStaticIds(JSON.parse(deleted));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError("");
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setEditPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const te = !newTitle.trim() ? "도면 이름을 입력해주세요." : "";
    const ie = !previewUrl ? "사진을 선택해주세요." : "";
    setTitleError(te);
    setImageError(ie);
    if (te || ie) return;

    const today = new Date();
    const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일 등록`;
    const newDrawing: CustomDrawing = {
      id: `c${Date.now()}`,
      title: newTitle.trim(),
      date: dateStr,
      imageUrl: previewUrl!,
    };

    const updated = [newDrawing, ...customDrawings];
    setCustomDrawings(updated);
    localStorage.setItem("custom_drawings", JSON.stringify(updated));

    setShowModal(false);
    setNewTitle("");
    setPreviewUrl(null);
    setTitleError("");
    setImageError("");
  };

  const handleClose = () => {
    setShowModal(false);
    setNewTitle("");
    setPreviewUrl(null);
    setTitleError("");
    setImageError("");
  };

  const handleDetailClose = () => {
    setSelectedDrawing(null);
    setEditPreviewUrl(null);
    setShowDeleteConfirm(false);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleEditSave = () => {
    if (!selectedDrawing || !editPreviewUrl) return;

    if (selectedDrawing.isCustom) {
      const today = new Date();
      const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일 수정`;
      const updated = customDrawings.map((d) =>
        d.id === selectedDrawing.id ? { ...d, imageUrl: editPreviewUrl, date: dateStr } : d
      );
      setCustomDrawings(updated);
      localStorage.setItem("custom_drawings", JSON.stringify(updated));
    } else {
      const today = new Date();
      const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일 수정`;
      const newDrawing: CustomDrawing = {
        id: `c_${selectedDrawing.id}_${Date.now()}`,
        title: selectedDrawing.title,
        date: dateStr,
        imageUrl: editPreviewUrl,
      };
      const newDeleted = [...deletedStaticIds, selectedDrawing.id];
      setDeletedStaticIds(newDeleted);
      localStorage.setItem("deleted_static_drawings", JSON.stringify(newDeleted));
      const updated = [newDrawing, ...customDrawings];
      setCustomDrawings(updated);
      localStorage.setItem("custom_drawings", JSON.stringify(updated));
    }

    handleDetailClose();
  };

  const handleDelete = () => {
    if (!selectedDrawing) return;

    if (selectedDrawing.isCustom) {
      const updated = customDrawings.filter((d) => d.id !== selectedDrawing.id);
      setCustomDrawings(updated);
      localStorage.setItem("custom_drawings", JSON.stringify(updated));
    } else {
      const newDeleted = [...deletedStaticIds, selectedDrawing.id];
      setDeletedStaticIds(newDeleted);
      localStorage.setItem("deleted_static_drawings", JSON.stringify(newDeleted));
    }

    handleDetailClose();
  };

  const visibleStaticDrawings = STATIC_DRAWINGS.filter((d) => !deletedStaticIds.includes(d.id));
  const totalCount = visibleStaticDrawings.length + customDrawings.length;

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#f9f9ff] px-5 pt-6 pb-4 flex items-start justify-between border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">도면 관리</h1>
          <p className="text-sm text-gray-400 mt-0.5">배관 1팀 · {totalCount}장</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-[#0052cc] font-semibold text-sm mt-1 hover:opacity-70 transition-opacity"
        >
          <span className="text-lg font-light leading-none">+</span>
          새 도면
        </button>
      </header>

      {/* 도면 목록 */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-3">
        {/* 업로드된 도면 */}
        {customDrawings.map((drawing) => (
          <button
            key={drawing.id}
            onClick={() => setSelectedDrawing({ id: drawing.id, title: drawing.title, isCustom: true, imageUrl: drawing.imageUrl })}
            className="bg-white rounded-2xl px-4 py-4 border border-[#0052cc]/20 flex items-center gap-4 text-left w-full hover:bg-blue-50 transition-colors shadow-sm"
          >
            <div className="w-[88px] h-[68px] rounded-lg overflow-hidden flex-shrink-0">
              <img src={drawing.imageUrl} alt={drawing.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-base font-bold text-gray-900">{drawing.title}</h3>
                <span className="text-[10px] font-semibold text-[#0052cc] bg-[#e8eeff] px-2 py-0.5 rounded-full">NEW</span>
              </div>
              <p className="text-sm text-gray-400">{drawing.date}</p>
              <p className="text-sm text-gray-300 mt-0.5">연결 작업 없음</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0C4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}

        {/* 기본 도면 */}
        {visibleStaticDrawings.map((drawing) => (
          <button
            key={drawing.id}
            onClick={() => setSelectedDrawing({ id: drawing.id, title: drawing.title, isCustom: false })}
            className="bg-white rounded-2xl px-4 py-4 border border-gray-200 flex items-center gap-4 text-left w-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            <BlueprintThumbnail />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900">{drawing.title}</h3>
              <p className="text-sm text-gray-400 mt-0.5">{drawing.date}</p>
              <p className={`text-sm mt-0.5 ${drawing.tasks > 0 ? "text-gray-500" : "text-gray-300"}`}>
                {drawing.tasks > 0 ? `연결 작업 ${drawing.tasks}건` : "연결 작업 없음"}
              </p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0C4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </main>

      {/* 하단 내비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white h-[64px] border-t border-gray-200 max-w-screen-sm mx-auto">
        <div className="flex w-full h-full">
          <button onClick={() => router.push("/home_admin")} className="flex-1 flex flex-col items-center justify-center text-[#94A3B8]">
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="text-[12px] font-medium mt-0.5">홈</span>
          </button>
          <button onClick={() => router.push("/home_admin")} className="flex-1 flex flex-col items-center justify-center text-[#94A3B8]">
            <span className="material-symbols-outlined text-[22px]">group</span>
            <span className="text-[12px] font-medium mt-0.5">팀원</span>
          </button>
          <button className="flex-1 flex flex-col items-center justify-center text-[#0052cc]">
            <div className="px-4 py-1.5 rounded-2xl bg-[#e8eeff] flex flex-col items-center">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              <span className="text-[12px] font-medium mt-0.5">도면</span>
            </div>
          </button>
          <button onClick={() => router.push("/message_admin")} className="flex-1 flex flex-col items-center justify-center text-[#94A3B8]">
            <div className="relative inline-flex flex-col items-center">
              <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
            </div>
            <span className="text-[12px] font-medium mt-0.5">메시지</span>
          </button>
        </div>
      </nav>

      {/* 새 도면 팝업 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-3xl mx-4 px-7 pt-7 pb-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-gray-900">새 도면 추가</h2>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">도면 이름</label>
              <input
                type="text"
                placeholder="예: 메인 배관 설치도"
                value={newTitle}
                onChange={(e) => { setNewTitle(e.target.value); setTitleError(""); }}
                className={`bg-white border rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition-colors ${titleError ? "border-red-400" : "border-gray-300 focus:border-[#0052cc]"}`}
              />
              {titleError && <p className="text-xs text-red-500 pl-1">{titleError}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">도면 사진</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {previewUrl ? (
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-gray-200">
                  <img src={previewUrl} alt="미리보기" className="w-full h-full object-cover" />
                  <button
                    onClick={() => { setPreviewUrl(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className="absolute top-2 right-2 w-7 h-7 bg-gray-900/60 rounded-full flex items-center justify-center text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${imageError ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={imageError ? "#EF4444" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className={`text-sm font-medium ${imageError ? "text-red-400" : "text-gray-400"}`}>사진을 선택해주세요</span>
                </button>
              )}
              {imageError && <p className="text-xs text-red-500 pl-1">{imageError}</p>}
            </div>

            <div className="flex gap-3 mt-1">
              <button
                onClick={handleClose}
                className="flex-1 py-4 rounded-xl border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-4 rounded-xl bg-[#0052cc] text-white font-bold text-sm hover:bg-[#003d9b] transition-colors"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 도면 상세 팝업 */}
      {selectedDrawing && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-3xl mx-4 px-7 pt-7 pb-8 flex flex-col gap-5">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-gray-900 truncate pr-2">{selectedDrawing.title}</h2>
              <button onClick={handleDetailClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* 현재 도면 미리보기 */}
            <div className="w-full h-40 rounded-2xl overflow-hidden bg-[#0d1f3c] flex items-center justify-center">
              {selectedDrawing.isCustom && selectedDrawing.imageUrl ? (
                <img src={editPreviewUrl ?? selectedDrawing.imageUrl} alt={selectedDrawing.title} className="w-full h-full object-cover" />
              ) : editPreviewUrl ? (
                <img src={editPreviewUrl} alt={selectedDrawing.title} className="w-full h-full object-cover" />
              ) : (
                <svg viewBox="0 0 88 68" width="120" height="92" fill="none">
                  <rect width="88" height="68" fill="#0d1f3c" />
                  <line x1="8" y1="20" x2="80" y2="20" stroke="#4a7fc1" strokeWidth="0.8" />
                  <line x1="8" y1="34" x2="80" y2="34" stroke="#4a7fc1" strokeWidth="0.8" />
                  <line x1="8" y1="48" x2="80" y2="48" stroke="#4a7fc1" strokeWidth="0.8" />
                  <line x1="20" y1="8" x2="20" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
                  <line x1="44" y1="8" x2="44" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
                  <line x1="68" y1="8" x2="68" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
                  <line x1="8" y1="20" x2="44" y2="20" stroke="#7eb8f7" strokeWidth="1.5" />
                  <line x1="44" y1="20" x2="44" y2="48" stroke="#7eb8f7" strokeWidth="1.5" />
                  <line x1="44" y1="48" x2="68" y2="48" stroke="#7eb8f7" strokeWidth="1.5" />
                  <rect x="18" y="18" width="5" height="5" stroke="#7eb8f7" strokeWidth="1" fill="none" />
                  <rect x="42" y="30" width="5" height="5" stroke="#7eb8f7" strokeWidth="1" fill="none" />
                  <circle cx="44" cy="34" r="3" stroke="#a0c8ff" strokeWidth="1" fill="none" />
                </svg>
              )}
            </div>

            {/* 파일 변경 안내 */}
            {editPreviewUrl && (
              <p className="text-xs text-[#0052cc] font-medium text-center -mt-2">새 파일이 선택됐습니다. 저장을 눌러 적용하세요.</p>
            )}

            {/* 숨겨진 파일 입력 */}
            <input
              ref={editFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleEditFileChange}
            />

            {/* 도면 수정 버튼 */}
            <button
              onClick={() => editFileInputRef.current?.click()}
              className="w-full py-4 rounded-xl border-2 border-[#0052cc] text-[#0052cc] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#e8eeff] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              도면 파일 교체
            </button>

            {/* 저장 버튼 (파일 선택 후에만 활성화) */}
            {editPreviewUrl && (
              <button
                onClick={handleEditSave}
                className="w-full py-4 rounded-xl bg-[#0052cc] text-white font-bold text-sm hover:bg-[#003d9b] transition-colors -mt-2"
              >
                저장
              </button>
            )}

            {/* 삭제 */}
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-4 rounded-xl border border-red-300 text-red-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" /><path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                도면 삭제
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-center text-gray-600 font-medium">정말 삭제하시겠습니까?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-3.5 rounded-xl border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
