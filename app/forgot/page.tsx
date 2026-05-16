"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !name.trim() ? "성함을 입력해주세요." : "",
      phone: !phone.trim() ? "휴대폰 번호를 입력해주세요." : "",
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.phone) return;
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col items-center">
      <div className="w-full max-w-sm flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="px-5 py-4 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-1 mr-4 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-base font-semibold text-gray-900 pr-8">
          로그인 정보 찾기
        </h1>
      </header>

      {/* 본문 */}
      <main className="flex-1 px-5 pt-8 pb-10 flex flex-col gap-8">
        {/* 안내 문구 */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold text-gray-900">계정 정보를 잊으셨나요?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            가입 시 등록한 이름과 전화번호를 입력하시면 문자로 아이디와 임시 비밀번호를 보내드립니다.
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 성함 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">성함</label>
            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
              className={`bg-white border rounded-xl px-4 py-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-colors ${errors.name ? "border-red-400" : "border-gray-300 focus:border-blue-500"}`}
            />
            {errors.name && <p className="text-xs text-red-500 pl-1">{errors.name}</p>}
          </div>

          {/* 휴대폰 번호 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">휴대폰 번호</label>
            <input
              type="tel"
              placeholder="- 없이 숫자만 입력"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setErrors((prev) => ({ ...prev, phone: "" })); }}
              maxLength={11}
              className={`bg-white border rounded-xl px-4 py-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-colors ${errors.phone ? "border-red-400" : "border-gray-300 focus:border-blue-500"}`}
            />
            {errors.phone && <p className="text-xs text-red-500 pl-1">{errors.phone}</p>}
          </div>

          {/* 정보 찾기 버튼 */}
          <button
            type="submit"
            className="mt-2 w-full bg-[#1A3BAE] hover:bg-[#1530A0] active:bg-[#122890] text-white font-bold text-base py-4 rounded-xl transition-colors"
          >
            정보 찾기
          </button>
        </form>

      </main>

      {/* 푸터 */}
      <footer className="pb-10 flex flex-col items-center gap-3">
        <span className="text-sm text-gray-400">고객지원 1588-XXXX</span>
        <div className="flex gap-6">
          <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">이용약관</button>
          <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">개인정보처리방침</button>
        </div>
      </footer>
      </div>

      {/* 팝업 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center px-8 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm px-6 py-8 flex flex-col items-center gap-5">
            {/* 체크 아이콘 */}
            <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            {/* 제목 */}
            <h2 className="text-xl font-extrabold text-gray-900">정보가 전송되었습니다</h2>
            {/* 본문 */}
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              등록된 휴대폰 번호로<br />
              아이디와 임시 비밀번호를 발송했습니다.<br />
              문자메시지를 확인해 주세요.
            </p>
            {/* 확인 버튼 */}
            <button
              onClick={() => { setShowModal(false); router.push("/"); }}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base py-4 rounded-xl transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
