import { BsGlobeAmericas } from "react-icons/bs"
import PageAccessTemplate from "../../components/dashboard/PageAccessTemplate"
import useAuth from "../../hooks/useAuth.hooks"


const DashboardPage = () => {
  const {user} = useAuth();
  return (
    <div className="pageTemplate2">
      <PageAccessTemplate color='black' icon={BsGlobeAmericas} role='Dashboard'>
        <div className="text-3xl space-y-2">
         {user?.roles.includes("USER")?<> <pre className="mt-20 pt-5 text-danger fw-bold">Your Account Is Yet To Be Approved By The Institute</pre><pre className="text-xl">Please Wait For Approval.If still pending then contact the respective department</pre></>:""}
        </div>
      </PageAccessTemplate>
    </div>
  )
}

export default DashboardPage