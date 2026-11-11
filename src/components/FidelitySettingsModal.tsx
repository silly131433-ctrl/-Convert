import React from 'react';
import { X, ShieldCheck, Check, Sparkles, Sliders, Table, Palette, Layout } from 'lucide-react';
import { FidelityOptions } from '../types/converter';

interface FidelitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: FidelityOptions;
  onChangeOptions: (newOptions: FidelityOptions) => void;
}

export const FidelitySettingsModal: React.FC<FidelitySettingsModalProps> = ({
  isOpen,
  onClose,
  options,
  onChangeOptions,
}) => {
  if (!isOpen) return null;

  const toggleOption = (key: keyof FidelityOptions) => {
    onChangeOptions({
      ...options,
      [key]: !options[key],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-700/60 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">版面美編與表格保真度引擎設置</h3>
              <p className="text-xs text-slate-400">嚴格確保轉換後版面配置、視覺設計與表格結構 100% 精確複製</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-6 space-y-4">
          {/* AI Layout & Theme Reconstruction */}
          <div
            onClick={() => toggleOption('aiEnhancedLayout')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              options.aiEnhancedLayout
                ? 'bg-indigo-950/40 border-indigo-500/60'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg mt-0.5 ${options.aiEnhancedLayout ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">AI 深度視覺版面與美編色彩萃取 (建議開啟)</h4>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${options.aiEnhancedLayout ? 'bg-indigo-600 text-white' : 'border border-slate-600'}`}>
                  {options.aiEnhancedLayout && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                利用 Gemini 3.8 Flash 視覺解析原始文件之主色調、表頭色塊、指標卡片、階層字型與頁面間距，精確復刻至 Word、Excel 與 PDF。
              </p>
            </div>
          </div>

          {/* Table Borders & Zebra Striping */}
          <div
            onClick={() => toggleOption('preserveTableBorders')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              options.preserveTableBorders
                ? 'bg-indigo-950/40 border-indigo-500/60'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg mt-0.5 ${options.preserveTableBorders ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <Table className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">表格邊框、斑馬紋與儲存格對齊鎖定</h4>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${options.preserveTableBorders ? 'bg-indigo-600 text-white' : 'border border-slate-600'}`}>
                  {options.preserveTableBorders && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                維持原始表格中所有實線、雙線或淡灰格線；自動維持表頭底色與交錯斑馬紋，保留靠左/置中/靠右之數值對齊。
              </p>
            </div>
          </div>

          {/* Cell Colors */}
          <div
            onClick={() => toggleOption('preserveCellColors')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              options.preserveCellColors
                ? 'bg-indigo-950/40 border-indigo-500/60'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg mt-0.5 ${options.preserveCellColors ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <Palette className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">高對比文字與主題美編色系複製</h4>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${options.preserveCellColors ? 'bg-indigo-600 text-white' : 'border border-slate-600'}`}>
                  {options.preserveCellColors && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                將簡報投影片與圖面之裝飾邊框、徽章、標題配色忠實映射至目標文件，維持專業商務視覺質感。
              </p>
            </div>
          </div>

          {/* Aspect Ratio Lock for drawings/slides */}
          <div
            onClick={() => toggleOption('lockAspectRatio')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              options.lockAspectRatio
                ? 'bg-indigo-950/40 border-indigo-500/60'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg mt-0.5 ${options.lockAspectRatio ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <Layout className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">圖面 1:1 幾何比例與 16:9 投影片寬度鎖定</h4>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${options.lockAspectRatio ? 'bg-indigo-600 text-white' : 'border border-slate-600'}`}>
                  {options.lockAspectRatio && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                避免圖面拉伸變形，建築與工程圖面維持標準原寸輸出，簡報投影片鎖定標準 16:9 寬螢幕 PDF 輸出。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
          >
            完成儲存設定
          </button>
        </div>
      </div>
    </div>
  );
};
