import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth.hooks';
import Button from '../../components/general/Button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ADD_SUBJECT } from '../../utils/globalConfig';
import axiosInstance from '../../utils/axiosInstance';
import SubjectTableSection from '../../components/subject-management/SubjectTableSection';

const AddSubject = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [subjectadded, setSubjectState] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset
    } = useForm({ mode: "onChange" });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await axiosInstance.post(ADD_SUBJECT, data);
            toast.success("Subject Added");
            setSubjectState(!subjectadded);
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

    return (
        <div className='p-4 w-2/4 mx-auto flex flex-col gap-4'>
            <div className='bg-white p-2 rounded-md flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Manage Subjects For Curriculum</h1>
                <h4 className='text-xl'> Here Add Subject to Update Curriculum</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>

                        <label className="font-semibold">Subject Name : </label>
                        <br />
                        <input
                            type="text"
                            {...register("subjectName", { required: "Subject Name is required" })}
                            className="test2"
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-12'>
                        <Button
                            label='Cancel'

                            type='button'
                            variant='secondary' onClick={function (): void {
                                toast.error("Operation Cancelled");
                                reset();
                            }} />
                        <Button
                            label='Add Subject'
                            type='submit'
                            variant='secondary' onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    </div>
                </form>
            </div>
            <div>
                <h4 className='display-5 bg-white pt-1 pb-1 pl-2'>Subjects For Current Curriculum </h4>
                <SubjectTableSection updateData={subjectadded} />
            </div>
        </div>

    );
}

export default AddSubject