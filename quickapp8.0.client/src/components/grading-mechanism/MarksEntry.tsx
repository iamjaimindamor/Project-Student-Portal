import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth.hooks';
import { DELETED_SELECTED_SUB, GET_ALL_SELECTED_SUB, GET_USER_BY_USERID, GET_USER_BY_USERNAME, USERS_LIST_URL } from '../../utils/globalConfig';
import Button from '../general/Button';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { IAuthUser } from '../../types/auth.types';
import GradeEntryPage from '../../pages/dashboard/GradeEntryPage';
import { Navigate } from 'react-router-dom';

const MarksEntry = (props?: any) => {
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

    useEffect(() => {

        ; (async () => {
            const result = await axiosInstance.get(GET_ALL_SELECTED_SUB);
            setOptedSubject(result.data);
        })()
        getUsersList();
        SetFacultySubject(props.yourSubject);
    }, [props, updateData]);

    const handleDelete = (id: any) => {
        axiosInstance.delete(`${DELETED_SELECTED_SUB}?Id=${id}`)
            .then((response) => { SetUpdateState(!updateData); })
            .catch((error) => toast.error("Failed to delete subject"))
        toast.success("Subject has been deleted successfully..");
    };

    return (<>

        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"><span className='display-6 font-semibold'>Submit Exam Marks</span></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <GradeEntryPage subject={currentSubject} student={currentStudent} subjectName={currentSubjectName} />
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white p-2 rounded-md">
            <div className="flex justify-between items-center">
                <div className="relative">
                    <input
                        type="text"
                        className="text-[#000] border-1 border-[#000] hover:shadow-[0_0_5px_2px_#000] w-96 h-7 pl-10 pr-2 rounded-2xl duration-200"
                        placeholder="Search Subject..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="absolute top-0 bottom-0 flex items-center pl-3">
                        <FaSearch className="text-gray-400" />
                    </div>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-5 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
                <div>No</div>
                <div>Student Id </div>
                <div>Student Name </div>
                <div>Subject Name </div>
                <div className="flex justify-center">Actions</div>
            </div>

            {optedsubject?.filter((sublist: any) => {
                return facultySubject.includes(sublist.selectedSubject.subjectID)
            }).filter((subList: any) => {
                return search.toLowerCase() === ""
                    ? subList
                    : subList.selectedSubject.subjectName.toLowerCase().includes(search.toLowerCase());
            }).map((sub: any, index: any) => (
                <div key={index} className="grid grid-cols-5 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
                    <div className="flex items-center">{index + 1}</div>
                    <div className="flex items-center font-semibold">{sub.studentId}</div>
                    <div className="flex items-center font-semibold">{users?.filter((user: any) => user.id == sub.studentId)
                        .map((user: any, index: any) => { return <span key={index + "test"}>{user.userName}</span> })}</div>
                    <div className="flex items-center font-semibold">{sub.selectedSubject.subjectName}</div>
                    <div className="flex justify-center items-center">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                            SetCurrentStudent(sub.studentId); SetCurrentSubject(sub.selectedSubject.subjectID); SetCurrentSubjectName(sub.selectedSubject.subjectName)
                        }}>
                            Enter Marks
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
}

export default MarksEntry