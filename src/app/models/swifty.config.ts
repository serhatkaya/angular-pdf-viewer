import { PDFSource } from 'pdfjs-dist';
import { RenderTextMode } from './../pdf-viewer/pdf-viewer.component';
export interface SwiftyConfig {
    renderText?: boolean;
    renderTextMode?: RenderTextMode;
    originalSize?: boolean;
    showAll?: boolean;
    stickToPage?: boolean;
    zoomScale?: 'page-height' | 'page-fit' | 'page-width';
    autoResize?: boolean;
    fitToPage?: boolean;
    externalLinkTarget?: string;
    showBorders?: boolean;
    src: string | ArrayBuffer | PDFSource;
    isOutlineShown?: boolean;
    fileName: string;
}