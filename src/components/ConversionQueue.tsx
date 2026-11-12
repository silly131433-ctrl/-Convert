import React, { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  Eye,
  Trash2,
  FolderArchive,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowUp,
  ArrowDown,
  FileCheck2,
  Edit3,
} from 'lucide-react';
import { FileItem, TargetFormat } from '../types/converter';
import { formatBytes, getSupportedTargetFormats } from '../utils/fileHelpers';

interface ConversionQueueProps {
  files: FileItem[];
  onConvertSingle: (id: string) => void;
  onConvertAll: () => void;
  onDownloadSingle: (item: FileItem) => void;
  onDownloadAllZip: () => void;
  onPreview: (item: FileItem) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onChangeTargetFormat: (id: string, format: TargetFormat) => void;
  isConvertingAny: boolean;
  // Merging multiple files into 1 single file
  onMergeAllToOneFile: (targetFormat: TargetFormat, customName: string) => void;
  mergedResult: {
    fileName: string;
    mimeType: string;
    size: number;
    base64: string;
  } | null;
  onDownloadMergedFile: () => void;
  onPreviewMergedFile: () => void;
  isMerging: boolean;
  defaultMergeFormat?: TargetFormat;
  onReorderFiles: (fromIndex: number, toIndex: number) => void;
}

export const ConversionQueue: React.FC<ConversionQueueProps> = ({
  files,
  onConvertSingle,
  onConvertAll,
  onDownloadSingle,
  onDownloadAllZip,
  onPreview,
  onRemove,
  onClearAll,
  onChangeTargetFormat,
  isConvertingAny,
  onMergeAllToOneFile,
  mergedResult,
  onDownloadMergedFile,
  onPreviewMergedFile,
  isMerging,
  defaultMergeFormat,
  onReorderFiles,
}) => {
  const [activeTab, setActiveTab] = useState<'mergeOne' | 'individual'>('mergeOne');
  const [mergeTargetFormat, setMergeTargetFormat] = useState<TargetFormat>(defaultMergeFormat || 'docx');
  const [mergedFileName, setMergedFileName] = useState('OmniConvert_全部檔案合併成果');

  React.useEffect(() => {
    if (defaultMergeFormat) {
      setMergeTargetFormat(defaultMergeFormat);
    }
  }, [defaultMergeFormat]);

  if (files.length === 0) return null;

  const successfulCount = files.filter((f) => f.status === 'success').length;
  const pendingCount = files.filter((f) => f.status === 'idle' || f.status === 'error').length;

  const getFormatIcon = (format: string) => {
    if (['pptx', 'ppt'].includes(format)) return <Presentation className="w-5 h-5 text-orange-400" />;
    if (['xlsx', 'xls', 'csv'].includes(format)) return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
    if (['docx', 'doc'].includes(format)) return <FileText className="w-5 h-5 text-blue-400" />;
    if (['pdf'].includes(format)) return <FileText className="w-5 h-5 text-red-400" />;
    return <ImageIcon className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="mb-12">
      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-5 border-b border-slate-800 gap-4">
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('mergeOne')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mergeOne'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-300" />
            <span>🗂️ 全部打包合併為一份檔案 ({files.length})</span>
            <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-200 text-[10px] border border-indigo-700/50">
              您的需求
            </span>
          </button>

          <button
            onClick={() => setActiveTab('individual')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'individual'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-slate-300" />
            <span>個別轉檔清單</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onClearAll}
            disabled={isConvertingAny || isMerging}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>清空所有檔案</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MERGE ALL TO ONE FILE PANEL */}
      {activeTab === 'mergeOne' && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-slate-950 border border-indigo-500/30 shadow-xl mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                  <Layers className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    多檔案合併轉檔：將所有 {files.length} 個檔案整合成「單一完整檔案」
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    支援將多張圖面（如 10.02.jpg ~ 10.07.jpg）合併為一份多頁 PDF、一份 Word 報告或一份 Excel 活頁簿
                  </p>
                </div>
              </div>
            </div>

            {/* Target Merged Format Selector & Editable File Name */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Editable Merged File Name */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-inner">
                <Edit3 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium shrink-0">合併後檔名:</span>
                <input
                  type="text"
                  value={mergedFileName}
                  onChange={(e) => setMergedFileName(e.target.value)}
                  placeholder="請輸入合併後檔案名稱"
                  className="bg-transparent text-xs font-semibold text-white focus:outline-none w-44 sm:w-56 placeholder-slate-500"
                />
                <span className="text-xs text-indigo-400 font-mono font-bold shrink-0">
                  .{mergeTargetFormat}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 border border-slate-700/80 px-3 py-1.5 rounded-xl">
                <span className="text-xs text-slate-400 font-medium">合併目標格式:</span>
                <select
                  value={mergeTargetFormat}
                  onChange={(e) => setMergeTargetFormat(e.target.value as TargetFormat)}
                  className="bg-transparent text-xs font-bold text-cyan-300 focus:outline-none cursor-pointer"
                >
                  <option value="pdf" className="bg-slate-900 text-white">
                    📄 單一多頁 PDF 文件 (推薦)
                  </option>
                  <option value="docx" className="bg-slate-900 text-white">
                    📝 單一 Word 綜合報告 (DOCX)
                  </option>
                  <option value="xlsx" className="bg-slate-900 text-white">
                    📊 單一 Excel 多工作表 (XLSX)
                  </option>
                </select>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onMergeAllToOneFile(mergeTargetFormat, mergedFileName.trim() || 'OmniConvert_Merged_All')}
                disabled={isMerging}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isMerging ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{isMerging ? '正在合併轉檔中...' : '開始全部合併打包為一份檔案'}</span>
              </button>
            </div>
          </div>

          {/* Merged Success Result Banner */}
          {mergedResult && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-emerald-300 font-medium">檔案名稱:</span>
                    <input
                      type="text"
                      value={mergedResult.fileName}
                      onChange={(e) => {
                        mergedResult.fileName = e.target.value;
                        setMergedFileName(e.target.value.replace(/\.[^/.]+$/, ''));
                      }}
                      className="text-sm font-bold text-white bg-slate-900/90 border border-slate-700/80 px-2 py-0.5 rounded-lg focus:outline-none focus:border-emerald-400 max-w-xs sm:max-w-md"
                      title="點擊可直接修改下載檔案名稱"
                    />
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 font-mono">
                      {formatBytes(mergedResult.size)}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-300/90 mt-0.5">
                    已成功將所有 {files.length} 個檔案整合成單一檔案，保留原寸幾何與表格美編！
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onPreviewMergedFile}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>預覽合併檔案</span>
                </button>

                <button
                  onClick={onDownloadMergedFile}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>下載合併檔案</span>
                </button>
              </div>
            </div>
          )}

          {/* File Sequence & Reordering List */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-semibold">
              <span>頁面與章節合成順序（可按上下箭頭調整前後順序）：</span>
              <span className="text-slate-400 font-normal">共 {files.length} 頁/項次</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {files.map((file, idx) => (
                <div
                  key={file.id}
                  className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      {getFormatIcon(file.sourceFormat)}
                    </div>
                    <span className="text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
                      {file.name}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">
                      ({formatBytes(file.size)})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onReorderFiles(idx, idx - 1)}
                      disabled={idx === 0}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                      title="上移"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onReorderFiles(idx, idx + 1)}
                      disabled={idx === files.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                      title="下移"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemove(file.id)}
                      className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors ml-1"
                      title="移除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INDIVIDUAL CONVERSION LIST */}
      {activeTab === 'individual' && (
        <>
          {/* Action bar for individual */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-slate-800 gap-3">
            <div className="text-xs text-slate-400">
              個別轉為獨立檔案，轉換後可個別下載或打包為 ZIP 壓縮檔。
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {pendingCount > 0 && (
                <button
                  onClick={onConvertAll}
                  disabled={isConvertingAny}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isConvertingAny ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>全部個別轉檔 ({pendingCount})</span>
                </button>
              )}

              {successfulCount > 0 && (
                <button
                  onClick={onDownloadAllZip}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <FolderArchive className="w-4 h-4" />
                  <span>打包下載全部 (.ZIP)</span>
                </button>
              )}
            </div>
          </div>

          {/* Queue Items */}
          <div className="space-y-3">
            {files.map((item) => {
              const supportedTargets = getSupportedTargetFormats(item.sourceFormat);
              const isProcessing = item.status === 'analyzing' || item.status === 'converting';

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    item.status === 'success'
                      ? 'bg-slate-900/90 border-emerald-500/30'
                      : item.status === 'error'
                      ? 'bg-slate-900/90 border-red-500/40'
                      : isProcessing
                      ? 'bg-slate-900/90 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* File info */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                        {getFormatIcon(item.sourceFormat)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                            {item.name}
                          </span>
                          <span className="text-[11px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {item.sourceFormat}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span>{formatBytes(item.size)}</span>
                          <span>•</span>
                          {item.status === 'idle' && (
                            <span className="text-slate-400">就緒</span>
                          )}
                          {item.status === 'analyzing' && (
                            <span className="text-amber-400 flex items-center gap-1">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              正在分析版面與表格...
                            </span>
                          )}
                          {item.status === 'converting' && (
                            <span className="text-indigo-400 flex items-center gap-1">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              正在重構排版 ({item.targetFormat.toUpperCase()})...
                            </span>
                          )}
                          {item.status === 'success' && (
                            <span className="text-emerald-400 flex items-center gap-1 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              已完成 ({formatBytes(item.convertedData?.size || 0)})
                            </span>
                          )}
                          {item.status === 'error' && (
                            <span className="text-red-400 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {item.errorMessage || '轉檔失敗'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Target Format Selector & Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-2.5 py-1.5 rounded-lg">
                        <span className="text-xs text-slate-400">目標格式:</span>
                        <select
                          value={item.targetFormat}
                          disabled={isProcessing || item.status === 'success'}
                          onChange={(e) => onChangeTargetFormat(item.id, e.target.value as TargetFormat)}
                          className="bg-transparent text-xs font-bold text-indigo-300 focus:outline-none cursor-pointer uppercase"
                        >
                          {supportedTargets.map((t) => (
                            <option key={t} value={t} className="bg-slate-900 text-white">
                              {t === 'docx' ? 'WORD (DOCX)' : t === 'xlsx' ? 'EXCEL (XLSX)' : t.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.status !== 'success' ? (
                          <button
                            onClick={() => onConvertSingle(item.id)}
                            disabled={isProcessing}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors cursor-pointer"
                          >
                            {isProcessing ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5" />
                            )}
                            <span>{isProcessing ? '處理中' : '開始轉檔'}</span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => onPreview(item)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                              title="預覽與版面保真對照"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-400" />
                              <span>預覽</span>
                            </button>

                            <button
                              onClick={() => onDownloadSingle(item)}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>下載</span>
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => onRemove(item.id)}
                          disabled={isProcessing}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar during conversion */}
                  {isProcessing && (
                    <div className="mt-3 w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-1.5 rounded-full animate-pulse transition-all duration-300"
                        style={{ width: `${item.progress || 70}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
