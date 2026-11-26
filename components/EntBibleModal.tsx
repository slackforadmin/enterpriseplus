'use client';

import { useEffect, useState } from 'react';

const BIBLE_URL = 'https://bookstack.byounghee.synology.me:6876/';
const BIBLE_ID = 'gridcustomer@slack.com';
const BIBLE_PW = 'LoveSlack';

export default function EntBibleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Slack Ent+ Bible"
    >
      <div
        className="w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#635BFF]/10">
              <svg className="w-4 h-4 text-[#635BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </span>
            <h2 className="text-base font-bold text-gray-900">Slack Ent+ Bible</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 px-6 py-5 space-y-5 overflow-y-auto">
          <p className="text-sm text-gray-500 leading-relaxed">
            Slack 조직 관리 화면에 대한 상세한 설명이 있으니 참고 부탁드립니다.
            <br />
            Ent+ 기능이나 설정에 대한 자세한 설명이 정리되어 있습니다.
          </p>

          {/* 접속 정보 */}
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <InfoRow label="URL" value={BIBLE_URL} href={BIBLE_URL} />
            <InfoRow label="ID" value={BIBLE_ID} />
            <InfoRow label="PW" value={BIBLE_PW} last />
          </div>

          <a
            href={BIBLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#635BFF] text-white text-sm font-semibold hover:bg-[#5248e6] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Bible 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, href, last }: { label: string; value: string; href?: string; last?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${last ? '' : 'border-b border-gray-100'}`}>
      <span className="w-12 flex-shrink-0 text-xs font-bold uppercase tracking-wider text-gray-400">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 truncate text-[13px] font-medium text-[#635BFF] hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="flex-1 min-w-0 truncate text-[13px] font-medium text-gray-800">{value}</span>
      )}
      <button
        type="button"
        onClick={copy}
        aria-label={`${label} 복사`}
        className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-gray-500 hover:text-[#635BFF] hover:bg-[#635BFF]/10 transition-colors"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            복사됨
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            복사
          </>
        )}
      </button>
    </div>
  );
}
