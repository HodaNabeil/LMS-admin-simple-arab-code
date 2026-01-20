/**
* AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
* Generated from OpenAPI schema
* Last updated: 2026-01-19T23:19:30.109Z
* Schema URL: https://simple-arab-code-backend-production.up.railway.app/api/docs-json
*/
 
/* eslint-disable */
// @ts-nocheck
 
export type paths = {
    "/api/auth/forgot-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Request password reset */
        post: operations["AuthController_forgotPassword[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login user */
        post: operations["AuthController_login[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Logout user */
        post: operations["AuthController_logout[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get current user */
        get: operations["AuthController_getMe[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/oauth/github": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Initiate GitHub OAuth flow */
        get: operations["OAuthController_githubAuth[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/oauth/github/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Handle GitHub OAuth callback */
        get: operations["OAuthController_githubCallback[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/oauth/google": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Initiate Google OAuth flow */
        get: operations["OAuthController_googleAuth[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/oauth/google/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Handle Google OAuth callback */
        get: operations["OAuthController_googleCallback[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Refresh access token */
        post: operations["AuthController_refreshToken[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Register a new user */
        post: operations["AuthController_register[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/request-password-setup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Request password setup for OAuth account */
        post: operations["AuthController_requestPasswordSetup[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/resend-verification": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Resend verification email */
        post: operations["AuthController_resendVerification[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/reset-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reset password */
        post: operations["AuthController_resetPassword[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/set-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set password for OAuth account */
        post: operations["AuthController_setOAuthPassword[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/verify-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Verify email address */
        post: operations["AuthController_verifyEmail[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/cart": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get current user cart
         * @description Retrieve the authenticated user's shopping cart with all items, applied coupons, and pricing details.
         */
        get: operations["CartController_getCart[1]"];
        put?: never;
        post?: never;
        /**
         * Clear cart
         * @description Remove all items from the authenticated user's shopping cart.
         */
        delete: operations["CartController_clearCart[1]"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/cart/items": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add course to cart
         * @description Add a course to the authenticated user's shopping cart. If the course is already in the cart, an error will be returned.
         */
        post: operations["CartController_addToCart[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/cart/items/{courseId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove course from cart
         * @description Remove a specific course from the authenticated user's shopping cart by course ID.
         */
        delete: operations["CartController_removeFromCart[1]"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/checkout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Initiate checkout
         * @description Convert cart to order and create payment intention. Returns checkout URL for payment.
         */
        post: operations["CheckoutController_initiateCheckout[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/coupons/apply": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Apply coupon to cart
         * @description Apply a discount coupon code to the authenticated user's shopping cart. The coupon must be valid and applicable to the cart items.
         */
        post: operations["CouponsController_applyCoupon[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/coupons/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new coupon
         * @description Create a new discount coupon. This coupon must be applied to specific courses. ADMIN can create coupons for any courses. INSTRUCTOR can only create coupons for their own courses.
         */
        post: operations["CouponsController_createCoupon[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/coupons/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove coupon from cart
         * @description Remove the currently applied discount coupon from the authenticated user's shopping cart.
         */
        delete: operations["CouponsController_removeCoupon[1]"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/coupons/validate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Validate a coupon code
         * @description Validate a coupon code to check if it is valid and can be applied. Returns coupon details if valid.
         */
        post: operations["CouponsController_validateCoupon[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List courses with filters
         * @description List all courses with optional filters. This is a public endpoint and does not require authentication. Returns published and public courses by default. You can filter by various criteria such as instructor, path, level, and more.
         */
        get: operations["CourseController_listCourses[1]"];
        put?: never;
        /**
         * Create a new course
         * @description Create a new course. Requires COURSE_CREATE permission. The trackId is required to associate the course with a track.
         */
        post: operations["CourseController_createCourse[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses/{courseId}/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get course overview by ID or slug
         * @description Retrieve course overview data including total hours, students count, ratings, lectures count, skill level, language, and description. This is a public endpoint and does not require authentication.
         */
        get: operations["CourseController_getCourseOverview[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses/{courseIdOrSlug}/lectures/{lectureId}/progress": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get progress for a specific lecture
         * @description Retrieve the progress tracking data for a specific lecture. This includes completion status, time spent, and access history. The course can be identified by either UUID or slug. Only students can access this endpoint and can only view their own progress. Students must be enrolled in the course to view progress. Returns null if no progress has been recorded yet. Examples: `/courses/nodejs-complete-guide/lectures/clx1234567890/progress`.
         */
        get: operations["ProgressController_getLectureProgress[1]"];
        /**
         * Update progress for a specific lecture
         * @description Update the progress tracking for a specific lecture. This includes marking it as completed, updating time spent, and tracking last access time. The course can be identified by either UUID or slug. Only students can access this endpoint and can only update their own progress. Students must be enrolled in the course to update progress. Examples: `/courses/nodejs-complete-guide/lectures/clx1234567890/progress`.
         */
        put: operations["ProgressController_updateLectureProgress[1]"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses/{courseIdOrSlug}/lectures/progress": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get progress for all lectures in a course
         * @description Retrieve progress tracking data for all lectures in a specific course. This includes completion status, time spent, and access history for each lecture that has been accessed by the student. The course can be identified by either UUID or slug. Only students can access this endpoint and can only view their own progress. Students must be enrolled in the course to view progress. Examples: `/courses/nodejs-complete-guide/lectures/progress`.
         */
        get: operations["ProgressController_listCourseLectureProgress[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses/{courseIdOrSlug}/progress": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get overall progress for a course
         * @description Retrieve the overall progress statistics for a student in a specific course. This includes total lectures, completed lectures, time spent, completion percentage, and last access time. The course can be identified by either UUID or slug. Only students can access this endpoint and can only view their own progress. Students must be enrolled in the course to view progress. Examples: `/courses/nodejs-complete-guide/progress`.
         */
        get: operations["ProgressController_getCourseProgress[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses/{courseIdOrSlug}/sections": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all sections for a course
         * @description Retrieve all sections within a course ordered by position, including their lectures and basic information. Each section contains an array of lectures ordered by position, plus statistics (totalLectures, totalDuration, completedLectures). The course can be identified by either UUID or slug. This is a public endpoint that does not require authentication. Progress tracking (progress field in lectures) is only included for authenticated students with active enrollments. Examples: `/courses/550e8400-e29b-41d4-a716-446655440000/sections` or `/courses/nodejs-complete-guide/sections`.
         */
        get: operations["SectionController_listSections[1]"];
        put?: never;
        /**
         * Create a new section in a course
         * @description Create a new section within a course. Requires SECTION_CREATE permission. The course can be identified by either UUID or slug. Instructors can only create sections in their own courses. Examples: `/courses/550e8400-e29b-41d4-a716-446655440000/sections` or `/courses/nodejs-complete-guide/sections`.
         */
        post: operations["SectionController_createSection[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses/{courseIdOrSlug}/sections/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a section by ID
         * @description Retrieve a specific section by its ID. The course can be identified by either UUID or slug. Example: `/courses/nodejs-complete-guide/sections/clx1234567890`. Accessible to all authenticated users.
         */
        get: operations["SectionController_getSection[1]"];
        put?: never;
        post?: never;
        /**
         * Delete a section
         * @description Delete a section from a course. Requires SECTION_DELETE permission. The course can be identified by either UUID or slug. Instructors can only delete sections from their own courses. Example: `/courses/nodejs-complete-guide/sections/clx1234567890`. Warning: This action cannot be undone.
         */
        delete: operations["SectionController_deleteSection[1]"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/courses/{courseIdOrSlug}/sections/{idOrSlug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update a section
         * @description Update a section within a course. Requires SECTION_UPDATE permission. The course can be identified by either UUID or slug. The section can be identified by either ID or slug. Instructors can only update sections in their own courses. You can update title, description, or publication status. Note: To change section positions, use the dedicated reorder endpoint (PUT /courses/:courseIdOrSlug/sections/reorder). Example: `/courses/nodejs-complete-guide/sections/clx1234567890` or `/courses/nodejs-complete-guide/sections/introduction`.
         */
        patch: operations["SectionController_updateSection[1]"];
        trace?: never;
    };
    "/api/courses/{courseIdOrSlug}/sections/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Reorder sections within a course
         * @description Update the position of multiple sections in a single atomic operation. Requires SECTION_UPDATE permission. This is the recommended way to reorder sections as it ensures consistency and prevents conflicts. All sections in the course must be included in the request with sequential positions starting from 0. The operation is performed in a transaction, so either all sections are updated or none are. Example: `/courses/nodejs-complete-guide/sections/reorder`.
         */
        patch: operations["SectionController_reorderSections[1]"];
        trace?: never;
    };
    "/api/courses/{idOrSlug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get course by ID or slug
         * @description Retrieve a course by its unique identifier (UUID) or slug. The system automatically detects whether you provided an ID or slug. Examples: `/courses/550e8400-e29b-41d4-a716-446655440000` or `/courses/nodejs-complete-guide`. This is a public endpoint and does not require authentication.
         */
        get: operations["CourseController_getCourse[1]"];
        put?: never;
        post?: never;
        /**
         * Archive course by ID or slug
         * @description Archive a course (soft delete) identified by either UUID or slug. This sets the course status to ARCHIVED. Examples: `DELETE /courses/550e8400-e29b-41d4-a716-446655440000` or `DELETE /courses/nodejs-complete-guide`. Requires COURSE_DELETE permission. Instructors can only archive their own courses.
         */
        delete: operations["CourseController_deleteCourse[1]"];
        options?: never;
        head?: never;
        /**
         * Update course by ID or slug
         * @description Update an existing course identified by either UUID or slug. Examples: `PATCH /courses/550e8400-e29b-41d4-a716-446655440000` or `PATCH /courses/nodejs-complete-guide`. Requires COURSE_UPDATE permission. Instructors can only update their own courses.
         */
        patch: operations["CourseController_updateCourse[1]"];
        trace?: never;
    };
    "/api/courses/{idOrSlug}/publish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Publish course by ID or slug
         * @description Publish a course to make it available to students, identified by either UUID or slug. Examples: `POST /courses/550e8400-e29b-41d4-a716-446655440000/publish` or `POST /courses/nodejs-complete-guide/publish`. Requires COURSE_PUBLISH permission. Instructors can only publish their own courses.
         */
        post: operations["CourseController_publishCourse[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/enrollments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get my enrolled courses
         * @description Retrieve all courses the authenticated student is enrolled in. This endpoint returns detailed information about each enrolled course including complete course details, enrollment status, and metadata. By default returns active enrollments, but can be filtered by status. This endpoint is restricted to students only.
         */
        get: operations["EnrollmentController_getMyEnrollments[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/enrollments/{courseIdOrSlug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Enroll in a course
         * @description Enroll the current authenticated student in a course. The course can be identified by either UUID or slug. This endpoint is restricted to students only - instructors and admins cannot enroll in courses. Students can only enroll themselves and cannot enroll other users. The course must be published and available for enrollment. If the student was previously enrolled but dropped, this will reactivate their enrollment. Duplicate enrollments are prevented - students cannot enroll multiple times in the same course.
         */
        post: operations["EnrollmentController_enrollInCourse[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Health check
         * @description Check if the Course Service is running
         */
        get: operations["HealthController_getHealth[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/lectures/{lectureId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a lecture by ID
         * @description Retrieve detailed information about a specific lecture by its ID. Accessible to all authenticated users. Returns lecture content including video URLs, attachments, and metadata.
         */
        get: operations["LectureController_getLecture[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get user orders
         * @description Retrieve paginated list of orders for the authenticated user.
         */
        get: operations["OrderController_getMyOrders[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/orders/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get order details
         * @description Retrieve details of a specific order by ID.
         */
        get: operations["OrderController_getOrder[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/orders/{id}/refund": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Request refund
         * @description Request a refund for an order. Can be full or partial refund.
         */
        post: operations["OrderController_requestRefund[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/paths": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all paths with optional filters
         * @description Retrieves a list of all learning paths with complete details including title, summary, description, thumbnailUrl, and metadata. Optionally filter to show only published paths. Accessible to all authenticated users.
         */
        get: operations["PathController_listPaths[1]"];
        put?: never;
        /**
         * Create a new learning path
         * @description Creates a new learning path with the provided details. Upload thumbnail image as multipart/form-data. The slug must be unique and provided by the client. SortOrder is automatically incremented. Requires PATH_CREATE permission.
         */
        post: operations["PathController_createPath[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/paths/{idOrSlug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get path by ID or slug
         * @description Retrieves a single learning path by its unique identifier (UUID) or slug. The system automatically detects whether you provided an ID or slug. Examples: `/paths/550e8400-e29b-41d4-a716-446655440000` or `/paths/web-development`. Accessible to all authenticated users.
         */
        get: operations["PathController_getPath[1]"];
        put?: never;
        post?: never;
        /**
         * Delete a path by ID or slug
         * @description Permanently deletes a learning path identified by either UUID or slug. This action cannot be undone. Cannot delete paths that have tracks. Examples: `DELETE /paths/550e8400-e29b-41d4-a716-446655440000` or `DELETE /paths/web-development`. Requires PATH_DELETE permission.
         */
        delete: operations["PathController_deletePath[1]"];
        options?: never;
        head?: never;
        /**
         * Update a path by ID or slug
         * @description Partially updates an existing learning path identified by either UUID or slug. Upload thumbnail image as multipart/form-data. All fields are optional - only provided fields will be updated. Examples: `PATCH /paths/550e8400-e29b-41d4-a716-446655440000` or `PATCH /paths/web-development`. Requires PATH_UPDATE permission.
         */
        patch: operations["PathController_updatePath[1]"];
        trace?: never;
    };
    "/api/sections/{sectionId}/lectures": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new lecture in a section
         * @description Create a new lecture within a section. Supports multiple lecture types (VIDEO, TEXT, AUDIO, QUIZ, ASSIGNMENT, LIVE_SESSION, ATTACHMENT). Requires LECTURE_CREATE permission. Instructors can only create lectures in sections belonging to their own courses. The lecture will be created at the specified position within the section.
         */
        post: operations["LectureController_createLecture[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tracks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all tracks
         * @description Get a list of all tracks. Optionally filter by path ID or published status.
         */
        get: operations["TrackController_listTracks[1]"];
        put?: never;
        /**
         * Create a new track
         * @description Create a new track within a path. Upload thumbnail image as multipart/form-data. Requires TRACK_CREATE permission (Admin only).
         */
        post: operations["TrackController_createTrack[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tracks/{idOrSlug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a track by ID or slug
         * @description Retrieve a single track by its ID or slug
         */
        get: operations["TrackController_getTrack[1]"];
        /**
         * Update a track
         * @description Update an existing track. Upload thumbnail image as multipart/form-data. All fields are optional. Requires TRACK_UPDATE permission (Admin only).
         */
        put: operations["TrackController_updateTrack[1]"];
        post?: never;
        /**
         * Delete a track
         * @description Delete an existing track. Requires TRACK_DELETE permission (Admin only).
         */
        delete: operations["TrackController_deleteTrack[1]"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get current user profile */
        get: operations["UserController_getProfile[1]"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update user profile (batch request with optional photo) */
        patch: operations["UserController_updateProfile[1]"];
        trace?: never;
    };
    "/api/users/me/email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Change user email address */
        patch: operations["UserController_changeEmail[1]"];
        trace?: never;
    };
    "/api/users/me/email/verify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Verify email change */
        post: operations["UserController_verifyEmailChange[1]"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/me/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Change user password */
        patch: operations["UserController_changePassword[1]"];
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        AddToCartDto: {
            /**
             * @description Course ID to add to cart
             * @example clxxxxx
             */
            courseId: string;
        };
        ApplyCouponDto: {
            /**
             * @description Coupon code to apply
             * @example SAVE20
             */
            code: string;
        };
        AttachmentDto: {
            /**
             * @description Text content for text-based attachments
             * @example This is the content of a text attachment...
             */
            content?: string;
            /**
             * Format: date-time
             * @description Timestamp when the attachment was created
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /**
             * @description Description of the attachment
             * @example Comprehensive slides covering NestJS fundamentals
             */
            description?: string;
            /**
             * @description Size of the attachment file in bytes
             * @example 1048576
             */
            fileSize?: number;
            /**
             * @description Unique identifier of the attachment
             * @example attachment_1
             */
            id: string;
            /**
             * @description Whether the attachment can be downloaded
             * @default true
             * @example true
             */
            isDownloadable: boolean;
            /**
             * @description MIME type of the attachment
             * @example application/pdf
             */
            mimeType?: string;
            /**
             * @description Name of the attachment
             * @example Course Slides - Introduction to NestJS
             */
            name: string;
            /**
             * @description Position of the attachment in the list
             * @example 0
             */
            position: number;
            /**
             * @description Type of attachment
             * @example PDF
             */
            type: components["schemas"]["AttachmentType"];
            /**
             * Format: date-time
             * @description Timestamp of the last attachment update
             * @example 2024-01-15T10:30:00.000Z
             */
            updatedAt: string;
            /**
             * @description URL to download or access the attachment
             * @example https://example.com/attachments/nestjs-slides.pdf
             */
            url: string;
        };
        /**
         * @description Type of attachment
         * @enum {string}
         */
        AttachmentType: AttachmentType;
        AuthResponseDto: {
            /** @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... */
            accessToken?: string;
            /** @example 15m */
            expiresIn?: string;
            /** @example /dashboard */
            redirectTo?: Record<string, never>;
            user?: components["schemas"]["UserResponseDto"];
        };
        CartCouponDto: {
            /** @description Coupon code */
            code: string;
            /** @description Coupon description */
            description?: string;
            /**
             * @description Coupon type
             * @enum {string}
             */
            type: CartCouponDtoType;
            /** @description Discount value */
            value: number;
        };
        CartItemResponseDto: {
            /**
             * Format: date-time
             * @description Date item was added
             */
            addedAt: string;
            /** @description Course ID */
            courseId: string;
            /**
             * @description Currency
             * @example USD
             */
            currency: string;
            /** @description Cart item ID */
            id: string;
            /**
             * @description Item price
             * @example 99.99
             */
            price: number;
        };
        CartResponseDto: {
            /** @description Applied coupon */
            coupon?: components["schemas"]["CartCouponDto"];
            /**
             * Format: date-time
             * @description Cart created date
             */
            createdAt: string;
            /**
             * @description Currency
             * @example USD
             */
            currency: string;
            /**
             * @description Discount amount
             * @example 20
             */
            discount: number;
            /** @description Cart ID */
            id: string;
            /** @description Cart items */
            items: components["schemas"]["CartItemResponseDto"][];
            /**
             * @description Subtotal amount
             * @example 199.99
             */
            subtotal: number;
            /**
             * @description Total amount
             * @example 179.99
             */
            total: number;
            /**
             * Format: date-time
             * @description Cart updated date
             */
            updatedAt: string;
            /** @description User ID */
            userId: string;
        };
        ChangeEmailDto: {
            /**
             * @description New email address
             * @example newemail@example.com
             */
            newEmail: string;
            /**
             * @description Current password for verification
             * @example currentPassword123!
             */
            password: string;
        };
        ChangeEmailResponseDto: {
            /** @example user@example.com */
            currentEmail: string;
            /** @example newemail@example.com */
            newEmail: string;
        };
        ChangePasswordDto: {
            /**
             * @description Current password
             * @example currentPassword123!
             */
            currentPassword: string;
            /**
             * @description New password
             * @example newStrongPassword123!
             */
            newPassword: string;
        };
        ChangePasswordResponseDto: Record<string, never>;
        CheckoutResponseDto: {
            /**
             * @description Amount in decimal format
             * @example 4999
             */
            amount: number;
            /**
             * @description Amount in cents/piasters
             * @example 499900
             */
            amountCents: number;
            /**
             * @description URL to redirect user for payment
             * @example https://accept.paymob.com/unifiedcheckout/?publicKey=xxx&clientSecret=xxx
             */
            checkoutUrl: string;
            /**
             * @description Client secret for payment
             * @example cs_xxx123
             */
            clientSecret: string;
            /**
             * @description Currency code
             * @example EGP
             */
            currency: string;
            /**
             * @description Payment intention ID from provider
             * @example int_xxx123
             */
            intentionId: string;
            /**
             * @description Order ID
             * @example clxxx123456789
             */
            orderId: string;
            /**
             * @description Order number for display
             * @example ORD-20260105-001
             */
            orderNumber: string;
        };
        CouponResponseDto: {
            /** @description Coupon code */
            code: string;
            /** @description List of course IDs this coupon applies to */
            courseIds: string[];
            /** @description Coupon description */
            description?: string;
            /**
             * Format: date-time
             * @description Coupon expiration date
             */
            expiresAt?: string;
            /** @description Coupon ID */
            id: string;
            /** @description Whether the coupon is active */
            isActive: boolean;
            /** @description Maximum discount amount */
            maxDiscountAmount?: number;
            /** @description Minimum order amount */
            minOrderAmount?: number;
            /**
             * Format: date-time
             * @description Coupon start date
             */
            startsAt?: string;
            /**
             * @description Coupon type
             * @enum {string}
             */
            type: CouponResponseDtoType;
            /** @description Discount value */
            value: number;
        };
        CouponValidationResponseDto: {
            /** @description Coupon details */
            coupon: components["schemas"]["CouponResponseDto"];
            /** @description Validation message */
            message: string;
            /** @description Whether the coupon is valid */
            valid: boolean;
        };
        CourseDto: {
            /**
             * @description Whether certificates are enabled for this course
             * @example true
             */
            certificateEnabled: boolean;
            /**
             * @description Compare at price (original price before discount)
             * @example 899
             */
            compareAtPrice?: number;
            /**
             * @description Course creation timestamp
             * @example 2025-12-13T09:44:18.436Z
             */
            createdAt: string;
            /**
             * @description Price currency
             * @example SAR
             */
            currency: string;
            /**
             * @description Full course description
             * @example Learn React.js from scratch and build interactive user interfaces.
             */
            description: string;
            /**
             * @description Total course duration in minutes
             * @example 2400
             */
            duration?: number;
            /**
             * @description Course ID
             * @example cmj4400lg0008r0lrwb02nx0l
             */
            id: string;
            /**
             * @description Instructor ID
             * @example cmj4400ja0001r0lrnphbek97
             */
            instructorId: string;
            /**
             * @description Is featured course
             * @example true
             */
            isFeatured: boolean;
            /**
             * @description Total number of lectures in the course
             * @example 45
             */
            lecturesCount?: number;
            /**
             * @description Course difficulty level
             * @example INTERMEDIATE
             * @enum {string}
             */
            level: CourseDtoLevel;
            /**
             * @description Maximum number of students allowed
             * @example 500
             */
            maxStudents?: number;
            /**
             * @description SEO meta description
             * @example Learn React.js and build interactive user interfaces
             */
            metaDescription?: string;
            /**
             * @description SEO meta title
             * @example Complete React.js Course
             */
            metaTitle?: string;
            /**
             * @description Learning objectives
             * @example [
             *       "Master React fundamentals",
             *       "Build reusable components"
             *     ]
             */
            objectives: string[];
            /**
             * @description Course preview video URL
             * @example https://example.com/videos/react-preview.mp4
             */
            previewVideo?: string;
            /**
             * @description Course price
             * @example 599
             */
            price: number;
            /**
             * @description Course publication timestamp
             * @example 2025-12-13T09:44:18.435Z
             */
            publishedAt?: string;
            /**
             * @description Average course rating
             * @example 4.5
             */
            rating?: number;
            /**
             * @description Number of ratings
             * @example 150
             */
            ratingCount?: number;
            /**
             * @description Course requirements
             * @example [
             *       "Basic JavaScript knowledge",
             *       "Understanding of HTML & CSS"
             *     ]
             */
            requirements: string[];
            /**
             * @description Short course description
             * @example Build professional user interfaces with React.js
             */
            shortDescription?: string;
            /**
             * @description Course slug
             * @example react-complete-course
             */
            slug: string;
            /**
             * @description Course status
             * @example PUBLISHED
             * @enum {string}
             */
            status: CourseDtoStatus;
            /**
             * @description Course tags
             * @example [
             *       "react",
             *       "javascript",
             *       "frontend"
             *     ]
             */
            tags: string[];
            /**
             * @description Course thumbnail image URL
             * @example https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800
             */
            thumbnailUrl: string;
            /**
             * @description Course title
             * @example React.js - Complete Guide
             */
            title: string;
            /**
             * @description Track ID this course belongs to
             * @example cmj4400kw0003r0lrdp1c2330
             */
            trackId?: string;
            /**
             * @description Course last update timestamp
             * @example 2025-12-13T09:44:18.436Z
             */
            updatedAt: string;
            /**
             * @description Course visibility
             * @example PUBLIC
             * @enum {string}
             */
            visibility: CourseDtoVisibility;
        };
        CourseListResponseDto: {
            /** @description List of courses */
            courses: components["schemas"]["CourseDto"][];
            /**
             * @description Pagination info
             * @example {
             *       "currentPage": 1,
             *       "totalPages": 5,
             *       "totalItems": 100,
             *       "itemsPerPage": 20
             *     }
             */
            pagination: Record<string, never>;
        };
        CourseOverviewDto: {
            /**
             * @description Course description
             * @example Join to NextJS and learn how to build highly dynamic...
             */
            description: string;
            /**
             * @description Last updated date
             * @example September 2024
             */
            lastUpdated: string;
            /**
             * @description Number of lectures
             * @example 42
             */
            lecturesCount: number;
            /**
             * @description Average rating
             * @example 4.5
             */
            rating: number;
            /**
             * @description Number of ratings
             * @example 139
             */
            ratingsCount: number;
            /**
             * @description Course skill level
             * @example All Levels
             */
            skillLevel: string;
            /**
             * @description Total duration in hours
             * @example 4.5
             */
            totalHours: number;
            /**
             * @description Total number of students enrolled
             * @example 4237
             */
            totalStudents: number;
        };
        CourseOverviewResponseDto: {
            /** @description Course overview data */
            overview: components["schemas"]["CourseOverviewDto"];
        };
        CourseProgressResponseDto: {
            /**
             * @description Enrollment ID
             * @example clx1234567890
             */
            enrollmentId: string;
            /** @description Course progress statistics */
            stats: components["schemas"]["ProgressStatsResponseDto"];
        };
        CourseResponseDto: {
            /** @description Course object */
            course: components["schemas"]["CourseDto"];
        };
        CreateCouponDto: {
            /**
             * @description Unique coupon code (uppercase recommended)
             * @example SAVE20
             */
            code: string;
            /**
             * @description List of course IDs this coupon applies to
             * @example [
             *       "course123",
             *       "course456"
             *     ]
             */
            courseIds: string[];
            /**
             * @description Description of the coupon
             * @example 20% off on all courses
             */
            description?: string;
            /**
             * @description Date when the coupon expires (ISO 8601 format)
             * @example 2026-12-31T23:59:59Z
             */
            expiresAt?: string;
            /**
             * @description Whether the coupon is active
             * @default true
             * @example true
             */
            isActive: boolean;
            /**
             * @description Maximum number of times this coupon can be used (total)
             * @example 100
             */
            maxUses?: number;
            /**
             * @description Maximum number of times a user can use this coupon
             * @default 1
             * @example 1
             */
            maxUsesPerUser: number;
            /**
             * @description Minimum order amount required to use this coupon
             * @example 50
             */
            minOrderAmount?: number;
            /**
             * @description Date when the coupon becomes active (ISO 8601 format)
             * @example 2026-01-01T00:00:00Z
             */
            startsAt?: string;
            /**
             * @description Type of discount
             * @example PERCENTAGE
             * @enum {string}
             */
            type: CreateCouponDtoType;
            /**
             * @description Discount value (percentage: 0-100, fixed: amount in currency)
             * @example 20
             */
            value: number;
        };
        CreateCourseDto: {
            /** @description Certificate enabled */
            certificateEnabled?: boolean;
            /** @description Compare at price */
            compareAtPrice?: number;
            /**
             * @description Currency code
             * @default USD
             * @example USD
             * @enum {string}
             */
            currency: CreateCourseDtoCurrency;
            /**
             * @description Course description
             * @example Complete Arabic course for beginners
             */
            description: string;
            /**
             * @description Total course duration in minutes
             * @example 1200
             */
            duration?: number;
            /**
             * @description Course level
             * @enum {string}
             */
            level: CreateCourseDtoLevel;
            /** @description Maximum students (0 for unlimited) */
            maxStudents?: number;
            /** @description SEO meta description */
            metaDescription?: string;
            /** @description SEO meta title */
            metaTitle?: string;
            /** @description Course objectives */
            objectives?: string[];
            /**
             * @description Course preview video URL
             * @example https://example.com/videos/course-preview.mp4
             */
            previewVideo?: string;
            /**
             * @description Course price
             * @example 99.99
             */
            price: number;
            /** @description Course requirements */
            requirements?: string[];
            /** @description Short description */
            shortDescription?: string;
            /**
             * @description URL-friendly slug for the course. If not provided, will be auto-generated from the title.
             * @example learn-arabic-for-beginners
             */
            slug?: string;
            /** @description Course tags */
            tags?: string[];
            /**
             * @description Course thumbnail image URL
             * @example https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800
             */
            thumbnailUrl: string;
            /**
             * @description Course title
             * @example Learn Arabic for Beginners
             */
            title: string;
            /**
             * @description Track ID - The course must be associated with a track
             * @example clx1234567890abcdefghij
             */
            trackId: string;
            /**
             * @description Visibility
             * @enum {string}
             */
            visibility?: CreateCourseDtoVisibility;
        };
        CreateLectureDto: {
            /**
             * @description Lecture attachments (files, documents, links, etc.)
             * @example [
             *       {
             *         "name": "Course Slides",
             *         "url": "https://example.com/slides.pdf",
             *         "type": "pdf",
             *         "description": "Comprehensive slides for this lecture",
             *         "size": 1048576,
             *         "downloadable": true
             *       },
             *       {
             *         "name": "Sample Code",
             *         "url": "https://example.com/code.zip",
             *         "type": "zip",
             *         "description": "Source code examples",
             *         "size": 512000,
             *         "downloadable": true
             *       },
             *       {
             *         "title": "External Reference",
             *         "url": "https://docs.nestjs.com",
             *         "type": "link",
             *         "description": "Official NestJS documentation"
             *       },
             *       {
             *         "title": "Code Snippet",
             *         "content": "console.log(\"Hello World\");",
             *         "type": "code",
             *         "description": "Basic JavaScript example"
             *       }
             *     ]
             */
            attachments?: string[];
            /**
             * @description Lecture content (for text-based lectures)
             * @example This lecture covers the fundamentals of NestJS including modules, controllers, and services...
             */
            content?: string;
            /**
             * @description Lecture description
             * @example Learn the basics of NestJS framework and its architecture
             */
            description?: string;
            /**
             * @description Is lecture available for free (preview)
             * @default false
             * @example false
             */
            isFree: boolean;
            /**
             * @description Lecture position in the section (0-based index). If not provided, will be auto-assigned.
             * @example 0
             */
            position?: number;
            /**
             * @description Lecture title
             * @example Introduction to NestJS
             */
            title: string;
            /**
             * @description Lecture type
             * @example VIDEO
             */
            type: components["schemas"]["LectureType"];
            /**
             * @description Video duration in seconds (for VIDEO type)
             * @example 1800
             */
            videoDuration?: number;
            /**
             * @description Video URL (required for VIDEO type)
             * @example https://example.com/videos/nestjs-intro.mp4
             */
            videoUrl?: string;
        };
        CreateSectionDto: {
            /**
             * @description Section description
             * @example Learn the basics of Node.js
             */
            description?: string;
            /**
             * @description Section position in the course (0-based index). If not provided, will be auto-assigned.
             * @example 0
             */
            position?: number;
            /**
             * @description Section title
             * @example Introduction to Node.js
             */
            title: string;
        };
        DeleteResponseDto: {
            /** @default Resource deleted successfully */
            message: string;
            /** @default true */
            success: boolean;
        };
        EnrolledCourseDto: {
            /**
             * @description Course information
             * @example {
             *       "id": "course-123",
             *       "title": "Introduction to Arabic",
             *       "description": "Learn Arabic from scratch",
             *       "slug": "intro-to-arabic",
             *       "thumbnailUrl": "https://example.com/image.jpg",
             *       "instructorId": "instructor-123",
             *       "level": "BEGINNER",
             *       "duration": 120
             *     }
             */
            course: Record<string, never>;
            /** @description Enrollment information */
            enrollment: components["schemas"]["MyEnrollmentDto"];
        };
        EnrollmentDto: {
            /**
             * @description Whether a completion certificate has been issued (only present when applicable)
             * @example false
             */
            certificateIssued?: boolean;
            /**
             * Format: date-time
             * @description Date and time when the course was completed (only present when status is COMPLETED)
             * @example 2025-01-15T10:30:00.000Z
             */
            completedAt?: string;
            /**
             * @description ID of the course
             * @example cmj4400l40006r0lrejezuq4z
             */
            courseId: string;
            /**
             * Format: date-time
             * @description Date and time when the enrollment was created
             * @example 2025-01-13T10:30:00.000Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description Date and time when the enrollment was dropped (only present when status is DROPPED)
             * @example 2025-01-15T10:30:00.000Z
             */
            droppedAt?: string;
            /**
             * Format: date-time
             * @description Date and time when the student enrolled
             * @example 2025-01-13T10:30:00.000Z
             */
            enrolledAt: string;
            /**
             * @description Unique identifier for the enrollment
             * @example cmj4400lx000pr0lrqaaazq3o
             */
            id: string;
            /**
             * @description Current status of the enrollment
             * @example ACTIVE
             * @enum {string}
             */
            status: EnrollmentDtoStatus;
            /**
             * @description ID of the enrolled student
             * @example cmj5d7tus0000o0dp8oqhild7
             */
            studentId: string;
            /**
             * Format: date-time
             * @description Date and time when the enrollment was last updated
             * @example 2025-01-13T10:30:00.000Z
             */
            updatedAt: string;
        };
        EnrollmentResponseDto: {
            /** @description The created enrollment object */
            enrollment: components["schemas"]["EnrollmentDto"];
        };
        ForgotPasswordDto: {
            /** @example user@example.com */
            email: string;
        };
        HealthResponseDto: {
            /** @default ok */
            status: string;
            timestamp: string;
            uptime: number;
        };
        InitiateCheckoutDto: {
            /**
             * @description Customer phone number for payment provider
             * @example +201234567890
             */
            customerPhone?: string;
        };
        LectureDto: {
            /**
             * @description Lecture attachments (PDFs, videos, documents, etc.)
             * @example [
             *       {
             *         "id": "attachment_1",
             *         "name": "Course Slides",
             *         "type": "PDF",
             *         "url": "https://example.com/slides.pdf",
             *         "description": "Comprehensive slides for this lecture",
             *         "fileSize": 1048576,
             *         "mimeType": "application/pdf",
             *         "isDownloadable": true,
             *         "position": 0,
             *         "createdAt": "2024-01-01T00:00:00.000Z",
             *         "updatedAt": "2024-01-01T00:00:00.000Z"
             *       },
             *       {
             *         "id": "attachment_2",
             *         "name": "Sample Code",
             *         "type": "ZIP",
             *         "url": "https://example.com/code.zip",
             *         "description": "Source code examples from the lecture",
             *         "fileSize": 512000,
             *         "mimeType": "application/zip",
             *         "isDownloadable": true,
             *         "position": 1,
             *         "createdAt": "2024-01-01T00:00:00.000Z",
             *         "updatedAt": "2024-01-01T00:00:00.000Z"
             *       },
             *       {
             *         "id": "attachment_3",
             *         "name": "External Reference",
             *         "type": "LINK",
             *         "url": "https://docs.nestjs.com",
             *         "description": "Official NestJS documentation",
             *         "isDownloadable": false,
             *         "position": 2,
             *         "createdAt": "2024-01-01T00:00:00.000Z",
             *         "updatedAt": "2024-01-01T00:00:00.000Z"
             *       }
             *     ]
             */
            attachments?: components["schemas"]["AttachmentDto"][];
            /**
             * @description Text content for TEXT type lectures
             * @example This is the detailed lecture content in markdown format...
             */
            content?: string;
            /**
             * Format: date-time
             * @description Timestamp when the lecture was created
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /**
             * @description Detailed lecture description
             * @example Learn the basics of NestJS framework and its architecture
             */
            description?: string;
            /**
             * @description Unique identifier of the lecture
             * @example clx1234567890
             */
            id: string;
            /**
             * @description Whether the lecture is freely accessible without enrollment
             * @example false
             */
            isFree: boolean;
            /**
             * @description Whether the lecture is published and visible to students
             * @example true
             */
            isPublished: boolean;
            /**
             * @description Position of lecture within the section (0-based index)
             * @example 0
             */
            position: number;
            /** @description Progress information for enrolled users (null if no progress data) */
            progress?: components["schemas"]["LectureProgressDto"] | null;
            /**
             * @description Unique identifier of the parent section
             * @example clx0987654321
             */
            sectionId: string;
            /**
             * @description Lecture title
             * @example Introduction to NestJS
             */
            title: string;
            /**
             * @description Type of lecture content
             * @example VIDEO
             */
            type: components["schemas"]["LectureType"];
            /**
             * Format: date-time
             * @description Timestamp of the last lecture update
             * @example 2024-01-15T10:30:00.000Z
             */
            updatedAt: string;
            /**
             * @description Duration of video in seconds (for VIDEO type)
             * @example 1800
             */
            videoDuration?: number;
            /**
             * @description URL to video file (for VIDEO type)
             * @example https://example.com/videos/nestjs-intro.mp4
             */
            videoUrl?: string;
        };
        LectureProgressDto: {
            /**
             * Format: date-time
             * @description When the user completed this lecture (null if not completed)
             * @example 2024-01-15T11:00:00.000Z
             */
            completedAt?: string | null;
            /**
             * @description Whether the user has completed this lecture
             * @example true
             */
            isCompleted: boolean;
            /**
             * Format: date-time
             * @description When the user last accessed this lecture
             * @example 2024-01-15T10:30:00.000Z
             */
            lastAccessedAt: string;
            /**
             * @description Total time spent on this lecture in seconds
             * @example 1200
             */
            timeSpent: number;
        };
        LectureProgressListResponseDto: {
            /** @description List of lecture progress records */
            progress: components["schemas"]["ProgressResponseDto"][];
            /**
             * @description Total number of progress records
             * @example 15
             */
            total: number;
        };
        LectureResponseDto: {
            /** @description Detailed lecture data */
            lecture: components["schemas"]["LectureDto"];
        };
        /**
         * @description Type of lecture content
         * @enum {string}
         */
        LectureType: LectureType;
        LoginDto: {
            /** @example user@example.com */
            email: string;
            /** @example Password123! */
            password: string;
            /** @example /dashboard */
            redirectTo?: string;
        };
        MyEnrollmentDto: {
            /**
             * Format: date-time
             * @description Completed at
             * @example 2024-01-01T00:00:00.000Z
             */
            completedAt?: string;
            /**
             * Format: date-time
             * @description Enrolled at
             * @example 2024-01-01T00:00:00.000Z
             */
            enrolledAt: string;
            /**
             * @description Enrollment ID
             * @example enrollment-123
             */
            id: string;
            /**
             * @description Enrollment status
             * @example ACTIVE
             */
            status: string;
        };
        MyEnrollmentsResponseDto: {
            /** @description List of enrolled courses */
            courses: components["schemas"]["EnrolledCourseDto"][];
        };
        OrderItemResponseDto: {
            /** @example course_xxx123 */
            courseId: string;
            /** @example Introduction to Arabic */
            courseName: string;
            /** @example EGP */
            currency: string;
            /** @example item_xxx123 */
            id: string;
            /** @example 499.9 */
            price: number;
            /** @example 49990 */
            priceCents: number;
        };
        OrderResponseDto: {
            /**
             * Format: date-time
             * @example 2026-01-05T10:00:00Z
             */
            completedAt?: string;
            /** @example SAVE20 */
            couponCode?: string;
            /** @example coupon_xxx123 */
            couponId?: string;
            /**
             * Format: date-time
             * @example 2026-01-05T10:00:00Z
             */
            createdAt: string;
            /** @example EGP */
            currency: string;
            /** @example 0 */
            discount: number;
            /** @example 0 */
            discountCents: number;
            /** @example user@example.com */
            email: string;
            /** @example order_xxx123 */
            id: string;
            items: components["schemas"]["OrderItemResponseDto"][];
            /** @example ORD-20260105-001 */
            orderNumber: string;
            payment?: components["schemas"]["PaymentSummaryDto"];
            /** @example COMPLETED */
            status: string;
            /** @example 499.9 */
            subtotal: number;
            /** @example 49990 */
            subtotalCents: number;
            /** @example 0 */
            tax: number;
            /** @example 0 */
            taxCents: number;
            /** @example 499.9 */
            total: number;
            /** @example 49990 */
            totalCents: number;
            /**
             * Format: date-time
             * @example 2026-01-05T10:00:00Z
             */
            updatedAt: string;
            /** @example user_xxx123 */
            userId: string;
        };
        PaginatedOrdersResponseDto: {
            /** @example 10 */
            limit: number;
            orders: components["schemas"]["OrderResponseDto"][];
            /** @example 1 */
            page: number;
            /** @example 50 */
            total: number;
            /** @example 5 */
            totalPages: number;
        };
        PathDto: {
            /**
             * @description Path category
             * @example WEB
             * @enum {string}
             */
            category: PathDtoCategory;
            /**
             * @description Created at
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /**
             * @description Path description
             * @example Detailed description...
             */
            description?: string;
            /**
             * @description Path icon
             * @example book-open
             */
            icon?: string;
            /**
             * @description Path ID
             * @example path-123
             */
            id: string;
            /**
             * @description Is published
             * @example true
             */
            isPublished: boolean;
            /**
             * @description Meta description
             * @example Complete Arabic learning path
             */
            metaDescription?: string;
            /**
             * @description Meta title
             * @example Learn Arabic
             */
            metaTitle?: string;
            /**
             * @description Parent path ID (for tracks)
             * @example null
             */
            parentId?: Record<string, never>;
            /**
             * @description Path slug
             * @example arabic-language-path
             */
            slug: string;
            /**
             * @description Sort order
             * @example 0
             */
            sortOrder: number;
            /**
             * @description Path summary
             * @example Learn Arabic step by step
             */
            summary: string;
            /**
             * @description Thumbnail URL
             * @example https://example.com/thumbnail.jpg
             */
            thumbnailUrl?: string;
            /**
             * @description Path title
             * @example Arabic Language Path
             */
            title: string;
            /** @description Tracks associated with this path */
            tracks?: components["schemas"]["TrackResponseDto"][];
            /**
             * @description Updated at
             * @example 2024-01-01T00:00:00.000Z
             */
            updatedAt: string;
        };
        PathListResponseDto: {
            /** @description List of paths */
            paths: components["schemas"]["PathDto"][];
            /**
             * @description Total count
             * @example 10
             */
            total: number;
        };
        PathResponseDto: {
            /** @description Path object */
            path: components["schemas"]["PathDto"];
        };
        PaymentSummaryDto: {
            /** @example visa */
            brand: string;
            /** @example payment_xxx123 */
            id: string;
            /** @example 4242 */
            last4: string;
            /**
             * Format: date-time
             * @example 2026-01-05T10:00:00Z
             */
            paidAt: string;
            /** @example card */
            paymentMethod: string;
            /** @example SUCCEEDED */
            status: string;
        };
        ProgressResponseDto: {
            /**
             * Format: date-time
             * @description When the lecture was completed
             * @example 2023-12-01T12:00:00Z
             */
            completedAt?: string;
            /**
             * Format: date-time
             * @description When the progress was created
             * @example 2023-12-01T12:00:00Z
             */
            createdAt: string;
            /**
             * @description Enrollment ID
             * @example clx1234567890
             */
            enrollmentId: string;
            /**
             * @description Progress ID
             * @example clx1234567890
             */
            id: string;
            /**
             * @description Whether the lecture is completed
             * @example true
             */
            isCompleted: boolean;
            /**
             * Format: date-time
             * @description When the lecture was last accessed
             * @example 2023-12-01T12:00:00Z
             */
            lastAccessedAt: string;
            /**
             * @description Lecture ID
             * @example clx1234567890
             */
            lectureId: string;
            /**
             * @description Time spent on this lecture in seconds
             * @example 300
             */
            timeSpent: number;
            /**
             * Format: date-time
             * @description When the progress was last updated
             * @example 2023-12-01T12:00:00Z
             */
            updatedAt: string;
        };
        ProgressStatsResponseDto: {
            /**
             * @description Number of completed lectures
             * @example 15
             */
            completedLectures: number;
            /**
             * @description Completion percentage (0-100)
             * @example 60
             */
            completionPercentage: number;
            /**
             * Format: date-time
             * @description When the course was last accessed
             * @example 2023-12-01T12:00:00Z
             */
            lastAccessedAt?: string;
            /**
             * @description Total number of lectures in the course
             * @example 25
             */
            totalLectures: number;
            /**
             * @description Total time spent in seconds
             * @example 7200
             */
            totalTimeSpent: number;
        };
        ProgressUpdateResponseDto: {
            /** @description Updated progress record */
            progress: components["schemas"]["ProgressResponseDto"];
        };
        RefreshTokenDataDto: {
            /**
             * @description JWT access token for API authentication
             * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbHd5dzR2bjMwMDBkOHZtMW95bmc5eWJ3IiwiaWF0IjoxNjk5MDA3NDY0LCJleHAiOjE2OTkwMDgzNjR9.tI8kGR_jZcHfHZg8QvH0pE7Y4j6u2F9Vx3q8l_x5KxE
             */
            accessToken: string;
            /**
             * @description Token expiration time in human-readable format
             * @example 15m
             */
            expiresIn: string;
        };
        RefundRequestDto: {
            /**
             * @description Reason for refund
             * @example Customer requested refund
             */
            reason?: string;
        };
        RefundResponseDto: {
            /**
             * @description The refund amount in cents
             * @example 49990
             */
            amountCents: number;
            /**
             * @description A message describing the refund result
             * @example Refund processed successfully
             */
            message: string;
            /**
             * @description The unique identifier of the refund
             * @example refund_xxx123
             */
            refundId?: string;
            /**
             * @description Indicates if the refund was successful
             * @example true
             */
            success: boolean;
        };
        RegisterDto: {
            /** @example user@example.com */
            email: string;
            /** @example John */
            firstName?: string;
            /** @example Doe */
            lastName?: string;
            /**
             * @description Password must be at least 8 characters with uppercase, lowercase, number, and special character
             * @example Password123!
             */
            password: string;
        };
        ReorderSectionsDto: {
            /**
             * @description Array of section IDs with their new positions. All sections in the course should be included for proper reordering.
             * @example [
             *       {
             *         "id": "clx1234567890",
             *         "position": 0
             *       },
             *       {
             *         "id": "clx0987654321",
             *         "position": 1
             *       },
             *       {
             *         "id": "clx1122334455",
             *         "position": 2
             *       }
             *     ]
             */
            sections: components["schemas"]["SectionPositionDto"][];
        };
        RequestPasswordSetupDto: {
            /** @example user@example.com */
            email: string;
        };
        ResendVerificationDto: {
            /** @example user@example.com */
            email: string;
        };
        ResetPasswordDto: {
            /**
             * @description Password must be at least 8 characters with uppercase, lowercase, number, and special character
             * @example NewPassword123!
             */
            password: string;
            /** @example abc123token */
            token: string;
        };
        SectionDeleteResponseDto: {
            /**
             * @description Success message
             * @example Section deleted successfully
             */
            message: string;
        };
        SectionDto: {
            /**
             * @description Course ID
             * @example clx0987654321
             */
            courseId: string;
            /**
             * Format: date-time
             * @description Section creation date
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /**
             * @description Section description
             * @example Learn the fundamentals of NestJS framework
             */
            description?: string;
            /**
             * @description Section ID
             * @example clx1234567890
             */
            id: string;
            /**
             * @description Is section published
             * @example true
             */
            isPublished: boolean;
            /** @description List of lectures in this section with progress information for enrolled users */
            lectures?: components["schemas"]["LectureDto"][];
            /**
             * @description Section position in course
             * @example 1
             */
            position: number;
            /** @description Section completion and progress statistics (included when listing sections) */
            statistics?: components["schemas"]["SectionStatisticsDto"];
            /**
             * @description Section title
             * @example Getting Started with NestJS
             */
            title: string;
            /**
             * Format: date-time
             * @description Section last update date
             * @example 2024-01-01T00:00:00.000Z
             */
            updatedAt: string;
        };
        SectionListResponseDto: {
            /**
             * @description Success message
             * @example Sections retrieved successfully
             */
            message: string;
            /**
             * @description List of sections with statistics and lectures including progress information for enrolled users
             * @example [
             *       {
             *         "id": "clx1234567890",
             *         "courseId": "clx0987654321",
             *         "title": "Getting Started with NestJS",
             *         "description": "Learn the fundamentals of NestJS framework",
             *         "position": 1,
             *         "isPublished": true,
             *         "createdAt": "2024-01-01T00:00:00.000Z",
             *         "updatedAt": "2024-01-01T00:00:00.000Z",
             *         "lectures": [
             *           {
             *             "id": "clx2345678901",
             *             "title": "Introduction to NestJS",
             *             "type": "VIDEO",
             *             "position": 0,
             *             "isPublished": true,
             *             "progress": {
             *               "isCompleted": true,
             *               "timeSpent": 1200,
             *               "lastAccessedAt": "2024-01-15T10:30:00.000Z",
             *               "completedAt": "2024-01-15T11:00:00.000Z"
             *             }
             *           }
             *         ],
             *         "statistics": {
             *           "totalLectures": 1,
             *           "totalDuration": 1800,
             *           "completedLectures": 0
             *         }
             *       }
             *     ]
             */
            sections: components["schemas"]["SectionDto"][];
            /**
             * @description Total number of sections
             * @example 10
             */
            total: number;
        };
        SectionPositionDto: {
            /**
             * @description Section ID
             * @example clx1234567890
             */
            id: string;
            /**
             * @description New position for the section (0-based index)
             * @example 0
             */
            position: number;
        };
        SectionResponseDto: {
            /**
             * @description Success message
             * @example Section retrieved successfully
             */
            message: string;
            /** @description Section data */
            section: components["schemas"]["SectionDto"];
        };
        SectionStatisticsDto: {
            /**
             * @description Number of completed lectures (for enrolled students)
             * @example 3
             */
            completedLectures: number;
            /**
             * @description Total duration of all lectures in seconds
             * @example 7200
             */
            totalDuration: number;
            /**
             * @description Total number of lectures in this section
             * @example 5
             */
            totalLectures: number;
        };
        SetOAuthPasswordDto: {
            /**
             * @description Password must be at least 8 characters with uppercase, lowercase, number, and special character
             * @example Password123!
             */
            password: string;
            /** @example abc123token */
            token: string;
        };
        TrackResponseDto: {
            /**
             * @description Track category
             * @example WEB
             * @enum {string}
             */
            category: TrackResponseDtoCategory;
            /**
             * @description Creation timestamp
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /**
             * @description Detailed description
             * @example Complete guide to frontend development...
             */
            description: string;
            /**
             * @description Icon identifier
             * @example react
             */
            icon?: string;
            /**
             * @description Track ID
             * @example track123
             */
            id: string;
            /**
             * @description Is published
             * @example true
             */
            isPublished: boolean;
            /**
             * @description SEO meta description
             * @example Learn frontend development
             */
            metaDescription?: string;
            /**
             * @description SEO meta title
             * @example Frontend Development Track
             */
            metaTitle?: string;
            /**
             * @description Path ID this track belongs to
             * @example path123
             */
            pathId: string;
            /**
             * @description Track slug
             * @example frontend-development
             */
            slug: string;
            /**
             * @description Sort order
             * @example 0
             */
            sortOrder: number;
            /**
             * @description Short summary
             * @example Learn modern frontend development
             */
            summary: string;
            /**
             * @description Thumbnail URL
             * @example https://example.com/images/track.jpg
             */
            thumbnailUrl?: Record<string, never> | null;
            /**
             * @description Track title
             * @example Frontend Development
             */
            title: string;
            /**
             * @description Last update timestamp
             * @example 2024-01-01T00:00:00.000Z
             */
            updatedAt: string;
        };
        UpdateCourseDto: {
            /** @description Certificate enabled */
            certificateEnabled?: boolean;
            /** @description Compare at price */
            compareAtPrice?: number;
            /**
             * @description Currency code
             * @example USD
             * @enum {string}
             */
            currency?: UpdateCourseDtoCurrency;
            /** @description Course description */
            description?: string;
            /** @description Featured course */
            isFeatured?: boolean;
            /**
             * @description Course level
             * @enum {string}
             */
            level?: UpdateCourseDtoLevel;
            /** @description Maximum students */
            maxStudents?: number;
            /** @description SEO meta description */
            metaDescription?: string;
            /** @description SEO meta title */
            metaTitle?: string;
            /** @description Course objectives */
            objectives?: string[];
            /** @description Preview video URL */
            previewVideoUrl?: string;
            /** @description Course price */
            price?: number;
            /** @description Course requirements */
            requirements?: string[];
            /** @description Short description */
            shortDescription?: string;
            /**
             * @description Course status
             * @enum {string}
             */
            status?: UpdateCourseDtoStatus;
            /** @description Course tags */
            tags?: string[];
            /** @description Thumbnail URL */
            thumbnailUrl?: string;
            /** @description Course title */
            title?: string;
            /** @description Track ID */
            trackId?: string;
            /**
             * @description Visibility
             * @enum {string}
             */
            visibility?: UpdateCourseDtoVisibility;
        };
        UpdateProfileResponseDto: {
            /** @example I am a passionate learner interested in technology. */
            bio?: string;
            /**
             * Format: date-time
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /** @example user@example.com */
            email: string;
            /** @example John */
            firstName?: string;
            /** @example cuid123456789 */
            id: string;
            /** @example true */
            isActive: boolean;
            /** @example true */
            isEmailVerified: boolean;
            /** @example en */
            language?: string;
            /**
             * Format: date-time
             * @example 2024-01-15T10:30:00.000Z
             */
            lastLoginAt?: string;
            /** @example Doe */
            lastName?: string;
            /** @example google */
            oauthProvider?: string;
            /**
             * Format: date-time
             * @example 2024-01-20T14:45:00.000Z
             */
            passwordChangedAt?: string;
            /** @example https://example.com/avatar.jpg */
            profilePicture?: string;
            /**
             * @example STUDENT
             * @enum {string}
             */
            role: UpdateProfileResponseDtoRole;
            /** @example America/New_York */
            timezone?: string;
            /**
             * Format: date-time
             * @example 2024-01-01T00:00:00.000Z
             */
            updatedAt: string;
        };
        UpdateProgressDto: {
            /**
             * @description Mark lecture as completed
             * @example true
             */
            isCompleted?: boolean;
            /**
             * @description Time spent on this lecture in seconds
             * @example 300
             */
            timeSpent?: number;
        };
        UpdateSectionDto: {
            /** @description Section description */
            description?: string;
            /** @description Published status */
            isPublished?: boolean;
            /** @description Section title */
            title?: string;
        };
        UserProfileResponseDto: {
            /** @example I am a passionate learner interested in technology. */
            bio?: string;
            /**
             * Format: date-time
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /** @example user@example.com */
            email: string;
            /** @example John */
            firstName?: string;
            /** @example cuid123456789 */
            id: string;
            /** @example true */
            isActive: boolean;
            /** @example true */
            isEmailVerified: boolean;
            /** @example en */
            language?: string;
            /**
             * Format: date-time
             * @example 2024-01-15T10:30:00.000Z
             */
            lastLoginAt?: string;
            /** @example Doe */
            lastName?: string;
            /** @example google */
            oauthProvider?: string;
            /**
             * Format: date-time
             * @example 2024-01-20T14:45:00.000Z
             */
            passwordChangedAt?: string;
            /** @example https://example.com/avatar.jpg */
            profilePicture?: string;
            /**
             * @example STUDENT
             * @enum {string}
             */
            role: UserProfileResponseDtoRole;
            /** @example America/New_York */
            timezone?: string;
            /**
             * Format: date-time
             * @example 2024-01-01T00:00:00.000Z
             */
            updatedAt: string;
        };
        UserResponseDto: {
            /**
             * Format: date-time
             * @example 2024-01-01T00:00:00.000Z
             */
            createdAt: string;
            /** @example user@example.com */
            email: string;
            /** @example John */
            firstName?: string;
            /** @example cm123abc456def789 */
            id: string;
            /** @example true */
            isActive: boolean;
            /** @example true */
            isEmailVerified: boolean;
            /** @example Doe */
            lastName?: string;
            /**
             * @example STUDENT
             * @enum {string}
             */
            role: UserResponseDtoRole;
        };
        ValidateCouponDto: {
            /**
             * @description Coupon code to validate
             * @example SAVE20
             */
            code: string;
        };
        VerifyEmailChangeDto: {
            /**
             * @description New email address to verify
             * @example newemail@example.com
             */
            newEmail: string;
            /**
             * @description Email verification token
             * @example abc123def456
             */
            token: string;
        };
        VerifyEmailChangeResponseDto: {
            user: components["schemas"]["UserProfileResponseDto"];
        };
        VerifyEmailDto: {
            /** @example abc123token */
            token: string;
        };
        WrappedResponseAuthResponseDto: {
            data: components["schemas"]["AuthResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseChangeEmailResponseDto: {
            data: components["schemas"]["ChangeEmailResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseChangePasswordResponseDto: {
            data: components["schemas"]["ChangePasswordResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseCourseListResponseDto: {
            data: components["schemas"]["CourseListResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseCourseOverviewResponseDto: {
            data: components["schemas"]["CourseOverviewResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseCourseResponseDto: {
            data: components["schemas"]["CourseResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseDeleteResponseDto: {
            data: components["schemas"]["DeleteResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseLectureResponseDto: {
            data: components["schemas"]["LectureResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponsePathListResponseDto: {
            data: components["schemas"]["PathListResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponsePathResponseDto: {
            data: components["schemas"]["PathResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseRefreshTokenDataDto: {
            data: components["schemas"]["RefreshTokenDataDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseSectionDeleteResponseDto: {
            data: components["schemas"]["SectionDeleteResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseSectionListResponseDto: {
            data: components["schemas"]["SectionListResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseSectionResponseDto: {
            data: components["schemas"]["SectionResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseUpdateProfileResponseDto: {
            data: components["schemas"]["UpdateProfileResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseUserProfileResponseDto: {
            data: components["schemas"]["UserProfileResponseDto"];
            message?: string;
            success: boolean;
        };
        WrappedResponseVerifyEmailChangeResponseDto: {
            data: components["schemas"]["VerifyEmailChangeResponseDto"];
            message?: string;
            success: boolean;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    "AuthController_forgotPassword[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ForgotPasswordDto"];
            };
        };
        responses: {
            /** @description Password reset email sent */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_login[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginDto"];
            };
        };
        responses: {
            /** @description Login successful */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_logout[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Logout successful */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_getMe[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User information retrieved */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "OAuthController_githubAuth[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Redirect to GitHub OAuth authorization page */
            302: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "OAuthController_githubCallback[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Redirect to frontend with authentication */
            302: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "OAuthController_googleAuth[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Redirect to Google OAuth consent screen */
            302: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "OAuthController_googleCallback[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Redirect to frontend with authentication */
            302: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_refreshToken[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Token refreshed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseRefreshTokenDataDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_register[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RegisterDto"];
            };
        };
        responses: {
            /** @description User registered successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_requestPasswordSetup[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RequestPasswordSetupDto"];
            };
        };
        responses: {
            /** @description Password setup email sent */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_resendVerification[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ResendVerificationDto"];
            };
        };
        responses: {
            /** @description Verification email sent */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_resetPassword[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ResetPasswordDto"];
            };
        };
        responses: {
            /** @description Password reset successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_setOAuthPassword[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetOAuthPasswordDto"];
            };
        };
        responses: {
            /** @description Password set successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "AuthController_verifyEmail[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VerifyEmailDto"];
            };
        };
        responses: {
            /** @description Email verified successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseAuthResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CartController_getCart[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cart retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CartResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CartController_clearCart[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cart cleared successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CartResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CartController_addToCart[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddToCartDto"];
            };
        };
        responses: {
            /** @description Course added to cart successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CartResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CartController_removeFromCart[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID to remove from cart */
                courseId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Course removed from cart successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CartResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CheckoutController_initiateCheckout[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["InitiateCheckoutDto"];
            };
        };
        responses: {
            /** @description Checkout initiated. Redirect user to checkoutUrl. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CheckoutResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CouponsController_applyCoupon[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ApplyCouponDto"];
            };
        };
        responses: {
            /** @description Coupon applied successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CartResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CouponsController_createCoupon[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCouponDto"];
            };
        };
        responses: {
            /** @description Coupon created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CouponResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CouponsController_removeCoupon[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Coupon removed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CartResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CouponsController_validateCoupon[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ValidateCouponDto"];
            };
        };
        responses: {
            /** @description Coupon validated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CouponValidationResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CourseController_listCourses[1]": {
        parameters: {
            query?: {
                instructorId?: unknown;
                isFeatured?: boolean;
                level?: PathsApiCoursesGetParametersQueryLevel;
                limit?: number;
                maxPrice?: number;
                minPrice?: number;
                page?: number;
                search?: unknown;
                sortBy?: unknown;
                sortOrder?: PathsApiCoursesGetParametersQuerySortOrder;
                status?: PathsApiCoursesGetParametersQueryStatus;
                /** @description Filter courses by track ID */
                trackId?: unknown;
                visibility?: PathsApiCoursesGetParametersQueryVisibility;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Courses list */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseCourseListResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CourseController_createCourse[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCourseDto"];
            };
        };
        responses: {
            /** @description Course created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseCourseResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CourseController_getCourseOverview[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Course overview data */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseCourseOverviewResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "ProgressController_getLectureProgress[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: string;
                /** @description Lecture ID */
                lectureId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Lecture progress retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["ProgressResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "ProgressController_updateLectureProgress[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: string;
                /** @description Lecture ID */
                lectureId: string;
            };
            cookie?: never;
        };
        /** @description Progress update data */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateProgressDto"];
            };
        };
        responses: {
            /** @description Lecture progress updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["ProgressUpdateResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "ProgressController_listCourseLectureProgress[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Course lecture progress retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["LectureProgressListResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "ProgressController_getCourseProgress[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Course progress retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["CourseProgressResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "SectionController_listSections[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sections retrieved successfully with lectures and statistics included */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseSectionListResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "SectionController_createSection[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: string;
            };
            cookie?: never;
        };
        /** @description Section creation data */
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateSectionDto"];
            };
        };
        responses: {
            /** @description Section created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseSectionResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "SectionController_getSection[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: unknown;
                /** @description Section ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Section retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseSectionResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "SectionController_deleteSection[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: unknown;
                /** @description Section ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Section deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseSectionDeleteResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "SectionController_updateSection[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: unknown;
                /** @description Section ID or slug (e.g., "clx1234567890" or "introduction") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        /** @description Section update data */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateSectionDto"];
            };
        };
        responses: {
            /** @description Section updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseSectionResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "SectionController_reorderSections[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                courseIdOrSlug: string;
            };
            cookie?: never;
        };
        /** @description Array of section IDs with their new positions. Must include all sections in the course. */
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReorderSectionsDto"];
            };
        };
        responses: {
            /** @description Sections reordered successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseSectionDeleteResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CourseController_getCourse[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Course found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseCourseResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CourseController_deleteCourse[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Course archived successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseDeleteResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CourseController_updateCourse[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateCourseDto"];
            };
        };
        responses: {
            /** @description Course updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseCourseResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "CourseController_publishCourse[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course ID (UUID format) or slug (e.g., "nodejs-complete-guide") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Course published successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseCourseResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "EnrollmentController_getMyEnrollments[1]": {
        parameters: {
            query?: {
                /** @description Filter courses by enrollment status */
                status?: PathsApiEnrollmentsGetParametersQueryStatus;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully retrieved student enrolled courses with complete course and enrollment details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["MyEnrollmentsResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "EnrollmentController_enrollInCourse[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Course identifier - can be either a UUID or a URL-friendly slug */
                courseIdOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Student successfully enrolled in course */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["EnrollmentResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "HealthController_getHealth[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Service is healthy */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["HealthResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
        };
    };
    "LectureController_getLecture[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Unique identifier of the lecture */
                lectureId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Lecture retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseLectureResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "OrderController_getMyOrders[1]": {
        parameters: {
            query?: {
                /** @description Items per page */
                limit?: number;
                /** @description Page number */
                page?: number;
                /** @description Sort by field */
                sortBy?: PathsApiOrdersGetParametersQuerySortBy;
                /** @description Sort order */
                sortOrder?: PathsApiOrdersGetParametersQuerySortOrder;
                /** @description Filter by order status */
                status?: PathsApiOrdersGetParametersQueryStatus;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Orders retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["PaginatedOrdersResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "OrderController_getOrder[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Order ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Order retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["OrderResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "OrderController_requestRefund[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Order ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RefundRequestDto"];
            };
        };
        responses: {
            /** @description Refund processed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["RefundResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "PathController_listPaths[1]": {
        parameters: {
            query?: {
                /** @description Filter to show only published paths */
                publishedOnly?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Paths list */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["WrappedResponsePathListResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "PathController_createPath[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * @description Path category
                     * @enum {string}
                     */
                    category: PathsApiPathsPostRequestBodyMultipartFormDataCategory;
                    /**
                     * @description Detailed description
                     * @example Complete guide to modern web development...
                     */
                    description: string;
                    /**
                     * @description Icon identifier
                     * @example code
                     */
                    icon?: string;
                    /** @description SEO meta description */
                    metaDescription?: string;
                    /** @description SEO meta title */
                    metaTitle?: string;
                    /**
                     * @description URL-friendly slug (auto-generated if not provided)
                     * @example web-development-fundamentals
                     */
                    slug?: string;
                    /**
                     * @description Short summary
                     * @example Learn web development from scratch
                     */
                    summary: string;
                    /**
                     * Format: binary
                     * @description Thumbnail image (JPEG, PNG, JPG, WebP - max 5MB)
                     */
                    thumbnail?: string;
                    /**
                     * @description Path title
                     * @example Web Development Fundamentals
                     */
                    title: string;
                    /** @description Track IDs to connect */
                    trackIds?: string[];
                };
            };
        };
        responses: {
            /** @description Path created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["WrappedResponsePathResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "PathController_getPath[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Path ID (UUID format) or slug (e.g., "web-development") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Path found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["WrappedResponsePathResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "PathController_deletePath[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Path ID (UUID format) or slug (e.g., "web-development") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Path permanently deleted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["DeleteResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "PathController_updatePath[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Path ID (UUID format) or slug (e.g., "web-development") */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * @description Path category
                     * @enum {string}
                     */
                    category?: PathsApiPathsIdOrSlugPatchRequestBodyMultipartFormDataCategory;
                    /** @description Detailed description */
                    description?: string;
                    /** @description Icon identifier */
                    icon?: string;
                    /** @description Published status */
                    isPublished?: boolean;
                    /** @description SEO meta description */
                    metaDescription?: string;
                    /** @description SEO meta title */
                    metaTitle?: string;
                    /** @description URL-friendly slug */
                    slug?: string;
                    /** @description Sort order */
                    sortOrder?: number;
                    /** @description Short summary */
                    summary?: string;
                    /**
                     * Format: binary
                     * @description Thumbnail image (JPEG, PNG, JPG, WebP - max 5MB)
                     */
                    thumbnail?: string;
                    /** @description Path title */
                    title?: string;
                    /** @description Track IDs to connect */
                    trackIds?: string[];
                };
            };
        };
        responses: {
            /** @description Path updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data?: components["schemas"]["WrappedResponsePathResponseDto"];
                        message?: string;
                        /** @default true */
                        success: boolean;
                    };
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "LectureController_createLecture[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Unique identifier of the section */
                sectionId: string;
            };
            cookie?: never;
        };
        /** @description Lecture creation data */
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateLectureDto"];
            };
        };
        responses: {
            /** @description Lecture created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseLectureResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "TrackController_listTracks[1]": {
        parameters: {
            query?: {
                /** @description Filter tracks by path ID */
                pathId?: string;
                /** @description Show only published tracks */
                publishedOnly?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of tracks */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TrackResponseDto"][];
                };
            };
        };
    };
    "TrackController_createTrack[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * @description Track category
                     * @enum {string}
                     */
                    category: PathsApiTracksPostRequestBodyMultipartFormDataCategory;
                    /**
                     * @description Detailed description
                     * @example Complete guide to frontend development...
                     */
                    description: string;
                    /**
                     * @description Icon identifier
                     * @example react
                     */
                    icon?: string;
                    /** @description SEO meta description */
                    metaDescription?: string;
                    /** @description SEO meta title */
                    metaTitle?: string;
                    /**
                     * @description Path ID that this track belongs to
                     * @example path123
                     */
                    pathId: string;
                    /**
                     * @description URL-friendly slug (auto-generated if not provided)
                     * @example frontend-development
                     */
                    slug?: string;
                    /**
                     * @description Short summary
                     * @example Learn modern frontend development
                     */
                    summary: string;
                    /**
                     * Format: binary
                     * @description Thumbnail image (JPEG, PNG, JPG, WebP - max 5MB)
                     */
                    thumbnail?: string;
                    /**
                     * @description Track title
                     * @example Frontend Development
                     */
                    title: string;
                };
            };
        };
        responses: {
            /** @description Track created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TrackResponseDto"];
                };
            };
            /** @description Bad request - validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - insufficient permissions */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Path not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "TrackController_getTrack[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Track ID or slug */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Track retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TrackResponseDto"];
                };
            };
            /** @description Track not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "TrackController_updateTrack[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Track ID or slug */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * @description Track category
                     * @enum {string}
                     */
                    category?: PathsApiTracksIdOrSlugPutRequestBodyMultipartFormDataCategory;
                    /** @description Detailed description */
                    description?: string;
                    /** @description Icon identifier */
                    icon?: string;
                    /** @description Published status */
                    isPublished?: boolean;
                    /** @description SEO meta description */
                    metaDescription?: string;
                    /** @description SEO meta title */
                    metaTitle?: string;
                    /** @description Path ID that this track belongs to */
                    pathId?: string;
                    /** @description URL-friendly slug */
                    slug?: string;
                    /** @description Sort order */
                    sortOrder?: number;
                    /** @description Short summary */
                    summary?: string;
                    /**
                     * Format: binary
                     * @description Thumbnail image (JPEG, PNG, JPG, WebP - max 5MB)
                     */
                    thumbnail?: string;
                    /** @description Track title */
                    title?: string;
                };
            };
        };
        responses: {
            /** @description Track updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TrackResponseDto"];
                };
            };
            /** @description Bad request - validation failed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - insufficient permissions */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Track not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Slug already exists */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "TrackController_deleteTrack[1]": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Track ID or slug */
                idOrSlug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Track deleted successfully */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden - insufficient permissions */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Track not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "UserController_getProfile[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Profile retrieved successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseUserProfileResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "UserController_updateProfile[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /** @description User biography */
                    bio?: string;
                    /** @description User first name */
                    firstName?: string;
                    /** @description User last name */
                    lastName?: string;
                    /**
                     * Format: binary
                     * @description Profile photo (JPEG, PNG, JPG, WEBP only, max 5MB)
                     */
                    photo?: string;
                };
            };
        };
        responses: {
            /** @description Profile updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseUpdateProfileResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "UserController_changeEmail[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChangeEmailDto"];
            };
        };
        responses: {
            /** @description Email change initiated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseChangeEmailResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "UserController_verifyEmailChange[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VerifyEmailChangeDto"];
            };
        };
        responses: {
            /** @description Email verified and updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseVerifyEmailChangeResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "UserController_changePassword[1]": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChangePasswordDto"];
            };
        };
        responses: {
            /** @description Password changed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WrappedResponseChangePasswordResponseDto"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
export enum PathsApiCoursesGetParametersQueryLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
    ALL_LEVELS = "ALL_LEVELS"
}
export enum PathsApiCoursesGetParametersQuerySortOrder {
    asc = "asc",
    desc = "desc"
}
export enum PathsApiCoursesGetParametersQueryStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED",
    UNDER_REVIEW = "UNDER_REVIEW"
}
export enum PathsApiCoursesGetParametersQueryVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    UNLISTED = "UNLISTED"
}
export enum PathsApiEnrollmentsGetParametersQueryStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED"
}
export enum PathsApiOrdersGetParametersQuerySortBy {
    createdAt = "createdAt",
    totalCents = "totalCents",
    orderNumber = "orderNumber"
}
export enum PathsApiOrdersGetParametersQuerySortOrder {
    asc = "asc",
    desc = "desc"
}
export enum PathsApiOrdersGetParametersQueryStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
    VOIDED = "VOIDED"
}
export enum PathsApiPathsPostRequestBodyMultipartFormDataCategory {
    WEB = "WEB",
    MOBILE = "MOBILE",
    OTHER = "OTHER"
}
export enum PathsApiPathsIdOrSlugPatchRequestBodyMultipartFormDataCategory {
    WEB = "WEB",
    MOBILE = "MOBILE",
    OTHER = "OTHER"
}
export enum PathsApiTracksPostRequestBodyMultipartFormDataCategory {
    WEB = "WEB",
    MOBILE = "MOBILE",
    OTHER = "OTHER"
}
export enum PathsApiTracksIdOrSlugPutRequestBodyMultipartFormDataCategory {
    WEB = "WEB",
    MOBILE = "MOBILE",
    OTHER = "OTHER"
}
export enum AttachmentType {
    PDF = "PDF",
    VIDEO = "VIDEO",
    IMAGE = "IMAGE",
    DOC = "DOC",
    DOCX = "DOCX",
    PPT = "PPT",
    PPTX = "PPTX",
    XLS = "XLS",
    XLSX = "XLSX",
    ZIP = "ZIP",
    AUDIO = "AUDIO",
    LINK = "LINK",
    TEXT = "TEXT",
    CODE = "CODE",
    HTML = "HTML",
    OTHER = "OTHER"
}
export enum CartCouponDtoType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED"
}
export enum CouponResponseDtoType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED"
}
export enum CourseDtoLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
    ALL_LEVELS = "ALL_LEVELS"
}
export enum CourseDtoStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED",
    UNDER_REVIEW = "UNDER_REVIEW"
}
export enum CourseDtoVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    UNLISTED = "UNLISTED"
}
export enum CreateCouponDtoType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED"
}
export enum CreateCourseDtoCurrency {
    USD = "USD",
    EGP = "EGP"
}
export enum CreateCourseDtoLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
    ALL_LEVELS = "ALL_LEVELS"
}
export enum CreateCourseDtoVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    UNLISTED = "UNLISTED"
}
export enum EnrollmentDtoStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED"
}
export enum LectureType {
    VIDEO = "VIDEO",
    TEXT = "TEXT",
    AUDIO = "AUDIO",
    QUIZ = "QUIZ",
    ASSIGNMENT = "ASSIGNMENT",
    LIVE_SESSION = "LIVE_SESSION",
    ATTACHMENT = "ATTACHMENT"
}
export enum PathDtoCategory {
    WEB = "WEB",
    MOBILE = "MOBILE",
    OTHER = "OTHER"
}
export enum TrackResponseDtoCategory {
    WEB = "WEB",
    MOBILE = "MOBILE",
    OTHER = "OTHER"
}
export enum UpdateCourseDtoCurrency {
    USD = "USD",
    EGP = "EGP"
}
export enum UpdateCourseDtoLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
    ALL_LEVELS = "ALL_LEVELS"
}
export enum UpdateCourseDtoStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED",
    UNDER_REVIEW = "UNDER_REVIEW"
}
export enum UpdateCourseDtoVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    UNLISTED = "UNLISTED"
}
export enum UpdateProfileResponseDtoRole {
    STUDENT = "STUDENT",
    INSTRUCTOR = "INSTRUCTOR",
    ADMIN = "ADMIN"
}
export enum UserProfileResponseDtoRole {
    STUDENT = "STUDENT",
    INSTRUCTOR = "INSTRUCTOR",
    ADMIN = "ADMIN"
}
export enum UserResponseDtoRole {
    ADMIN = "ADMIN",
    INSTRUCTOR = "INSTRUCTOR",
    STUDENT = "STUDENT"
}
