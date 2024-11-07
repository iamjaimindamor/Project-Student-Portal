import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '../general/Button';
import { GET_EXAMSLIST, REMOVE_EXAM, UPDATE_EXAM_STATE } from '../../utils/globalConfig';
import { STATUS_ENUMS } from '../../pages/dashboard/AddExam';

const ExamManagement = (props?:any) => {
    const [examList, setExamList] = useState<[{ subjectID: string, subjectName: string }]>();
    const [search, setSearch] = useState<string>("");
    const [updateData, SetUpdateState] = useState<boolean>(false);
    const [updateExamData, SetUpdateExamState] = useState<any>();
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {

        ; (async () => {
            const result = await axiosInstance.get(GET_EXAMSLIST);
            setExamList(result.data);
        })()
        
    }, [props.updateData, updateData]);
    console.log(examList);

    const handleDelete = (id: any) => {
        axiosInstance.delete(`${REMOVE_EXAM}?examId=${id}`)
            .then((response) => { SetUpdateState(!updateData); })
            .catch((error) => toast.error("Failed to delete subject"))
        toast.success("Subject has been deleted successfully..");
    };

    const handleUpdateExam = (examID : string,state:string) =>{
        if(state){
            axiosInstance.put(`${UPDATE_EXAM_STATE}?examId=${examID}`,{"examStatus":state}).then((res)=>{SetUpdateState(!updateData);}).catch(()=>{toast.error("Failed To Update Status")});
            setSelectedStatus('');
            toast.success(`Exam State Update to ${state}`);
        }else{
            toast.error("Select A Status For Following or Try Reselecting ")
        }
    }
    
    return (
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
            <div className="grid grid-cols-7 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
                <div>No</div>
                <div>Exam Name</div>
                <div>Exam Year</div>
                <div>Exam Status</div>
                <div className="flex justify-center">Update Status</div>
                <div className="flex justify-center">Update</div>
                <div className="flex justify-center">Actions</div>
            </div>

            {examList?.filter((subList: any) => {
                return search.toLowerCase() === ""
                    ? subList
                    : subList.examName.toLowerCase().includes(search.toLowerCase());
            }).map((sub: any, index: any) => (
                <div key={index} className="grid grid-cols-7 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
                    <div className="flex items-center">{index + 1}</div>
                    <div className="flex items-center font-semibold">{sub.examName}</div>
                    <div className="flex items-center font-semibold">{sub.examYear}</div>
                    <div className="flex items-center font-semibold">{sub.examStatus}</div>
                    <div className="flex items-center font-semibold"><select
                            className='form-select w-90'
                            id="statusSelect"
                            // value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            required
                        >
                            <option value="">--Update--</option>
                            {Object.values(STATUS_ENUMS).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select></div>
                        <div className="flex justify-center items-center">
                        <Button
                            label={"Update"}
                            onClick={() => handleUpdateExam(sub.examId,selectedStatus)}
                            type="button"
                            variant="secondary"
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <Button
                            label={"Delete"}
                            onClick={() => handleDelete(sub.examId)}
                            type="button"
                            variant="danger"
                        />
                    </div>

                </div>
            ))}
        </div>
    );
}

export default ExamManagement