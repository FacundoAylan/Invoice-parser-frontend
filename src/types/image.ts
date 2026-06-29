export interface ImagePayload {
  imageBase64: string;
  mimeType: string;
}

export interface ImagePreview {
  file: File;
  url: string;
}