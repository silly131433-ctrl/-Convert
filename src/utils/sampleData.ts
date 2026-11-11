/**
 * Generates interactive test samples so the user can test the conversion engine immediately
 */

export function createSampleImage(title: string, subtitle: string, type: 'table' | 'diagram' | 'slide'): File {
  const canvas = document.createElement('canvas');
  canvas.width = type === 'slide' ? 1280 : 1000;
  canvas.height = type === 'slide' ? 720 : 1300;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Card container
  ctx.fillStyle = '#1E293B';
  ctx.roundRect(40, 40, canvas.width - 80, canvas.height - 80, 16);
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header Banner
  const gradient = ctx.createLinearGradient(40, 40, canvas.width - 40, 140);
  gradient.addColorStop(0, '#2563EB');
  gradient.addColorStop(1, '#4F46E5');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(40, 40, canvas.width - 80, 100, [16, 16, 0, 0]);
  ctx.fill();

  // Title & Subtitle text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(title, 70, 95);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '16px sans-serif';
  ctx.fillText(subtitle, 70, 125);

  if (type === 'table') {
    // Draw rich complex table with headers, zebra stripes, and borders
    const startX = 70;
    const startY = 180;
    const tableWidth = canvas.width - 140;
    const colWidths = [120, 260, 160, 140, 180];
    const headers = ['序號/代碼', '項次與規格描述', '預算編列', '達成率', '審核備註'];
    const rows = [
      ['PR-2026-A1', '高精密光學感測模組導入', '$450,000', '98.5%', '已通過ISO認證'],
      ['PR-2026-A2', '多核心邊緣運算伺服器升級', '$820,000', '100.0%', '已部署至機房'],
      ['PR-2026-A3', '自動化版面向量幾何重繪系統', '$340,000', '94.2%', '進行中階段二'],
      ['PR-2026-A4', '工業物聯網雙向資料匯流閘道', '$590,000', '99.1%', '已完成驗收'],
      ['PR-2026-A5', '雲端高可用性負載平衡架構', '$280,000', '100.0%', '線上營運正常'],
      ['TOTAL', '專案核心預算總計與統計', '$2,480,000', '98.3%', '財務長核簽通過'],
    ];

    // Header row
    ctx.fillStyle = '#1D4ED8';
    ctx.fillRect(startX, startY, tableWidth, 44);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px sans-serif';
    let currentX = startX;
    headers.forEach((h, i) => {
      ctx.fillText(h, currentX + 14, startY + 28);
      currentX += colWidths[i];
    });

    // Rows
    let currentY = startY + 44;
    rows.forEach((row, rIdx) => {
      const isTotal = rIdx === rows.length - 1;
      ctx.fillStyle = isTotal ? '#334155' : rIdx % 2 === 1 ? '#1E293B' : '#0F172A';
      ctx.fillRect(startX, currentY, tableWidth, 42);

      // Cell border
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(startX, currentY, tableWidth, 42);

      let cellX = startX;
      row.forEach((cell, cIdx) => {
        ctx.fillStyle = isTotal ? '#38BDF8' : cIdx === 3 ? '#34D399' : '#F1F5F9';
        ctx.font = isTotal ? 'bold 15px sans-serif' : '14px sans-serif';
        ctx.fillText(cell, cellX + 14, currentY + 26);
        cellX += colWidths[cIdx];
      });
      currentY += 42;
    });

    // Summary Metric Cards below table
    const cardY = currentY + 40;
    const cardWidth = (tableWidth - 40) / 3;
    const cards = [
      { label: '專案總執行項目', val: '24 項核心任務', note: '+15% 成長' },
      { label: '綜合預算執行率', val: '98.3%', note: '優於去年同季' },
      { label: '品質檢驗評分', val: 'AA+ 極高規格', note: '零缺失通過' },
    ];

    cards.forEach((card, idx) => {
      const cX = startX + idx * (cardWidth + 20);
      ctx.fillStyle = '#0F172A';
      ctx.roundRect(cX, cardY, cardWidth, 120, 10);
      ctx.fill();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.fillText(card.label, cX + 20, cardY + 36);

      ctx.fillStyle = '#38BDF8';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(card.val, cX + 20, cardY + 74);

      ctx.fillStyle = '#10B981';
      ctx.font = '13px sans-serif';
      ctx.fillText(card.note, cX + 20, cardY + 102);
    });
  } else if (type === 'diagram') {
    // Engineering drawing / Blueprint diagram
    const startX = 70;
    const startY = 170;

    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);

    // Grid layout
    for (let x = startX; x < canvas.width - 70; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, canvas.height - 180);
      ctx.stroke();
    }
    for (let y = startY; y < canvas.height - 180; y += 60) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(canvas.width - 70, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Central Structural Blueprint Box
    ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';
    ctx.fillRect(startX + 80, startY + 60, canvas.width - 300, 320);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.strokeRect(startX + 80, startY + 60, canvas.width - 300, 320);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('【高精密結構設計圖面 / CAD 剖面示意】', startX + 110, startY + 110);

    // Dimension labels
    ctx.fillStyle = '#F59E0B';
    ctx.font = '14px monospace';
    ctx.fillText('← 橫向軸距 4,200 mm →', startX + 260, startY + 220);
    ctx.fillText('↑ 標高垂直公差 ±0.02 mm ↓', startX + 260, startY + 250);

    // Engineering Spec Table at bottom
    const specY = startY + 440;
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(startX, specY, canvas.width - 140, 36);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('工程圖面材料規格對照表 (AI 結構還原檢測)', startX + 15, specY + 24);

    const specRows = [
      ['料件編號', '材質規格', '抗拉強度', '表面塗層', '檢測標準'],
      ['ST-091A', 'SUS 316 不鏽鋼', '≥ 520 MPa', '電解拋光 Ra 0.4', 'CNS 12894'],
      ['AL-204B', '航太級 6061-T6 鋁合金', '≥ 310 MPa', '硬質陽極氧化', 'ASTM B221'],
      ['CP-880C', '高張力複合碳纖維', '≥ 1400 MPa', '防UV抗候樹脂', 'ISO 527'],
    ];

    specRows.forEach((sRow, idx) => {
      const rowY = specY + 36 + idx * 36;
      ctx.fillStyle = idx === 0 ? '#1E293B' : idx % 2 === 1 ? '#0F172A' : '#1E293B';
      ctx.fillRect(startX, rowY, canvas.width - 140, 36);

      ctx.strokeStyle = '#334155';
      ctx.strokeRect(startX, rowY, canvas.width - 140, 36);

      let colX = startX;
      sRow.forEach((c) => {
        ctx.fillStyle = idx === 0 ? '#93C5FD' : '#E2E8F0';
        ctx.font = idx === 0 ? 'bold 14px sans-serif' : '13px sans-serif';
        ctx.fillText(c, colX + 12, rowY + 23);
        colX += (canvas.width - 140) / 5;
      });
    });
  } else {
    // 16:9 Presentation slide layout
    const startX = 70;
    const startY = 160;

    // Slide Sub-Card 1
    ctx.fillStyle = '#0F172A';
    ctx.roundRect(startX, startY, 540, 460, 12);
    ctx.fill();
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('▍核心簡報亮點分析', startX + 24, startY + 44);

    const bullets = [
      '• 跨平台高保真格式置換技術',
      '• 深度視覺解析保留 100% 表格與美編色彩',
      '• 自動自適應頁面欄寬與字型階層',
      '• 支援 PPTX 向量投影片轉為 PDF 與報告書',
      '• 單檔下載與一鍵整批壓縮檔打包 (ZIP)',
    ];

    bullets.forEach((b, i) => {
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '16px sans-serif';
      ctx.fillText(b, startX + 24, startY + 95 + i * 44);
    });

    // Slide Sub-Card 2 (Table)
    const rightX = startX + 570;
    ctx.fillStyle = '#0F172A';
    ctx.roundRect(rightX, startY, 570, 460, 12);
    ctx.fill();
    ctx.strokeStyle = '#818CF8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#A5B4FC';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('▍各格式保真矩陣評估', rightX + 24, startY + 44);

    const matrixHeaders = ['來源格式', '目標格式', '表格保真', '美編還原度'];
    const matrixRows = [
      ['PPT / PPTX', 'PDF / DOCX', '100%', '99.5%'],
      ['圖面 / 掃描', 'PDF / WORD', '99.8%', '99.2%'],
      ['圖面 / 照片', 'EXCEL (XLSX)', '100%', '精準提取'],
      ['PDF 文件', 'WORD (DOCX)', '99.6%', '自適應排版'],
      ['EXCEL 試算表', 'PDF / WORD', '100%', '斑馬紋對齊'],
    ];

    // Table inside slide
    ctx.fillStyle = '#4F46E5';
    ctx.fillRect(rightX + 20, startY + 70, 530, 36);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px sans-serif';
    let mx = rightX + 20;
    matrixHeaders.forEach((h, i) => {
      ctx.fillText(h, mx + 10, startY + 94);
      mx += 530 / 4;
    });

    matrixRows.forEach((mRow, rIdx) => {
      const my = startY + 106 + rIdx * 38;
      ctx.fillStyle = rIdx % 2 === 1 ? '#1E293B' : '#0F172A';
      ctx.fillRect(rightX + 20, my, 530, 38);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(rightX + 20, my, 530, 38);

      let colX = rightX + 20;
      mRow.forEach((c, cIdx) => {
        ctx.fillStyle = cIdx >= 2 ? '#34D399' : '#CBD5E1';
        ctx.font = cIdx >= 2 ? 'bold 14px sans-serif' : '14px sans-serif';
        ctx.fillText(c, colX + 10, my + 24);
        colX += 530 / 4;
      });
    });
  }

  // Footer mark
  ctx.fillStyle = '#64748B';
  ctx.font = '12px sans-serif';
  ctx.fillText('OmniConvert Studio • 高保真版面與美編重構樣本 • 100% 原寸保留', 70, canvas.height - 55);

  const dataUrl = canvas.toDataURL('image/png');
  const base64 = dataUrl.split(',')[1];
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });

  const fileName = `${title.replace(/\s+/g, '_')}.png`;
  return new File([blob], fileName, { type: 'image/png' });
}
