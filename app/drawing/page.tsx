"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  createDrawing,
  deleteDrawing,
  getDrawings,
  updateDrawing,
  uploadDrawingImage,
  type DrawingSummary,
} from "@/lib/tasks";

interface DrawingListItem extends DrawingSummary {
  updatedAt: string;
  taskCount: number;
}

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
      </svg>
    </div>
  );
}

function formatModifiedDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}월 ${d.getDate()}일 수정`;
}

async function fetchDrawingList(): Promise<DrawingListItem[]> {
  const { data, error } = await supabase
    .from("drawings")
    .select(
      `
        id, code, title, file_url, updated_at,
        tasks(id)
      `
    )
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data.map((r): DrawingListItem => ({
    id: r.id,
    code: r.code,
    title: r.title,
    file_url: r.file_url,
    updatedAt: r.updated_at,
    taskCount: (r.tasks as { id: string }[] | null ?? []).length,
  }));
}

export default function DrawingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [drawings, setDrawings] = useState<DrawingListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [titleError, setTitleError] = useState("");
  const [imageError, setImageError] = useState("");
  const [adding, setAdding] = useState(false);

  const [selected, setSelected] = useState<DrawingListItem | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [busy, setBusy] = useState(false);

  const reload = async () => {
    const list = await fetchDrawingList();
    setDrawings(list);
  };

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
      setUserId(u.id);
      await reload();
      setLoading(false);
    })();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError("");
    setNewFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditFile(file);
    const reader = new FileReader();
    reader.onload = () => setEditPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const resetAddForm = () => {
    setShowModal(false);
    setNewTitle("");
    setNewCode("");
    setNewFile(null);
    setPreviewUrl(null);
    setTitleError("");
    setImageError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAdd = async () => {
    if (!userId) return;
    const te = !newTitle.trim() ? "도면 이름을 입력해주세요." : "";
    const ie = !newFile ? "사진을 선택해주세요." : "";
    setTitleError(te);
    setImageError(ie);
    if (te || ie || !newFile) return;

    setAdding(true);
    const url = await uploadDrawingImage(newFile);
    if (!url) {
      setAdding(false);
      alert("이미지 업로드에 실패했습니다.");
      return;
    }
    const created = await createDrawing({
      title: newTitle.trim(),
      code: newCode.trim() || "—",
      fileUrl: url,
      uploadedBy: userId,
    });
    setAdding(false);
    if (!created) {
      alert("도면 등록에 실패했습니다.");
      return;
    }
    await reload();
    resetAddForm();
  };

  const handleDetailClose = () => {
    setSelected(null);
    setEditFile(null);
    setEditPreviewUrl(null);
    setShowDeleteConfirm(false);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleEditSave = async () => {
    if (!selected || !editFile) return;
    setBusy(true);
    const newUrl = await uploadDrawingImage(editFile);
    if (!newUrl) {
      setBusy(false);
      alert("이미지 업로드에 실패했습니다.");
      return;
    }
    const ok = await updateDrawing(selected.id, { fileUrl: newUrl });
    setBusy(false);
    if (!ok) {
      alert("저장에 실패했습니다.");
      return;
    }
    await reload();
    handleDetailClose();
  };

  const handleDelete = async () => {
    if (!selected) return;
    setBusy(true);
    const ok = await deleteDrawing(selected.id, selected.file_url);
    setBusy(false);
    if (!ok) {
      alert("삭제에 실패했습니다.");
      return;
    }
    await reload();
    handleDetailClose();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center">
        <p className="text-sm text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col">
      <header className="bg-[#f9f9ff] px-5 pt-6 pb-4 flex items-start justify-between border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">도면 관리</h1>
          <p className="text-sm text-gray-400 mt-0.5">배관 1팀 · {drawings.length}장</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-[#0052cc] font-semibold text-sm mt-1 hover:opacity-70 transition-opacity"
        >
          <span className="text-lg font-light leading-none">+</span>
          새 도면
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-3">
        {drawings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-sm text-gray-500 border border-gray-100">
            등록된 도면이 없습니다. 우측 상단의 &apos;+ 새 도면&apos;을 눌러 추가하세요.
          </div>
        ) : (
          drawings.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d)}
              className="bg-white rounded-2xl px-4 py-4 border border-gray-200 flex items-center gap-4 text-left w-full hover:bg-gray-50 transition-colors shadow-sm"
            >
              {d.file_url ? (
                <div className="w-[88px] h-[68px] rounded-lg overflow-hidden flex-shrink-0 bg-[#0d1f3c]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.file_url} alt={d.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <BlueprintThumbnail />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 truncate">{d.title}</h3>
                <p
                  className="text-xs text-gray-500 mt-0.5"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  {d.code}
                </p>
                <p className="text-sm text-gray-400 mt-0.5">{formatModifiedDate(d.updatedAt)}</p>
                <p className={`text-sm mt-0.5 ${d.taskCount > 0 ? "text-gray-500" : "text-gray-300"}`}>
                  {d.taskCount > 0 ? `연결 작업 ${d.taskCount}건` : "연결 작업 없음"}
                </p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0C4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white h-[64px] border-t border-gray-200 max-w-screen-sm mx-auto">
        <div className="flex w-full h-full">
          <button onClick={() => router.push("/home_admin")} className="flex-1 flex flex-col items-center justify-center text-[#94A3B8]">
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="text-[12px] font-medium mt-0.5">홈</span>
          </button>
          <button onClick={() => router.push("/team")} className="flex-1 flex flex-col items-center justify-center text-[#94A3B8]">
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-3xl mx-4 px-7 pt-7 pb-8 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-gray-900">새 도면 추가</h2>
              <button onClick={resetAddForm} disabled={adding} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50">
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
              <label className="text-sm font-medium text-gray-700">도면 번호 (선택)</label>
              <input
                type="text"
                placeholder="예: P-101 Rev.D"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#0052cc]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              />
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="미리보기" className="w-full h-full object-cover" />
                  <button
                    onClick={() => { setPreviewUrl(null); setNewFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
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
                onClick={resetAddForm}
                disabled={adding}
                className="flex-1 py-4 rounded-xl border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                disabled={adding}
                className="flex-1 py-4 rounded-xl bg-[#0052cc] text-white font-bold text-sm hover:bg-[#003d9b] transition-colors disabled:bg-gray-400"
              >
                {adding ? "업로드 중..." : "추가"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-3xl mx-4 px-7 pt-7 pb-8 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-gray-900 truncate pr-2">{selected.title}</h2>
              <button onClick={handleDetailClose} disabled={busy} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 flex-shrink-0 disabled:opacity-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-500 -mt-2" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              {selected.code}
            </p>

            <div className="w-full h-40 rounded-2xl overflow-hidden bg-[#0d1f3c] flex items-center justify-center">
              {editPreviewUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={editPreviewUrl} alt={selected.title} className="w-full h-full object-cover" />
              ) : selected.file_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={selected.file_url} alt={selected.title} className="w-full h-full object-cover" />
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
                </svg>
              )}
            </div>

            {editPreviewUrl && (
              <p className="text-xs text-[#0052cc] font-medium text-center -mt-2">새 파일이 선택됐습니다. 저장을 눌러 적용하세요.</p>
            )}

            <input
              ref={editFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleEditFileChange}
            />

            <button
              onClick={() => editFileInputRef.current?.click()}
              disabled={busy}
              className="w-full py-4 rounded-xl border-2 border-[#0052cc] text-[#0052cc] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#e8eeff] transition-colors disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              도면 파일 교체
            </button>

            {editPreviewUrl && (
              <button
                onClick={handleEditSave}
                disabled={busy}
                className="w-full py-4 rounded-xl bg-[#0052cc] text-white font-bold text-sm hover:bg-[#003d9b] transition-colors -mt-2 disabled:bg-gray-400"
              >
                {busy ? "저장 중..." : "저장"}
              </button>
            )}

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={busy}
                className="w-full py-4 rounded-xl border border-red-300 text-red-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors disabled:opacity-50"
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
                {selected.taskCount > 0 && (
                  <p className="text-xs text-center text-red-500">
                    이 도면에 연결된 작업 {selected.taskCount}건의 도면 정보가 사라집니다.
                  </p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={busy}
                    className="flex-1 py-3.5 rounded-xl border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={busy}
                    className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors disabled:bg-gray-400"
                  >
                    {busy ? "삭제 중..." : "삭제"}
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
