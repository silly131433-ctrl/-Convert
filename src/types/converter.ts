export type SourceFormat = 
  | 'pptx' 
  | 'ppt' 
  | 'pdf' 
  | 'png' 
  | 'jpg' 
  | 'jpeg' 
  | 'webp' 
  | 'svg' 
  | 'xlsx' 
  | 'xls' 
  | 'csv' 
  | 'docx' 
  | 'doc';

export type TargetFormat = 'pdf' | 'docx' | 'xlsx';

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  sourceFormat: SourceFormat;
  targetFormat: TargetFormat;
  status: 'idle' | 'analyzing' | 'converting' | 'success' | 'error';
  progress: number;
  errorMessage?: string;
  convertedData?: {
    fileName: string;
    mimeType: string;
    size: number;
    base64: string;
    blobUrl?: string;
  };
  previewUrl?: string;
  analysisPreview?: any;
}

export interface FidelityOptions {
  aiEnhancedLayout: boolean;
  preserveTableBorders: boolean;
  preserveCellColors: boolean;
  lockAspectRatio: boolean;
  highDpiVector: boolean;
}
