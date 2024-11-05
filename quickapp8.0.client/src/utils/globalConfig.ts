import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/Paths";

// URLS
export const REGISTER_URL = '/api/Auth/register';
export const LOGIN_URL = '/api/Auth/login';
export const ME_URL = '/api/Auth/me';
export const USERS_LIST_URL = '/api/Auth/users';
export const UPDATE_ROLE_URL = '/api/Auth/update-role';
export const DELETE_ROLE_URL = '/api/Auth/users';
export const USERNAMES_LIST_URL = '/api/Auth/users';
export const LOGS_URL = '/api/Logs';
export const MY_LOGS_URL = '/api/Logs/mine';
export const BLOCK_URL = '/api/Auth/blocked';
export const OIDC_URL = '/connect/token';

//Exam Paths
export const ADD_SUBJECT = 'add-subjects';
export const DELETE_SUBJECT = 'delete-subject';
export const GET_ALL_SUB = 'get-subjects';
export const ASSIGN_SUB = 'assign-subject-to-faculty';
export const GET_ASSIGN_SUB = 'assigned-faculty';
export const DELETE_ASSIGN_SUB = 'remove-assigned-subject';
export const ADD_EXAM = 'start-exam';
export const REMOVE_EXAM = 'delete-exam';
export const GET_EXAMSLIST = 'get-exams-list';

// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;