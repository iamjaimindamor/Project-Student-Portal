import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import LoginPage from "../pages/public/LoginPage";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./Paths";
import RegisterPage from "../pages/public/RegisterPage";
import UnauthorizedPage from "../pages/public/UnauthorizedPage";
import AuthGuard from "../auth/AuthGuard";
import { adminAccessRoles, allAccessRoles, managerAccessRoles, ownerAccessRoles } from "../auth/auth.utils";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MyLogsPage from "../pages/dashboard/MyLogsPage";
import UserPage from "../pages/dashboard/UserPage";
import AdminPage from "../pages/dashboard/AdminPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import SystemLogsPage from "../pages/dashboard/SystemLogsPage";
import UsersManagementPage from "../pages/dashboard/UsersManagementPage";
import UpdateRolePage from "../pages/dashboard/UpdateRolePage";
import ManagerPage from "../pages/dashboard/StudentPage";
import OwnerPage from "../pages/dashboard/OwnerPage";
import AddSubject from "../pages/dashboard/AddSubject";
import AssignSubject from "../pages/dashboard/AssignSubject";
import AddExam from "../pages/dashboard/AddExam";
import Grading from "../pages/dashboard/Grading";
import SubjectSelection from "../pages/dashboard/SubjectSelection";
import Results from "../pages/dashboard/Results";
import StudentGrade from "../pages/dashboard/StudentGrade";
import FacultyPage from "../pages/dashboard/FacultyPage";
// import facultypage from "../pages/dashboard"

const GlobalRouter = () => {
    var sendpath:any
    
    return (
        <Routes>
            {/* <Route path='' element /> */}
            <Route element={<Layout />}>
          
                {/* Public routes */}
                <Route index element={<LoginPage />} />
                <Route path={PATH_PUBLIC.register} element={<RegisterPage />} />
                <Route path={PATH_PUBLIC.login} element={<LoginPage />} />
                <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />
  
                {/* Protected routes -------------------------------------------------- */}

                <Route element={<AuthGuard roles={allAccessRoles} />}> 
                    <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} />
                    <Route path={PATH_DASHBOARD.myLogs}   element={<MyLogsPage />} />
                    <Route path={PATH_DASHBOARD.user} element={<UserPage />} />
                </Route>
        
                <Route element={<AuthGuard roles={managerAccessRoles}/>}>
                    <Route path={PATH_DASHBOARD.usersManagement}  element={<UsersManagementPage sendpath="Student"/>}/>
                    <Route path={PATH_DASHBOARD.subjectSelection}  element={<SubjectSelection/>}/>
                    <Route path={PATH_DASHBOARD.facultyManagement}  element={<UsersManagementPage sendpath="Faculty"/>}/>
                    <Route path={PATH_DASHBOARD.studentProfile} element={<ManagerPage/>}/>
                    <Route path={PATH_DASHBOARD.yourMarks} element={<StudentGrade/>}/>
                </Route>

                <Route element={<AuthGuard roles={adminAccessRoles} />}>
                    <Route path={PATH_DASHBOARD.usersManagement} element={<UsersManagementPage sendpath="Student" />} />
                    <Route path={PATH_DASHBOARD.facultyManagement}  element={<UsersManagementPage sendpath="Faculty"/>}/>
                    <Route path={PATH_DASHBOARD.newUser}  element={<UsersManagementPage sendpath="New Request"/>}/>
                    <Route path={PATH_DASHBOARD.addExam}  element={<AddExam/>}/>
                    <Route path={PATH_DASHBOARD.marksEntry}  element={<Grading/>}/>
                    <Route path={PATH_DASHBOARD.subjectManagement}  element={<AddSubject/>}/>
                    <Route path={PATH_DASHBOARD.assignSubject}  element={<AssignSubject/>}/>
                    <Route path={PATH_DASHBOARD.updateRole} element={<UpdateRolePage />} />
                    <Route path={PATH_DASHBOARD.systemLogs} element={<SystemLogsPage />} />
                    <Route path={PATH_DASHBOARD.facultyPage} element={<FacultyPage />} />
                    <Route path={PATH_DASHBOARD.all_result} element={<Results />} />
                </Route>

                <Route element={<AuthGuard roles={ownerAccessRoles} />}>
                    <Route path={PATH_DASHBOARD.owner} element={<OwnerPage />} />
                </Route>
                
                <Route>
                    <Route path='*' element={<Navigate to={PATH_DASHBOARD.usersManagement} replace />} />
                </Route>

                {/* Catch all (404) */}
                <Route path={PATH_PUBLIC.notfound} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={PATH_PUBLIC.notfound} replace />} />
            </Route>
        </Routes>
    );
};
  
export default GlobalRouter;