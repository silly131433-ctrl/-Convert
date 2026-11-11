import React from 'react';
import { Presentation, FileText, Image as ImageIcon, FileSpreadsheet, ArrowRight, Check } from 'lucide-react';
import { TargetFormat } from '../types/converter';

interface FormatMatrixProps {
  onSelectPreset: (source: string, target: TargetFormat) => void;
}

export const FormatMatrix: React.FC<FormatMatrixProps> = ({ onSelectPreset }) => {
  const cards = [
    {
      id: 'ppt-pdf',
      title: 'PPT / PPTX 轉 PDF',
      sub: '精準維持 16:9 投影片比例、母片排版與文字圖形階層',
      icon: Presentation,
      from: 'PPT / PPTX',
      to: 'PDF' as TargetFormat,
      badge: '投影片完整還原',
      color: 'from-orange-500/20 to-red-500/10 border-orange-500/30 text-orange-400',
    },
    {
      id: 'pdf-word',
      title: 'PDF 轉 Word (DOCX)',
      sub: '完整還原原始表格線條、表頭色塊、儲存格數值與段落排版',
      icon: FileText,
      from: 'PDF 文件',
      to: 'docx' as TargetFormat,
      badge: '表格美編 100% 重構',
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    },
    {
      id: 'img-pdf',
      title: '圖面 / 藍圖 轉 PDF',
      sub: '無損解析度，自適應原尺寸或 A4 向量配置，保持細節不失真',
      icon: ImageIcon,
      from: '工程圖 / 圖片',
      to: 'pdf' as TargetFormat,
      badge: '原寸無損向量',
      color: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      id: 'img-excel',
      title: '圖面 / 截圖 轉 EXCEL',
      sub: 'AI 深度萃取圖面上所有表格矩陣、數值、欄位標題與公式',
      icon: FileSpreadsheet,
      from: '表格圖面 / 掃描',
      to: 'xlsx' as TargetFormat,
      badge: '表格數值矩陣化',
      color: 'from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'img-word',
      title: '圖面 / 企劃 轉 Word',
      sub: '將視覺版面美編、文字塊、圖表與表格轉化為可編輯 Word 報告',
      icon: FileText,
      from: '圖面 / 設計稿',
      to: 'docx' as TargetFormat,
      badge: '可編輯報告書',
      color: 'from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-400',
    },
    {
      id: 'excel-pdf',
      title: 'Excel / CSV 轉 PDF',
      sub: '自動適配分頁、欄位寬度、斑馬紋交錯底色與高階報表格線',
      icon: FileSpreadsheet,
      from: 'Excel / CSV',
      to: 'pdf' as TargetFormat,
      badge: '報表自動排版',
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    },
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <span>支援轉檔格式矩陣</span>
            <span className="text-xs font-normal text-slate-400">
              (全方位跨格式互轉，嚴格落實版面與表格設計保真)
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectPreset(card.from, card.to)}
              className={`p-4 rounded-xl border bg-gradient-to-br ${card.color} hover:border-indigo-400/60 transition-all cursor-pointer group hover:scale-[1.01] hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/50">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-900/70 border border-slate-700 text-slate-200">
                    {card.badge}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-sm font-bold text-white mb-1">{card.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">{card.sub}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="font-mono text-slate-300">{card.from}</span>
                <span className="text-indigo-400 font-bold">➔</span>
                <span className="font-mono text-indigo-300 font-semibold">{card.to.toUpperCase()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
