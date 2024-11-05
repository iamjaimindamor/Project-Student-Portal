import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth.hooks'
import axiosInstance from '../../utils/axiosInstance';
import { GET_ASSIGN_SUB, GET_USER_BY_USERNAME } from '../../utils/globalConfig';
import Button from '../../components/general/Button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import MarksEntry from '../../components/grading-mechanism/MarksEntry';
import GradedStudent from '../../components/graded-student/GradedStudent';

const Grading = () => {

    const { user } = useAuth();
    const [currentUserId, SetCurrentUserId] = useState();
    const [assignedsubject, setAssignedSubject] = useState<[{ subjectID: string, subjectName: string }]>();
    const [search, setSearch] = useState<string>("");
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({ mode: "onChange" });
    const [updateData, SetUpdateState] = useState<boolean>(false);

    const getUserIdByUsername = async (Username?: string) => {
        const currentUser = await axiosInstance.get(GET_USER_BY_USERNAME + "/" + user?.userName);
        if (currentUser) {
            SetCurrentUserId(currentUser.data.id);
        }
    };

    getUserIdByUsername(user?.userName);

    useEffect(() => {

        ; (async () => {
            const result = await axiosInstance.get(GET_ASSIGN_SUB);
            setAssignedSubject(result.data);
        })()

    }, []);

    const [subjectIds, setSubjectIds] = useState<string[]>([]);
    useEffect(() => {
        const ids = assignedsubject
            ?.filter((sublist: any) => sublist.facultyID == currentUserId)
            .map((sub: any) => sub.facultySubject.subjectID);
        setSubjectIds(ids || []);
    }, [assignedsubject, currentUserId])


    return (
        <>
            <div className="p-1 w-100 mx-auto flex flex-col gap-4">
                <div className="bg-white p-2 rounded-md flex flex-col gap-4">
                    <div>
                        <h4 className='display-4'>Hey , {user?.userName}</h4>
                        <br />
                        <br />
                        <p className='text-2xl font-bold'>Your Subjects :&nbsp;
                            <span className='font-normal'>
                                {assignedsubject?.filter((sublist: any) => {
                                    return sublist.facultyID == currentUserId
                                }).map((sub: any) => (
                                    sub.facultySubject.subjectName
                                )).join(' , ')}
                            </span>
                        </p>
                    </div>
                </div>
                <div>
                    <h4 className='text-danger text-xl bg-white pt-1 pb-1 pl-2'>*Below is List Of Student Opted This Subject.</h4>
                    {assignedsubject?.filter((sublist: any) => {
                                    return sublist.facultyID == currentUserId
                                }).length != 0?<MarksEntry yourSubject={subjectIds} />:<pre className='display-6 bg-white'><span style={{color:"red"}} className='display-6'>NOTE : </span>Subjects Are Not Assigned Yet Contact Admin</pre>}
                </div>
                <div className='bg-white p-2 rounded-md flex flex-col gap-4'>
                    <h3 className='display-4'>Graded Students</h3>
                    <GradedStudent yourSubject={subjectIds}/>
                </div>
            </div>

        </>)
}

export default Grading