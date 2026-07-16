export interface ImagePayload {
  imageId: string;
  imageBase64: string;
  mimeType: string;
  isProcessed: boolean;
  hasAssociatedInvoice: boolean;
}
