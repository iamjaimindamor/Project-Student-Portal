import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { DELETE_ASSIGN_SUB, GET_ASSIGN_SUB } from '../../utils/globalConfig';
import Button from '../general/Button';

const GetAssignedSub = (props?: any) => {

    const [assignedsubject, setAssignedSubject] = useState<[{ subjectID: string, subjectName: string }]>();
    const [search, setSearch] = useState<string>("");
    const [updateData, SetUpdateState] = useState<boolean>(false);

    useEffect(() => {

        ; (async () => {
            const result = await axiosInstance.get(GET_ASSIGN_SUB);
            setAssignedSubject(result.data);
        })()

    }, [props.updateData, updateData]);

    const handleDelete = (id: any) => {
        axiosInstance.delete(`${DELETE_ASSIGN_SUB}?facultyID=${id}`)
            .then((response) => { SetUpdateState(!updateData); })
            .catch((error) => toast.error("Failed to delete subject"))
        toast.success("Subject has been deleted successfully..");
    };


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
            <div className="grid grid-cols-4 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
                <div>No</div>
                <div>Faculty Name</div>
                <div>Faculty Subject</div>
                <div className="flex justify-center">Actions</div>
            </div>

            {assignedsubject?.filter((subList: any) => {
                return search.toLowerCase() === ""
                    ? subList
                    : subList.subjectName.toLowerCase().includes(search.toLowerCase());
            }).map((sub: any, index: any) => (
                <div key={index} className="grid grid-cols-4 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
                    <div className="flex items-center">{index + 1}</div>
                    <div className="flex items-center font-semibold">{sub.facultyName}</div>
                    <div className="flex items-center font-semibold">{sub.facultySubject.subjectName}</div>
                    <div className="flex justify-center items-center">
                        <Button
                            label={"Remove"}
                            onClick={() => handleDelete(sub.facultyID)}
                            type="button"
                            variant="danger"
                        />
                    </div>

                </div>
            ))}
        </div>
    );
}

export default GetAssignedSub