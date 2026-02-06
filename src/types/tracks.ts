/**
 * ============================================
 * Track Types - Centralized Type Definitions
 * ============================================
 * All track-related types in one place for easy access and maintenance.
 * Import from here: import { Track, TrackCategory, ... } from '@/types/tracks'
 */

import type { components } from './api.generated';
import { 
  CreateTrackDtoCategory, 
  UpdateTrackDtoCategory,
  TrackResponseDtoCategory 
} from './api.generated';

// ============================================
// Core Track Types (from API)
// ============================================

/**
 * Main Track entity from API
 * Contains all track information including id, title, slug, pathId, etc.
 */
export type Track = components['schemas']['TrackResponseDto'];

/**
 * Track category enum
 * Values: WEB, MOBILE, OTHER
 */
export type TrackCategory = TrackResponseDtoCategory;
export type CreateTrackCategory = CreateTrackDtoCategory;
export type UpdateTrackCategory = UpdateTrackDtoCategory;

/**
 * Track list data structure
 * Contains paginated tracks array and metadata
 */
export type TrackListResponseDto = components['schemas']['TrackListResponseDto'];

// ============================================
// API Request Types (DTOs)
// ============================================

/**
 * DTO for creating a new track
 * Used in track creation API calls
 */
export type CreateTrackDto = components['schemas']['CreateTrackDto'];
export type CreateTrackRequest = CreateTrackDto;

/**
 * DTO for updating an existing track
 * Used in track update API calls
 */
export type UpdateTrackDto = components['schemas']['UpdateTrackDto'];
export type UpdateTrackRequest = UpdateTrackDto;

// ============================================
// API Response Types
// ============================================

/**
 * Wrapped API response for track list (includes status, message, data)
 * Full response structure from the API endpoint
 */
export type WrappedTrackListResponse = components['schemas']['WrappedResponseTrackListResponseDto'];
export type ListTracksResponse = WrappedTrackListResponse;

/**
 * Single track response from API
 * Structure: { data: { track: Track }, message?: string, success: boolean }
 */
export type GetTrackResponse = {
  data: {
    track: Track;
  };
  message?: string;
  success: boolean;
};

/**
 * Response from creating a track
 */
export type CreateTrackResponse = GetTrackResponse;

/**
 * Response from updating a track
 */
export type UpdateTrackResponse = GetTrackResponse;

/**
 * Response from deleting a track
 */
export type DeleteTrackResponse = components['schemas']['WrappedResponseDeleteResponseDto'];

// ============================================
// Form & Validation Types
// ============================================

/**
 * Track form data structure for creation
 * Used in create track forms
 * Note: thumbnail is File object in form, but becomes URL after upload
 */
export interface TrackFormData {
  pathId: string;
  title: string;
  slug?: string;
  summary: string;
  description: string;
  category: CreateTrackCategory;
  icon?: string;
  metaTitle?: string;
  metaDescription?: string;
  thumbnail?: File;
}

/**
 * Track form data structure for editing
 * All fields optional for partial updates
 */
export interface TrackEditFormData {
  pathId?: string;
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
  category?: UpdateTrackCategory;
  icon?: string;
  isPublished?: boolean;
  sortOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
  thumbnail?: File;
  thumbnailUrl?: string;
}

/**
 * Legacy type aliases for backward compatibility
 */
export type ITrackForm = TrackFormData;
export type TrackEdit = TrackEditFormData;

// ============================================
// Component Props Types
// ============================================

/**
 * Props for track table components
 */
export interface TrackTableProps {
  tracks: Track[];
  isLoading?: boolean;
}

/**
 * Props for track form component
 */
export interface TrackFormProps {
  trackData?: Track;
  mode?: 'create' | 'edit';
}

/**
 * Props for delete track dialog
 */
export interface DeleteTrackProps {
  track: Track;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Props for track form header
 */
export interface TrackFormHeaderProps {
  title: string;
  description?: string;
}

// ============================================
// Mutation Types
// ============================================

/**
 * Payload for creating a track mutation
 */
export interface CreateTrackPayload extends Omit<TrackFormData, 'thumbnail'> {
  thumbnail?: File | string;
}

/**
 * Payload for updating a track mutation
 */
export interface UpdateTrackPayload {
  slug: string;
  data: UpdateTrackRequest;
}

/**
 * Payload for deleting a track mutation
 */
export interface DeleteTrackPayload {
  slug: string;
}

// ============================================
// Utility Types
// ============================================

/**
 * Partial track type for updates
 * All fields optional except slug
 */
export type PartialTrack = Partial<Track> & { slug: string };

/**
 * Track with required fields for creation
 */
export type NewTrack = Pick<Track, 'title' | 'pathId' | 'summary' | 'description' | 'category'> & 
  Partial<Omit<Track, 'id' | 'title' | 'pathId' | 'summary' | 'description' | 'category'>>;

/**
 * Track filter options for queries
 */
export interface TrackFilters {
  pathId?: string;
  category?: TrackCategory;
  isPublished?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Track column definition for tables
 */
export interface TrackColumnDef {
  id: string;
  header: string;
  accessorKey?: keyof Track;
  cell?: (props: { row: { original: Track } }) => React.ReactNode;
}
