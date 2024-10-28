import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/general/Spinner';
import { IAuthUser, IUpdateRoleDto } from '../../types/auth.types';
import axiosInstance from '../../utils/axiosInstance';
import { BLOCK_URL, UPDATE_ROLE_URL, USERS_LIST_URL } from '../../utils/globalConfig';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth.hooks';
import { allowedRolesForUpdateArray, isAuthorizedForUpdateRole } from '../../auth/auth.utils';
import Button from '../../components/general/Button';


const UpdateRolePage = () => {
  const { user: loggedInUser } = useAuth();
  const { userName } = useParams();
  const [user, setUser] = useState<IAuthUser>();
  const [role, setRole] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(user?.isBlocked);

  // const handleCheckboxChange = (user : any) => {
  //   setBlocked(user.target.checked);
  // };

  const getUserByUserName = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser>(`${USERS_LIST_URL}/${userName}`);
      const { data } = response;
      if (!isAuthorizedForUpdateRole(loggedInUser!.roles[0], data.roles[0])) {
        setLoading(false);
        toast.error('You are not allowed to change role of this user');
        navigate('/dashboard/users-management');
      } else {
        setUser(data);
        setRole(data?.roles[0]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 404) {
        toast.error('UserName not Found!!!');
      } else {
        toast.error('An Error occured. Please contact admins');
      }
      navigate('/dashboard/users-management');
    }
  };

  const handleCheckboxChange = async (id : any) => {
    try {
      await axiosInstance.post<IAuthUser>(`${BLOCK_URL}/${id}`);
      toast.success(`User ${user?.isBlocked? "Blocked" :"UnBlocked"}`);
    } catch (error) {
      const err = error as { data:string, status:number};
      toast.error(err.data);
    }
  };

  const UpdateRole = async () => {
    try {
      if (!role || !userName) return;
      setPostLoading(true);
      const updateData: IUpdateRoleDto = {
        newRole: role,
        userName,
      };
      await axiosInstance.post(UPDATE_ROLE_URL, updateData);
      setPostLoading(true);
      toast.success('Role updated Successfully.');
      navigate('/dashboard/users-management');
    } catch (error) {
      setPostLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 403) {
        toast.error('You are not allowed to change role of this user');
      } else {
        toast.error('An Error occurred. Please contact admins');
      }
      navigate('/dashboard/users-management');
    }
  };

  useEffect(() => {
    getUserByUserName();
  }, [checked]);

  if (loading) {
    return (
      <div className='w-full'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='p-4 w-2/4 mx-auto flex flex-col gap-4'>
      <div className='bg-white p-2 rounded-md flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Update Role</h1>

        <div className='border border-dashed border-purple-300 rounded-md'>
          <h4 className='text-2xl'>
            UserName :
            <span className='text-2xl ml-2 px-2 py-1 text-black rounded-md'>{userName}</span>
          </h4>
          <h4 className='text-2xl'>
            Current Role :
            <span className='text-2xl ml-2 px-2 py-1 text-black rounded-md'>{user?.roles[0]}</span>
          </h4>
        </div>

        <h4 className='text-xl font-bold'>New Role:</h4>

        <select value={role} className='w-60' onChange={(e) => setRole(e.target.value)}>
          {allowedRolesForUpdateArray(loggedInUser).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div>
          <label className='font-bold'>
            <input 
             type="checkbox"
             className ='w-5'
             checked = {user?.isBlocked}
             onClick={async () => {await handleCheckboxChange(user?.id);
             setChecked(!checked);}} 
            />
            Block User
          </label>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-12'>
          <Button
            label='Cancel'
            onClick={() => navigate('/dashboard/users-management')}
            type='button'
            variant='secondary'
          />
          <Button 
           label='Update' 
           onClick={() => UpdateRole()} 
           type='button' 
           variant='secondary' 
           loading={postLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateRolePage;