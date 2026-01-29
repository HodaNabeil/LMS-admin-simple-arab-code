import type { components } from './api.generated';

// ============================================
// Schema Types (DTOs)
// ============================================

export type Track = components['schemas']['TrackResponseDto'];
export type CreateTrackRequest = components['schemas']['CreateTrackDto'];
export type UpdateTrackRequest = components['schemas']['UpdateTrackDto'];

// ============================================
// Response Types
// ============================================

export type ListTracksResponse =
  components['schemas']['WrappedResponseTrackListResponseDto'];
export type GetTrackResponse = {
  data: {
    track: Track;
  };
  message?: string;
  success: boolean;
};

export type CreateTrackResponse = GetTrackResponse;
export type UpdateTrackResponse = GetTrackResponse;
export type DeleteTrackResponse =
  components['schemas']['WrappedResponseDeleteResponseDto'];
