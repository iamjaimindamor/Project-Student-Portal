import React, { useEffect, useState } from 'react';
import { useForm, FieldValues, FieldError } from 'react-hook-form';
import Button from '../../components/general/Button';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { IAuthUser } from '../../types/auth.types';
import { ASSIGN_SUB, GET_ALL_SUB, USERS_LIST_URL } from '../../utils/globalConfig';
import AuthSpinner from '../../components/general/AuthSpinner';
import GetAssignedSub from '../../components/assigning-mechanism/GetAssignedSub';

const AssignSubject = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({ mode: "onChange" });
    const [users, setUsers] = useState<IAuthUser[]>([]);
    const [subjects, setSubjects] = useState<[{ subjectID: string, subjectName: string }]>();
    const [subjectAssignmentAdded, setSubjectAssignmentSubjectState] = useState<boolean>(false);

    const getFacultyList = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
            const facultyData = response.data.filter(user => user.roles.includes("FACULTY"));
            setUsers(facultyData);
            setLoading(false);
        } catch (error) {
            toast.error('An error occurred while fetching faculty data');
            setLoading(false);
        }
    };

    const getSubjects = async () => {
        try {
            const result = await axiosInstance.get(GET_ALL_SUB);
            setSubjects(result.data);
        } catch (error) {
            toast.error('An error occurred while fetching subjects');
        }
    };

    useEffect(() => {
        getFacultyList();
        getSubjects();
    }, []);

    const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFacultyID = e.target.value;
        const selectedFaculty = users.find(user => user.id === selectedFacultyID);
        if (selectedFaculty) {
            setValue('facultyName', selectedFaculty.userName); // Update faculty name field
        }
    };

    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubjectID = e.target.value;
        const selectedSubject = subjects?.find(subject => subject.subjectID === selectedSubjectID);
        if (selectedSubject) {
            setValue('subjectName', selectedSubject.subjectName); // Update subject name field
        }
    };

    const onSubmit = async (data: any) => {

        const formattedData = {
            facultyID: data.facultyID,
            facultyName: data.facultyName,
            facultySubject: {
                subjectID: data.subjectID,
                subjectName: data.subjectName,
            },
        };

        // Perform API call to register the faculty subject assignment
        try {
            const response = await axiosInstance.post(ASSIGN_SUB, formattedData);
            if (response.status === 200) {
                setSubjectAssignmentSubjectState(!subjectAssignmentAdded);
                toast.success('Faculty subject assigned successfully!');
                reset(); // Reset the form on successful submission
            } else {
                toast.error('Failed to assign subject!');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="w-full">
                <AuthSpinner />
            </div>
        );
    }

    return (
        <div className="p-4 w-2/4 mx-auto flex flex-col gap-4">
            <div className="bg-white p-2 rounded-md flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Assign Subjects To Faculty</h1>
                <p className="font-bold text-danger">Admin Function Only</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className='text-xl font-bold' htmlFor="facultyID">Select User : </label>
                        <br />
                        <select className='w-100 form-control'
                            {...register('facultyID', { required: "FacultyID is Required" })}
                            onChange={handleFacultyChange}
                        >
                            <option value="">--Select a User--</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.fullName} ({user.userName})
                                </option>
                            ))}
                        </select>
                        <br />
                        {/* Render error if it exists */}
                        {errors.facultyID && <p className='text-danger'>{(errors.facultyID as FieldError).message}</p>}

                        <label className='text-xl font-bold' htmlFor="facultyName">Faculty Name</label>
                        <input className='form-control'
                            {...register('facultyName', { required: "Faculty name is required" })}
                            type="text"
                            readOnly
                            disabled
                            placeholder="Faculty name will appear here"
                           />
                        <br />
                        <label className='text-xl font-bold' htmlFor="subjectID">Select Subject : </label>
                        <br />
                        <select className='w-100 form-control'
                            {...register('subjectID', { required: "Subject is Required" })}
                            onChange={handleSubjectChange}
                        >
                            <option value="">--Select a Subject--</option>
                            {subjects?.map(subject => (
                                <option key={subject.subjectID} value={subject.subjectID}>
                                    {subject.subjectName}
                                </option>
                            ))}
                        </select>
                        {/* Render error if it exists */}
                        {errors.subjectID && <p className='text-danger'>{(errors.subjectID as FieldError).message}</p>}
                        <br />
                        <label htmlFor="subjectName">Subject Name</label>
                        <input
                            className='form-control'
                            {...register('subjectName', { required: "Subject Name is required" })}
                            type="text"
                            readOnly
                            disabled
                            placeholder="Subject name will appear here"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-12">
                        <Button
                            label="Cancel"
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                toast.error("Operation Cancelled");
                                reset(); // Reset the form when canceled
                            }}
                            />
                         <Button
                            label="Assign Subject"
                            type="submit"
                            variant="secondary"
                            onClick={() => {
                            //                           
                            }}
                        />
                    </div>
                </form>
            </div>
            <div>
            <h4 className='display-5 bg-white pt-1 pb-1 pl-5'>Assigned Subjects </h4>
                <GetAssignedSub updateData={subjectAssignmentAdded}/>
            </div>
        </div>
    );
};

export default AssignSubject;
