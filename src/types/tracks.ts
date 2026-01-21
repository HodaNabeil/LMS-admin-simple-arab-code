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
export type GetTrackResponse =
  components['schemas']['WrappedResponseTrackResponseDto'];
export type CreateTrackResponse =
  components['schemas']['WrappedResponseTrackResponseDto'];
export type UpdateTrackResponse =
  components['schemas']['WrappedResponseTrackResponseDto'];
export type DeleteTrackResponse =
  components['schemas']['WrappedResponseDeleteResponseDto'];
