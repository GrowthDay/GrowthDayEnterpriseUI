/* tslint:disable */
/* eslint-disable */
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface GetCoinsPerDayRequest
 */
export interface GetCoinsPerDayRequest {
  /**
   *
   * @type {string}
   * @memberof GetCoinsPerDayRequest
   */
  date?: string
  /**
   *
   * @type {string}
   * @memberof GetCoinsPerDayRequest
   */
  eventType?: GetCoinsPerDayRequestEventTypeEnum
}

export const GetCoinsPerDayRequestEventTypeEnum = {
  UserUpassCreate: 'USER_UPASS_CREATE',
  UserSocialGoogCreate: 'USER_SOCIAL_GOOG_CREATE',
  UserSocialFbCreate: 'USER_SOCIAL_FB_CREATE',
  UserUpdate: 'USER_UPDATE',
  UserProfileCompletion: 'USER_PROFILE_COMPLETION',
  LoginEmailPass: 'LOGIN_EMAIL_PASS',
  LoginSocialGoog: 'LOGIN_SOCIAL_GOOG',
  ForgotPassword: 'FORGOT_PASSWORD',
  DashboardView: 'DASHBOARD_VIEW',
  ReportIssue: 'REPORT_ISSUE',
  ReportFeedback: 'REPORT_FEEDBACK',
  DailyJournalView: 'DAILY_JOURNAL_VIEW',
  DailyJournalCreate: 'DAILY_JOURNAL_CREATE',
  DailyJournalDelete: 'DAILY_JOURNAL_DELETE',
  DailyJournalUpdate: 'DAILY_JOURNAL_UPDATE',
  DailyJournalSelectPrompt: 'DAILY_JOURNAL_SELECT_PROMPT',
  DailyJournalViewHistory: 'DAILY_JOURNAL_VIEW_HISTORY',
  HabitCreate: 'HABIT_CREATE',
  HabitUpdate: 'HABIT_UPDATE',
  QuoteCardCreate: 'QUOTE_CARD_CREATE',
  StreakJournal5: 'STREAK_JOURNAL_5',
  DailyHabitCreate: 'DAILY_HABIT_CREATE',
  DailyHabitDelete: 'DAILY_HABIT_DELETE',
  StreakHabit5: 'STREAK_HABIT_5',
  DailyAssessmentCreate: 'DAILY_ASSESSMENT_CREATE',
  StreakDailyAssessment1: 'STREAK_DAILY_ASSESSMENT_1',
  WeeklyAssessmentCreate: 'WEEKLY_ASSESSMENT_CREATE',
  WeeklyAssessmentDelete: 'WEEKLY_ASSESSMENT_DELETE',
  StreakWeeklyAssessment4: 'STREAK_WEEKLY_ASSESSMENT_4',
  MonthlyLifeAssessmentCreate: 'MONTHLY_LIFE_ASSESSMENT_CREATE',
  MonthlyLifeAssessmentDelete: 'MONTHLY_LIFE_ASSESSMENT_DELETE',
  FirstEverMonthlyLifeAssessmentCreate: 'FIRST_EVER_MONTHLY_LIFE_ASSESSMENT_CREATE',
  LiveEventRegister: 'LIVE_EVENT_REGISTER',
  LiveEventStart: 'LIVE_EVENT_START',
  LiveEventComplete: 'LIVE_EVENT_COMPLETE',
  FirstEverLiveEventComplete: 'FIRST_EVER_LIVE_EVENT_COMPLETE',
  StreakMonthlyLifeAssessment6: 'STREAK_MONTHLY_LIFE_ASSESSMENT_6',
  StreakMonthlyLifeAssessment12: 'STREAK_MONTHLY_LIFE_ASSESSMENT_12',
  AttendMonthlyLiveWebinar: 'ATTEND_MONTHLY_LIVE_WEBINAR',
  ChallengeRegister: 'CHALLENGE_REGISTER',
  Challenge5ConsecutiveTasksCompletedOnTime: 'CHALLENGE_5_CONSECUTIVE_TASKS_COMPLETED_ON_TIME',
  Challenge10ConsecutiveTasksCompletedOnTime: 'CHALLENGE_10_CONSECUTIVE_TASKS_COMPLETED_ON_TIME',
  Challenge15ConsecutiveTasksCompletedOnTime: 'CHALLENGE_15_CONSECUTIVE_TASKS_COMPLETED_ON_TIME',
  ChallengeInProgress: 'CHALLENGE_IN_PROGRESS',
  ChallengeLeft: 'CHALLENGE_LEFT',
  ChallengeComplete: 'CHALLENGE_COMPLETE',
  AllChallengeTasksCompletedOnTime: 'ALL_CHALLENGE_TASKS_COMPLETED_ON_TIME',
  ChallengeTasksCompleted: 'CHALLENGE_TASKS_COMPLETED',
  GoalCreate: 'GOAL_CREATE',
  ProjectSetDueDate: 'PROJECT_SET_DUE_DATE',
  PlanCreatedWithAtLeast10Actions: 'PLAN_CREATED_WITH_AT_LEAST_10_ACTIONS',
  TaskComplete: 'TASK_COMPLETE',
  GoalComplete: 'GOAL_COMPLETE',
  QuoteShare: 'QUOTE_SHARE',
  AchievementAllMonthLiveEvent: 'ACHIEVEMENT_ALL_MONTH_LIVE_EVENT',
  AchievementFirstLiveEvent: 'ACHIEVEMENT_FIRST_LIVE_EVENT',
  AchievementCourse: 'ACHIEVEMENT_COURSE',
  AchievementMember: 'ACHIEVEMENT_MEMBER',
  AchievementReferral: 'ACHIEVEMENT_REFERRAL',
  AchievementJournal: 'ACHIEVEMENT_JOURNAL',
  AchievementLifeScore: 'ACHIEVEMENT_LIFE_SCORE',
  Achievement: 'ACHIEVEMENT'
} as const

export type GetCoinsPerDayRequestEventTypeEnum =
  typeof GetCoinsPerDayRequestEventTypeEnum[keyof typeof GetCoinsPerDayRequestEventTypeEnum]
