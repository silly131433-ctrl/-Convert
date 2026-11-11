import JSZip from 'jszip';
import { FileItem, SourceFormat, TargetFormat } from '../types/converter';

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

export function detectSourceFormat(filename: string, mimeType?: string): SourceFormat {
  const ext = getFileExtension(filename);
  if (['pptx', 'ppt'].includes(ext)) return ext as SourceFormat;
  if (ext === 'pdf') return 'pdf';
  if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) return ext as SourceFormat;
  if (['xlsx', 'xls', 'csv'].includes(ext)) return ext as SourceFormat;
  if (['docx', 'doc'].includes(ext)) return ext as SourceFormat;

  if (mimeType?.includes('presentation') || mimeType?.includes('powerpoint')) return 'pptx';
  if (mimeType?.includes('pdf')) return 'pdf';
  if (mimeType?.includes('spreadsheet') || mimeType?.includes('excel')) return 'xlsx';
  if (mimeType?.includes('word')) return 'docx';
  if (mimeType?.startsWith('image/')) return 'png';

  return 'png';
}

export function getDefaultTargetFormat(sourceFormat: SourceFormat): TargetFormat {
  if (['pptx', 'ppt', 'xlsx', 'xls', 'csv', 'docx', 'doc'].includes(sourceFormat)) {
    return 'pdf';
  }
  if (sourceFormat === 'pdf') {
    return 'docx';
  }
  // For images / drawings: default to PDF or Word or Excel
  return 'pdf';
}

export function getSupportedTargetFormats(sourceFormat: SourceFormat): TargetFormat[] {
  switch (sourceFormat) {
    case 'pptx':
    case 'ppt':
      return ['pdf', 'docx', 'xlsx'];
    case 'pdf':
      return ['docx', 'xlsx'];
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'webp':
    case 'svg':
      return ['pdf', 'docx', 'xlsx'];
    case 'xlsx':
    case 'xls':
    case 'csv':
      return ['pdf', 'docx'];
    case 'docx':
    case 'doc':
      return ['pdf', 'xlsx'];
    default:
      return ['pdf', 'docx', 'xlsx'];
  }
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadAllAsZip(files: FileItem[]): Promise<void> {
  const successfulFiles = files.filter((f) => f.status === 'success' && f.convertedData);
  if (successfulFiles.length === 0) return;

  const zip = new JSZip();

  for (const item of successfulFiles) {
    if (item.convertedData) {
      const blob = base64ToBlob(item.convertedData.base64, item.convertedData.mimeType);
      zip.file(item.convertedData.fileName, blob);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  triggerDownload(content, `OmniConvert_Batch_${timestamp}.zip`);
}
