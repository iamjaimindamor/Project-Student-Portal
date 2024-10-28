import { useEffect, useState } from "react";
import { IAuthUser } from "../../types/auth.types";
import axiosInstance from "../../utils/axiosInstance";
import { USERS_LIST_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";
import AuthSpinner from "../../components/general/AuthSpinner";
import UsersTableSection from "../../components/users-management/UsersTableSection";
import test from "node:test";



const UsersManagementPage = (props:any) => {
  const [users, setUsers] = useState<IAuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginuserrole,setloginuserrole] = useState<string>('');

  const getUsersList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
      console.log(props.sendpath);
      const {data} = response;
      if(props.sendpath == "faculty"){
          const data2 = data.filter(user => user.roles.includes("FACULTY"));
          console.log(data2); 
          setUsers(data2);
      }else{
         setUsers(data)
      }
       
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error('An Error occurred. Please Contact admins');
      setLoading(false);
    }
  };

  useEffect(() =>{
    const loginuserdatastring:any =  localStorage.getItem('user');
    const loginuserdata = JSON.parse(loginuserdatastring);

    console.log(loginuserdata.role);
    setloginuserrole(loginuserdata.role);

    getUsersList();
  },[]);

  if (loading) {
    return(
      <div className="w-full">
        <AuthSpinner />
      </div>
    );
  }
  return (
    <div className="pageTemplate2">
      <h1 className='text-2xl font-bold'>Student Management</h1>
      {/*<div className="grid grid-cols-1">*/}
      {/*  <UserChartSection usersList={users}/>*/}
      {/*</div>*/} 
   <UsersTableSection usersList={users} />
    </div>
  );
};

export default UsersManagementPage;