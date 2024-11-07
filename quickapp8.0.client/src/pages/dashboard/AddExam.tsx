import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import Button from '../../components/general/Button';
import { ADD_EXAM } from '../../utils/globalConfig';
import ExamManagement from '../../components/exam-management/ExamManagement';
export const STATUS_ENUMS = {
    INITIALIZING: 'INITIALIZING',
    ONGOING: 'ONGOING',
    ENDED: 'ENDED',
};

const AddExam = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [subjectadded, setSubjectState] = useState<boolean>(false);
    const [years, setYears] = useState<any>([]);
    const [selectedYear, setSelectedYear] = useState<any>('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const {
        register,
        handleSubmit,
        reset
    } = useForm({ mode: "onChange" });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await axiosInstance.post(ADD_EXAM, data);
            toast.success("Exam Added");
            setSubjectState(!subjectadded);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const err = error as { data: string; status: number };
            const { status } = err;
            if (status === 401) {
                toast.error('Unauthorized Attempt. You Cannot Create Exam Schedule');
            } else {
                toast.error('An Error occurred. Please contact admins');
            }
        }
    }

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const nextYears = [];
        for (let i = currentYear; i <= currentYear + 10; i++) {
            nextYears.push(i);
        }
        setYears(nextYears);
    }, []);

    return (
        <div className='p-4 mx-auto flex flex-col gap-4'>
            <div className='bg-white p-2 rounded-md flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Create Exam For Current Term/Semester</h1>
                <p className="font-bold text-danger">Admin Function Only</p>
                <h4 className='text-xl'>Here Create Examination As Per Education Board Schedule</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>

                        <label className="font-semibold">Enter Name Of Exam : </label>
                        <br />
                        <input
                            type="text"
                            {...register("examName", { required: "Exam Name is required" })}
                            className="test2"
                            placeholder='SUMMER , WINTER , ....'
                        />
                        <br />
                        <br />
                        <label className='font-semibold' htmlFor="yearSelect">Select a Year:</label>
                        <select
                            className='form-control w-100'
                            id="yearSelect"
                            {...register("examYear")}
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            required
                        >
                            <option value="">--Select a year--</option>
                            {years.map((year: any) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label className='font-semibold' htmlFor="statusSelect">Select Status:</label>
                        <select
                            className='w-100 form-control'
                            id="statusSelect"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            required
                        >
                            <option value="">--Select a Status--</option>
                            {Object.values(STATUS_ENUMS).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

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
                <h4 className='display-5 bg-white pt-1 pb-1 pl-2'>Exam History</h4>
                <ExamManagement updateData={subjectadded}/>
            </div>
        </div>

    );
}

export default AddExam