import type { components, operations } from './api.generated';

// ============================================
// Entity Types
// ============================================

export type Track = components['schemas']['TrackResponseDto'];
export type TrackCategory = components['schemas']['TrackResponseDto']['category'];

// Export the category enum for form validation and request bodies
export type CreateTrackCategory = operations['TrackController_createTrack[1]']['requestBody']['content']['multipart/form-data']['category'];

// ============================================
// Response Types
// ============================================

// API response wrapper structure
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    _apiVersion: string;
    _supportStatus: string;
}

// The actual API returns tracks nested under data.tracks
export type GetTracksResponse = ApiResponse<{
    tracks: components['schemas']['TrackResponseDto'][];
}>;

export type GetTrackResponse = components['schemas']['TrackResponseDto'];
export type CreateTrackResponse = components['schemas']['TrackResponseDto'];
export type UpdateTrackResponse = components['schemas']['TrackResponseDto'];
export type DeleteTrackResponse = void;

// ============================================
// Request Types
// ============================================

// The API spec defines thumbnail as 'string' (binary), but when actually sending
// multipart/form-data, we need to send File objects. This type override handles that.
type BaseCreateTrackRequest = operations['TrackController_createTrack[1]']['requestBody']['content']['multipart/form-data'];
type BaseUpdateTrackRequest = operations['TrackController_updateTrack[1]']['requestBody']['content']['multipart/form-data'];

export type CreateTrackRequest = Omit<BaseCreateTrackRequest, 'thumbnail'> & {
    thumbnail?: File;
};

export type UpdateTrackRequest = Omit<BaseUpdateTrackRequest, 'thumbnail'> & {
    thumbnail?: File;
};
