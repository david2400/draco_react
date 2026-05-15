/**
 * Media Types - Tipos para contenido multimedia
 */

// Tipos de media soportados
export type MediaType = 'image' | 'audio' | 'video' | 'document';

// Media adjunta a una pregunta u opción
export interface QuestionMedia {
  id: string;
  type: MediaType;
  url: string;
  alt?: string;
  caption?: string;
  mimeType?: string;
  size?: number;
  duration?: number; // Para audio/video en segundos
  width?: number;    // Para imágenes
  height?: number;   // Para imágenes
}

// Input para subir nuevo media
export interface MediaUploadInput {
  file: File;
  alt?: string;
  caption?: string;
}

// Estado de carga de media
export interface MediaUploadState {
  isUploading: boolean;
  progress: number;
  error?: string;
}

// Helper para generar ID de media
export function generateMediaId(): string {
  return `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Helper para determinar tipo de media por MIME type
export function getMediaTypeFromMime(mimeType: string): MediaType {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('video/')) return 'video';
  return 'document';
}

// Helper para validar si es un tipo de media soportado
export function isSupportedMediaType(mimeType: string): boolean {
  const supportedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'video/mp4',
    'video/webm',
    'application/pdf',
  ];
  return supportedTypes.includes(mimeType);
}
