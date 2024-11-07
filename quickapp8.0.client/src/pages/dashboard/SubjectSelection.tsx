import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth.hooks'
import axiosInstance from '../../utils/axiosInstance';
import { GET_ALL_SELECTED_SUB, GET_ALL_SUB, GET_USER_BY_USERNAME, LOCK_IN_SUBJECT, SELECT_A_SUBJECT } from '../../utils/globalConfig';
import { useForm } from 'react-hook-form';
import Button from '../../components/general/Button';
import toast from 'react-hot-toast';
import SelectedSubject from '../../components/SelectedSubject/SelectedSubject';

const SubjectSelection = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [subjectadded, setSubjectState] = useState<boolean>(false);
    const [subject, setSubject] = useState<[{ subjectID: string, subjectName: string }]>();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({ mode: "onChange" });
    const [userId, SetUserID] = useState<any>();
    const [selectionError, SetSelectionError] = useState<boolean>(false);
    const [optedsubject, setOptedSubject] = useState<[{ subjectID: string, subjectName: string }]>();
    const [updateData, SetUpdateState] = useState<boolean>(false);
    
    useEffect(() => {

        ; (async () => {
            const result = await axiosInstance.get(GET_ALL_SUB);
            setSubject(result.data);
        })()

        getUserIdByUsername(user!.userName);
    }, []);

    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubjectID = e.target.value;
        const selectedSubject = subject?.find(subject => subject.subjectID === selectedSubjectID);
        if (selectedSubject) {
            setValue('subjectName', selectedSubject.subjectName); // Update subject name field
        }
    };

    const getUserIdByUsername = async (Username?: string) => {

        const currentUser = await axiosInstance.get(GET_USER_BY_USERNAME + "/" + user?.userName);
        if (currentUser) {
            setValue('studentId', currentUser.data.id);
            SetUserID(currentUser.data.id);
        }
    }

    const onSubmit = async (data: any) => {

        const formattedData = {
            studentId: data.studentId,
            selectedSubject: {
                subjectID: data.subjectID,
                subjectName: data.subjectName
            }
        };

        try {
            setLoading(true);
            await axiosInstance.post(SELECT_A_SUBJECT, formattedData);
            toast.success("Subject Added!");
            setSubjectState(!subjectadded);
            SetUpdateState(!updateData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const err = error as { data: string; status: number };
            const { status } = err;
            if (status === 401) {
                toast.error('Unauthorized Attempt. You Cannot Add Subject');
            } else {
                toast.error('An Error occurred. Please contact admins');
            }
        }

    }

    const handleSubjectSelectionLocking = async () => {

        var studentSelection:any = optedsubject?.filter((sublist: any) => {
            return sublist.studentId == userId
        }).length;

        if(!(studentSelection<2)){
            await axiosInstance.put(`${LOCK_IN_SUBJECT}?studentId=${userId}&lockingstatus=true`).then(() => {
                toast.success("Subject Selected And Locked in For the Term!");
                SetUpdateState(!updateData);
            }).catch(() => { toast.error("Locking Subject Failed") })
        }else{
            toast.error("Minimum 2 subject are required for the term.")
        }
    }

    useEffect(() => {

        ; (async () => {
            const result = await axiosInstance.get(GET_ALL_SELECTED_SUB);
            setOptedSubject(result.data);

        })()

    }, [updateData]);


    return (
        <>
            <div className="p-1 w-100 mx-auto flex flex-col gap-4">
                <div className="bg-white p-2 rounded-md flex flex-col gap-4">
                    <div>
                        <h4 className='display-4'>Hello , {user?.userName}</h4>
                        <br />
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className='text-xl font-bold' htmlFor="subjectID">Your Unique Student ID (USID): </label>
                            <br />
                            <input {...register('studentId')} disabled />
                            <br />
                            <br />
                            <label className='text-xl font-bold' htmlFor="subjectID">Select Your Subject : </label>
                            <select className='w-100 form-control'
                                {...register('subjectID', { required: "Subject is Required" })}
                                onChange={handleSubjectChange}
                            >
                                <option value="">--Select a Subject--</option>
                                {subject?.map(subject => (
                                    <option key={subject.subjectID} value={subject.subjectID}>
                                        {subject.subjectName}
                                    </option>
                                ))}
                            </select>
                            <br />
                            {user?.lockInSubject ? <pre className='text-danger'><i>Subjects Are Locked In For Term . If Any Query Contact Respective Faculty</i></pre> : <pre><span className='text-danger'>NOTE : </span>Lock In After Selecting Subject. Afterward The Selection Cannot be Change during the term</pre>}
                            <br />
                            <div className='d-flex'>

                                <Button
                                    label="Select Subject"
                                    type="submit"
                                    variant="secondary"
                                    disabled={user?.lockInSubject}
                                    onClick={() => {

                                    }}
                                />
                                &nbsp;&nbsp;
                                <Button
                                    label={!user?.lockInSubject ? "Lock-In" : "Locked-In"}
                                    type="button"
                                    variant="primary"
                                    disabled={user?.lockInSubject}
                                    onClick={() => {
                                        handleSubjectSelectionLocking();
                                        SetUpdateState(!updateData);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <h4 className='display-5 bg-white pt-1 pb-1 pl-2'>Your Subject For Current Terms Are : </h4>
                    <SelectedSubject updateData={subjectadded} lockedIn={user?.lockInSubject}/>
                </div>
            </div>
        </>
    )
}

export default SubjectSelection