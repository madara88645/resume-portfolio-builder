declare module "pdf-parse" {
  interface PDFInfo {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    Title?: string;
    Author?: string;
    Subject?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
  }

  interface PDFMetadata {
    info: PDFInfo;
    metadata: any;
  }

  interface PDFData extends PDFMetadata {
    numpages: number;
    numrender: number;
    text: string;
    version: string;
  }

  function pdfParse(
    dataBuffer: Buffer,
    options?: {
      max?: number;
      version?: string;
      pagerender?: (pageData: any) => string;
    }
  ): Promise<PDFData>;

  export = pdfParse;
}
