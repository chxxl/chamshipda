"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type UserRole = "worker" | "manager";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("worker");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ userId: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "worker") {
      const newErrors = {
        userId: !userId.trim() ? "아이디를 입력해주세요." : "",
        password: !password.trim() ? "비밀번호를 입력해주세요." : "",
      };
      setErrors(newErrors);
      if (newErrors.userId || newErrors.password) return;
      router.push("/home");
    } else if (role === "manager") {
      router.push("/home_admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* 로고 & 슬로건 */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-[#1A3BAE] tracking-tight">
              참<span className="text-[#1A3BAE]">ship</span>다
            </h1>
            <div className="mt-1 w-20 h-[3px] bg-[#F97316] rounded-full" />
          </div>
          <p className="text-[#4B5563] text-sm text-center leading-relaxed">
            복잡한 도면도, 참ship다로 보면 참 쉽다
          </p>
        </div>

        {/* 역할 탭 */}
        <div className="bg-[#DCE4F5] rounded-xl p-1 flex">
          <button
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              role === "worker"
                ? "bg-[#1A3BAE] text-white shadow-md"
                : "text-[#6B7280]"
            }`}
            onClick={() => setRole("worker")}
          >
            작업자
          </button>
          <button
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              role === "manager"
                ? "bg-[#1A3BAE] text-white shadow-md"
                : "text-[#6B7280]"
            }`}
            onClick={() => setRole("manager")}
          >
            관리자
          </button>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* 아이디 입력 */}
          <div className="flex flex-col gap-1">
            <div className={`bg-white rounded-xl border flex items-center gap-3 px-4 py-4 shadow-sm ${errors.userId ? "border-red-400" : "border-[#E5E7EB]"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="사번 또는 아이디"
                value={userId}
                onChange={(e) => { setUserId(e.target.value); setErrors((prev) => ({ ...prev, userId: "" })); }}
                className="flex-1 text-sm text-[#374151] placeholder-[#9CA3AF] outline-none bg-transparent"
              />
            </div>
            {errors.userId && <p className="text-xs text-red-500 pl-1">{errors.userId}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="flex flex-col gap-1">
          <div className={`bg-white rounded-xl border flex items-center gap-3 px-4 py-4 shadow-sm ${errors.password ? "border-red-400" : "border-[#E5E7EB]"}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: "" })); }}
              className="flex-1 text-sm text-[#374151] placeholder-[#9CA3AF] outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password}</p>}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="mt-2 w-full bg-[#1A3BAE] text-white font-bold text-base py-4 rounded-xl shadow-lg hover:bg-[#1530A0] active:bg-[#122890] transition-colors"
          >
            로그인
          </button>
        </form>

        {/* 구분선 */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#D1D5DB]" />
          <span className="text-[#9CA3AF] text-sm">또는</span>
          <div className="flex-1 h-px bg-[#D1D5DB]" />
        </div>

        {/* SSO 로그인 버튼 */}
        <button
          type="button"
          className="w-full border border-[#1A3BAE] bg-white text-[#1A3BAE] font-semibold text-sm py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#EEF2FF] transition-colors shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3BAE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          회사 SSO로 로그인
        </button>

        {/* 비밀번호 찾기 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => router.push("/forgot")}
            className="text-[#6B7280] text-sm underline underline-offset-2 hover:text-[#374151] transition-colors"
          >
            로그인 정보를 잊으셨나요?
          </button>
        </div>

        {/* 버전 & 고객지원 */}
        <div className="flex justify-center items-center gap-3 text-[#9CA3AF] text-xs">
          <span>v1.0.0</span>
          <div className="w-px h-3 bg-[#D1D5DB]" />
          <span>고객지원 1588-XXXX</span>
        </div>

        {/* 하단 컬러 바 */}
        <div className="flex gap-1">
          <div className="flex-1 h-1.5 bg-[#F97316] rounded-full" />
          <div className="flex-1 h-1.5 bg-[#374151] rounded-full" />
          <div className="flex-1 h-1.5 bg-[#F97316] rounded-full" />
          <div className="flex-1 h-1.5 bg-[#374151] rounded-full" />
          <div className="flex-1 h-1.5 bg-[#F97316] rounded-full" />
        </div>
      </div>
    </div>
  );
}
