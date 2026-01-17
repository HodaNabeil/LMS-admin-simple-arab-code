import type { components } from './api.generated';
import { UserResponseDtoRole } from './api.generated';

export type User = components['schemas']['UserResponseDto'];
export type UserRole = UserResponseDtoRole;