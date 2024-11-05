import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axiosInstance from '../../utils/axiosInstance';
import { ENTER_MARKS, GET_ALL_SUB, GET_EXAMSLIST } from '../../utils/globalConfig';
import toast from 'react-hot-toast';

const GradeEntryPage = (props?: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [examList, setExamList] = useState<any>();
    const [disabledBtn, SetDisableBtn] = useState<boolean>(false);
    const [subjects, setSubject] = useState<any>();

    useEffect(() => {
        if (props) {
            if (props.subject) {
                setValue('subjectID', props.subject);
            }

            if (props.student) {
                setValue('studentId', props.student)
            }

            if (props.subjectName) {
                setValue('subjectName', props.subjectName)
            }
        }
        ; (async () => {
            const result = await axiosInstance.get(GET_ALL_SUB);
            setSubject(result.data);
        })()

            ; (async () => {
                const result = await axiosInstance.get(GET_EXAMSLIST);
                setExamList(result.data);
            })()
    }, [props]);

    const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedExamID = e.target.value;
        const selectedExam = examList?.find((exam: any) => exam.examId === selectedExamID);
        if (selectedExam.examStatus == "ENDED") {
            SetDisableBtn(false);
            if (selectedExam) {
                setValue('examName', selectedExam.examName); // Update subject name field
                setValue('examYear', selectedExam.examYear); // Update subject name field
                setValue('examStatus', selectedExam.examStatus); // Update subject name field
            }
        } else {
            toast.error("Exam Has Not Ended Yet. Marks Entry Cannot Be Done");
            SetDisableBtn(true);

        };
    }

    const onSubmit = async (data: any) => {
        const formattedData = {
            gradeExam: {
                examId: data.gradeExam,
                examName: data.examName,
                examYear: data.examYear,
                examStatus: data.examStatus
            },
            e_Subject: {
                subjectID: data.subjectID,
                subjectName: data.subjectName
            },
            studentId: data.studentId,
            marks: data.marks
        };

        try {
            await axiosInstance.post(ENTER_MARKS,formattedData).then(()=>{
                toast.success("Marks Entery Complete!")
            });
        } catch (error) {
            toast.error("Something Went Wrong!");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Grade Exam Dropdown */}
                <div className="mb-3">
                    <label htmlFor="gradeExam" className="form-label">Select Exam</label>
                    <select
                        id="gradeExam"
                        {...register('gradeExam', { required: 'Exam is required' })}
                        className="form-select"
                        onChange={handleExamChange}
                    >
                        <option value="">--Select an Exam--</option>
                        {examList?.map((exam: any) => (
                            <option key={exam.examId} value={exam.examId}>{exam.examName} {exam.examYear}</option>
                        ))}
                    </select>
                    {errors.gradeExam && <p className="text-danger"></p>}
                </div>

                {/* Subject Dropdown */}
                <div className="mb-3">
                    <select className='w-100 form-control'
                        {...register('subjectID', { required: "Subject is Required" })}
                        disabled
                    >
                        <option value="">--Select a Subject--</option>
                        {subjects?.map((subject: any) => (
                            <option key={subject.subjectID} value={subject.subjectID}>
                                {subject.subjectName}
                            </option>
                        ))}
                    </select>
                    {errors.eSubject && <p className="text-danger"></p>}
                </div>

                {/* Student ID */}
                <div className="mb-3">
                    <label htmlFor="studentId" className="form-label">Student ID</label>
                    <input
                        type="text"
                        id="studentId"
                        {...register('studentId', { required: 'Student ID is required' })}
                        className="form-control"
                        placeholder="Enter Student ID"
                        disabled
                    />
                    {errors.studentId && <p className="text-danger"></p>}
                </div>

                {/* Marks */}
                <div className="mb-3">
                    <label htmlFor="marks" className="form-label">Marks</label>
                    <input
                        type="text"
                        id="marks"
                        {...register('marks', { required: 'Marks are required' })}
                        className="form-control"
                        placeholder="Enter Marks"
                    />
                    {errors.marks && <p className="text-danger"></p>}
                </div>

                {/* Submit Button */}
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary w-100" disabled={disabledBtn}>Submit Marks</button>
            </form>
        </div>
    );
}

export default GradeEntryPage