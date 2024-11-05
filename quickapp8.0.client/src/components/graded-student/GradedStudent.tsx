import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth.hooks';
import { IAuthUser } from '../../types/auth.types';
import axiosInstance from '../../utils/axiosInstance';
import { DELETE_RESULT_INFO, GET_ALL_SELECTED_SUB, GET_RESULTS, GET_USER_BY_USERNAME, USERS_LIST_URL } from '../../utils/globalConfig';
import toast from 'react-hot-toast';
import Button from '../general/Button';

const GradedStudent = (props?: any) => {
    const [results, setResults] = useState<any>();
    const { user } = useAuth();
    const [users, setUsers] = useState<IAuthUser[] | any>([]);
    const [optedsubject, setOptedSubject] = useState<[{ subjectID: string, subjectName: string }]>();
    const [search, setSearch] = useState<string>("");
    const [updateData, SetUpdateState] = useState<boolean>(false);
    const [currentStudent, SetCurrentStudent] = useState<boolean>(false);
    const [loading, SetLoading] = useState<boolean>(false);
    const [currentUserId, SetCurrentUserId] = useState();
    const [currentSubject, SetCurrentSubject] = useState();
    const [currentSubjectName, SetCurrentSubjectName] = useState();
    const [facultySubject, SetFacultySubject] = useState<any>([]);
    const getUserIdByUsername = async (Username?: string) => {

        const currentUser = await axiosInstance.get(GET_USER_BY_USERNAME + "/" + user?.userName);
        if (currentUser) {
            SetCurrentUserId(currentUser.data.id);
        }
    }
    getUserIdByUsername(user?.userName);

    const getUsersList = async () => {
        try {
            const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
            const { data } = response;
            setUsers(data);

        } catch (error) {
            toast.error('An Error occurred. Please Contact admins');
        }
    };
    const getResult = async () => {
        const result = await axiosInstance.get(GET_RESULTS);
        setResults(result.data);
    }
    useEffect(() => {
        getUsersList();
        getResult();
    }, [props.updateData, updateData]);

    useEffect(() => {
        ; (async () => {
            const result = await axiosInstance.get(GET_ALL_SELECTED_SUB);
            setOptedSubject(result.data);
        })()
        getUsersList();
        SetFacultySubject(props.yourSubject);
    }, [props, updateData]);

    const handleDelete = (id: any) => {
        axiosInstance.delete(`${DELETE_RESULT_INFO}?Id=${id}`)
            .then((response) => { SetUpdateState(!updateData); })
            .catch((error) => toast.error("Failed to delete marks entry!"))
        toast.success("Marks has been deleted successfully..");
    };

    
    return (<>
        <div className="bg-white p-2 rounded-md">
            <button className='btn btn-primary' onClick={()=>getResult()}>Refresh Data</button>
            <br />
            <br />
            <div className="grid grid-cols-7 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
                <div>No</div>
                <div>Exam Name</div>
                <div>Exam Year</div>
                <div>Student Name</div>
                <div>Subject Name</div>
                <div>Marks</div>
                <div className="flex justify-center">Actions</div>
            </div>

            {results?.filter((sublist: any) => { return facultySubject.includes(sublist.e_Subject.subjectID) }).map((sub: any, index: any) => (
                <div key={index} className="grid grid-cols-7 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
                    <div className="flex items-center">{index + 1}</div>
                    <div className="flex items-center font-semibold">{sub.gradeExam.examName}</div>
                    <div className="flex items-center font-semibold">{sub.gradeExam.examYear}</div>
                    <div className="flex items-center font-semibold">
                        {users?.filter((user: any) => user.id == sub.studentId)
                            .map((user: any, index: any) => { return <span key={index + "result"}>{user.userName}</span> })}
                    </div>
                    <div className="flex items-center font-semibold">{sub.e_Subject.subjectName}</div>
                    <div className="flex items-center font-semibold">{sub.marks}</div>
                    <div className="flex justify-center items-center">
                        <Button
                            label={"Delete Marks"}
                            onClick={() => handleDelete(sub.serialNumber)}
                            type="button"
                            variant="danger"
                        />
                    </div>
                </div>
            ))}
            <pre><i>*refresh data to get new data</i> </pre>
        </div>
    </>
    );
}

export default GradedStudent