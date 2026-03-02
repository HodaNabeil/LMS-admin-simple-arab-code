export enum Directions {
  RTL = "rtl",
  LTR = "ltr",
}

export enum Languages {
  ENGLISH = "en",
  ARABIC = "ar",
}

export enum Routes {
  ROOT = "/",
  AUTH = "auth",
  PROFILE = "profile",
  ADMIN = "admin",
  PATHS = "paths",
  TRACKS = "tracks",
  CREATE_TRACKS = "tracks/create",
  EDIT_TRACKS = "tracks/edit",
  SETTINGS = "settings",
  PLATFORM = "platform",
  PAYMENT = "payment",
  LOCALE = "locale",
  SECURITY = "security",
}

export enum Pages {
  SIGNIN = "signin",
  SIGNUP = "signup",
  LOGIN = "login",
  VERIFY_ACCOUNT = "verify-account",
  FORGOT_PASSWORD = "forgot-password",
  ENTER_OTP = "enter-otp",
  RESET_PASSWORD = "reset-password",
  LOGOUT = "logout",
  USERS = "users",
  PATHS = "paths",
  CREATE_COURSES = "courses/create",
  GOALS = "manage/goals",
  BASICS = "manage/basics",
  PRICING = "manage/pricing",
  AVAILABILITY = "manage/availability",
  MANAGE = "manage",
  MEDIA = "manage/media",
  COURSES = "courses",
  CURRICULUM = "curriculum",
  LESSONS = "lessons",
  EDIT_COURSE = "courses/edit",
  SETTINGS = "settings",
  CONTENT = "content",
  VIDEOS = "videos",
  FILES = "files",
  ANALYTICS = "analytics",
  GENERAL = "general",
  SALES = "sales",
  ORDERS = "orders",
  PAYMENTS = "payments",
  REFUNDS = "refunds",
  COUPONS = "coupons",
  CREATE_COUPONS = "coupons/create",
  REVIEWS = "reviews",
  COMMENTS = "comments",
  MESSAGES = "messages",
  EMAIL = "email",
  NOTIFICATIONS = "notifications",
  TEAM = "team",
  MEMBERS = "members",
  INVITE = "invite",
  ADMINS = "admins",
  TRACKS = "tracks",
  CREATE_TRACKS = "tracks/create",
  CREATE_PAYMENTS = "payments/create",
  CREATE_REVIEWS = "reviews/create",
}

export enum InputTypes {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  DATE = "date",
  TIME = "time",
  DATE_TIME_LOCAL = "datetime-local",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  PHONE = "phone",
  TEXTAREA = "textarea",
  FILE = "file",
  IMAGE = "image",
  COLOR = "color",
  RANGE = "range",
  TEL = "tel",
  URL = "url",
  SEARCH = "search",
  MONTH = "month",
  WEEK = "week",
  HIDDEN = "hidden",
  MULTI_SELECT = "multi select",
}

export enum Navigate {
  NEXT = "next",
  PREV = "prev",
}
export enum Responses {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum SortBy {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
  EMAIL = "email",
  PHONE = "phone",
  STATUS = "status",
  START_DATE = "startDate",
  END_DATE = "endDate",
}

export enum AuthMessages {
  LOGIN_SUCCESS = "Login successfully",
  LOGOUT_SUCCESS = "Logout successfully",
  REGISTER_SUCCESS = "Register successfully",
  FORGET_PASSWORD_SUCCESS = "Forget password successfully",
  RESET_PASSWORD_SUCCESS = "Reset password successfully",
}

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum Environments {
  PROD = "production",
  DEV = "development",
}
export enum UserType {
  USER = "STUDENT",
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
}

export enum StatusLesson {
  LOCKED = "locked",
  UNLOCKED = "unlocked",
  PREVIEW = "preview",
}

export enum Level {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  ALL_LEVELS = "ALL_LEVELS",
}

export enum CreateCouponDtoType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED"
}
