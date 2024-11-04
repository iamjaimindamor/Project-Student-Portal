import { useEffect, useState } from "react";
import { IAuthUser } from "../../types/auth.types";
import axiosInstance from "../../utils/axiosInstance";
import { USERS_LIST_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";
import AuthSpinner from "../../components/general/AuthSpinner";
import UsersTableSection from "../../components/users-management/UsersTableSection";
import test from "node:test";



const UsersManagementPage = (props: any) => {
  const [users, setUsers] = useState<IAuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [managerole, setManageRole] = useState<string>('');
  const [loginUserRole , SetLoginUserRole] = useState<string>();

  const getUsersList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
      console.log(props.sendpath);
      const { data } = response;
      if (props.sendpath == "Faculty") {
        const data2 = data.filter(user => user.roles.includes("FACULTY"));
        setUsers(data2);
      }

      if (props.sendpath == "Student") {
        const data3 = data.filter(user => user.roles.includes("STUDENT"));
        setUsers(data3);
      }

      if (props.sendpath == "New Request") {
        const data4 = data.filter(user => user.roles.includes("USER"));
        if(data4.length == 0){
          toast('No New Requests!',
            {
              icon: '🐳',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
        }else{
          if(props.sendpath == "New Request" && loginUserRole=="HOD" && users.length !== 0){
            toast('New Request!! \n\n Approve And Assign The Access To New User.',
              {
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
          }else if(props.sendpath == "New Request"&& loginUserRole=="FACULTY" && users.length !== 0){
            toast('New Student Request!!! \n\n Approve And Assign The Access To New Student.',
              {
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
          }
        }
        setUsers(data4);
      }
      setLoading(false);
    } catch (error) {
      toast.error('An Error occurred. Please Contact admins');
      setLoading(false);
    }
  };

  useEffect(() => {
    const loginuserdatastring: any = localStorage.getItem('user');
    const loginuserdata = JSON.parse(loginuserdatastring);
    SetLoginUserRole(loginuserdata.role);
    setManageRole(props.sendpath);
    getUsersList();
  }, [props]);

  if (loading) {
    return (
      <div className="w-full">
        <AuthSpinner />
      </div>
    );
  }
  return (
    <div className="pageTemplate2">
      <h1 className='text-2xl font-bold'>{managerole} Management</h1>
      {/*<div className="grid grid-cols-1">*/}
      {/*  <UserChartSection usersList={users}/>*/}
      {/*</div>*/}
      <UsersTableSection usersList={users} />
    </div>
  );
};

export default UsersManagementPage;