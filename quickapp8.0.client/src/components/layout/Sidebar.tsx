import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.hooks";
import { useNavigate } from "react-router-dom";
import { RolesEnum } from "../../types/auth.types";
import Button from "../general/Button";
import { PATH_DASHBOARD } from "../../routes/Paths";
import { CiUser } from "react-icons/ci";

const Sidebar = () => {
  const { user } = useAuth();
  const [visibleButtons, setVisibleButtons] = useState({
    studentManagement: false,
    facultyManagement: false,
    allLogs: false,
    ownerPage: false,
    adminPage: false,
    managerPage: false,
    userPage: false,
    newRequest: false,
    studentOnly: false
  });
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    navigate(url);
  };

  const userRolesLabelCreator = () => {
    if (user) {
      let result = '';
      user.roles.forEach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) {
          result += ', ';
        }
      });
      return result;
    }
    return '--';
  };

  useEffect(() => {
    if (user) {
      const roles = user.roles;
      setVisibleButtons({
        studentManagement: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.ADMIN),
        facultyManagement: roles.includes(RolesEnum.OWNER),
        allLogs: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.ADMIN),
        ownerPage: roles.includes(RolesEnum.OWNER),
        adminPage: roles.includes(RolesEnum.ADMIN) || roles.includes(RolesEnum.OWNER),
        managerPage: roles.includes(RolesEnum.MANAGER) || roles.includes(RolesEnum.ADMIN) || roles.includes(RolesEnum.OWNER),
        userPage: true,  //all authenticated users access the user page
        newRequest: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.ADMIN),
        studentOnly: roles.includes(RolesEnum.MANAGER)
      });
    }
  }, [user]);

  return (
    <div className='shrink-0 bg-[#754eb4] w-60 p-2 min-h-[calc(100vh-48px)] flex flex-col items-stretch gap-8'>

      <div className='self-center flex flex-col items-center'>
        <CiUser className='w-10 h-10 text-white' />
        <h4 className='text-white'>
          {user?.fullName}
        </h4>
        <h1 className="text-white text-center ">
          Username : {user ? user.userName : '--'}
        </h1>
        <h1 className="text-white text-center">
          {userRolesLabelCreator()}
        </h1>
      </div>

      {visibleButtons.adminPage && (
        <Button
          label='Profile'
          onClick={() => handleClick(PATH_DASHBOARD.facultyPage)}
          type='button'
          variant='secondary'
        />
      )}

      {visibleButtons.facultyManagement && (
        <Button
          label='Manage Faculty'
          onClick={() => handleClick(PATH_DASHBOARD.facultyManagement)}
          type='button'
          variant='secondary'
        />
      )}

      {visibleButtons.studentManagement && (
        <Button
          label="Manage Students"
          onClick={() => handleClick(PATH_DASHBOARD.usersManagement)}
          type='button'
          variant='secondary'
        />
      )}
      {visibleButtons.newRequest && (
        <Button
          label='New User Request'
          onClick={() => handleClick(PATH_DASHBOARD.newUser)}
          type='button'
          variant='secondary'
        />
      )}
      {visibleButtons.ownerPage && (
        <Button
          label="Manage Updates"
          onClick={() => handleClick(PATH_DASHBOARD.owner)}
          type='button'
          variant='secondary'
        />
      )}
      {visibleButtons.ownerPage && (
        <Button
          label='Manage Exam'
          onClick={() => handleClick(PATH_DASHBOARD.addExam)}
          type='button'
          variant='secondary'
        />
      )}
      {visibleButtons.ownerPage && (
        <Button
          label="Manage Subjects"
          onClick={() => handleClick(PATH_DASHBOARD.subjectManagement)}
          type='button'
          variant='secondary'
        />
      )}
      {visibleButtons.studentOnly && (
      <Button
        label="Student Profile"
        onClick={() => handleClick(PATH_DASHBOARD.studentProfile)}
        type='button'
        variant='secondary'
      />
      )} 
      {visibleButtons.studentOnly && (
      <Button
        label="Subject Selection"
        onClick={() => handleClick(PATH_DASHBOARD.subjectSelection)}
        type='button'
        variant='secondary'
      />
      )}
            {visibleButtons.studentOnly && (
      <Button
        label="Your Marks"
        onClick={() => handleClick(PATH_DASHBOARD.yourMarks)}
        type='button'
        variant='secondary'
      />
      )}  
      {visibleButtons.ownerPage && (
        <Button
          label='Assign Subjects'
          onClick={() => handleClick(PATH_DASHBOARD.assignSubject)}
          type='button'
          variant='secondary'
        />
      )}
      {visibleButtons.adminPage && (
        <Button
          label='Grading Students'
          onClick={() => handleClick(PATH_DASHBOARD.marksEntry)}
          type='button'
          variant='secondary'
        />
      )}
      {visibleButtons.ownerPage && (
        <Button
          label="All Students Result"
          onClick={() => handleClick(PATH_DASHBOARD.all_result)}
          type='button'
          variant='secondary'
        />
      )}

      <hr />
      {visibleButtons.allLogs && (
        <Button
          label='All Activity Logs'
          onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
          type='button'
          variant='secondary'
        />
      )}
      <Button
        label='My Activity Logs'
        onClick={() => handleClick(PATH_DASHBOARD.myLogs)}
        type='button'
        variant='secondary'
      />

    </div>
  );
};

export default Sidebar;
