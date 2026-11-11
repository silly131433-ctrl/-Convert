import React from 'react';
import { Layers, Sparkles, ShieldCheck, Zap, Download } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  activeFidelityMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, activeFidelityMode }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                OmniConvert <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Studio</span>
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
                PRO 智慧保真版
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              PPT 轉 PDF、PDF 轉 Word、圖面轉 PDF/Word/Excel • 原始表格與美編版面精確重構
            </p>
          </div>
        </div>

        {/* Feature Badges & Quick Action */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>AI 視覺版面解析引擎</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400 font-medium">在線運作中</span>
          </div>

          <button
            onClick={onOpenSettings}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeFidelityMode
                ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300 hover:bg-indigo-900/60'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>保真度配置</span>
          </button>
        </div>
      </div>
    </header>
  );
};
