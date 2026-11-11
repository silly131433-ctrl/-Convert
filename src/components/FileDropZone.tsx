import React, { useRef, useState } from 'react';
import { UploadCloud, FileUp, Sparkles, FileText, FileSpreadsheet, Presentation } from 'lucide-react';
import { createSampleImage } from '../utils/sampleData';

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  onLoadSample: (sampleFile: File) => void;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({ onFilesSelected, onLoadSample }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesSelected(filesArray);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
      e.target.value = '';
    }
  };

  return (
    <div className="mb-10">
      {/* Drop Zone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer group ${
          isDragOver
            ? 'border-indigo-400 bg-indigo-950/40 scale-[1.008]'
            : 'border-slate-700 hover:border-indigo-500/80 bg-slate-900/60 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".ppt,.pptx,.pdf,.png,.jpg,.jpeg,.webp,.svg,.tiff,.xlsx,.xls,.csv,.docx,.doc"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-indigo-600/20 transition-all">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          點擊上傳或將檔案拖曳至此處
        </h3>
        <p className="text-sm text-slate-300 max-w-lg mx-auto mb-4">
          支援 PPT/PPTX、PDF、工程圖面 (JPG/PNG/WEBP/SVG)、Excel (XLSX/CSV)、Word (DOCX)
        </p>

        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            📊 PPT / PPTX 簡報
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            📄 PDF 向量文件
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            🖼️ 施工圖面 / 截圖
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            📈 Excel / 試算表
          </span>
          <span className="px-2.5 py-1 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-700/60 font-semibold">
            ✨ 自動保持美編與表格
          </span>
        </div>
      </div>

      {/* Quick Test Demo Bar */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-white">無檔案可測試？</span>
          <span className="text-slate-400">點擊載入包含精緻表格與排版的實例樣本立即體驗：</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() =>
              onLoadSample(
                createSampleImage(
                  '2026年度核心工程財務收支與執行進度季報',
                  '含複合斑馬紋表格、預算統計、審核簽核備註與執行率指標',
                  'table'
                )
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>範例一：跨國財務季報表 (複合表格)</span>
          </button>

          <button
            onClick={() =>
              onLoadSample(
                createSampleImage(
                  '高精密半導體機電設備結構圖面與材料規格表',
                  '含 CAD 尺寸標註、公差標準、材料抗拉強度規格清單',
                  'diagram'
                )
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>範例二：工程施工規格圖面</span>
          </button>

          <button
            onClick={() =>
              onLoadSample(
                createSampleImage(
                  '企業數位轉型與多格式互轉技術架構簡報',
                  '16:9 投影片比例、投影片母片視覺色塊、保真度評估表',
                  'slide'
                )
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
          >
            <Presentation className="w-3.5 h-3.5 text-orange-400" />
            <span>範例三：16:9 簡報投影片</span>
          </button>
        </div>
      </div>
    </div>
  );
};
