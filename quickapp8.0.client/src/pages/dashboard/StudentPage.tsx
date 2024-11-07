import { FaUserTie } from "react-icons/fa"
import PageAccessTemplate from "../../components/dashboard/PageAccessTemplate"
import useAuth from "../../hooks/useAuth.hooks";

const StudentPage = () => {
  const { user } = useAuth();
  return (
    <div className='pageTemplate2'>
        <p className="display-2 text-center">Student Profile</p>
      <PageAccessTemplate color="black" icon={FaUserTie} role="Student">
        <br/>
        <div className="display-6 item-right">
          <b>Student Institute ID :</b> <i>{user?.id}</i>
          <br />
          <b>Fullname :</b> <i>{user?.fullName}</i>
          <br />
          <b>Username :</b> <i>{user?.userName}</i>
          <br />
          <b>Email :</b> <i>{user?.email}</i>
          <br />
          <b>Role :</b> <i>{user?.roles}</i>
          <br />
        </div>
      </PageAccessTemplate>
      <pre>Created At:<i>{user?.createdAt}</i></pre>
    </div>
  );
};

export default StudentPage;