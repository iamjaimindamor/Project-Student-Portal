import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { DELETE_SUBJECT, GET_ALL_SUB } from '../../utils/globalConfig';
import axios from 'axios';
import Button from '../general/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SubjectTableSection = (props: any) => {

    const [subject, setSubject] = useState<[{ subjectID: string, subjectName: string }]>();
    const [search, setSearch] = useState<string>("");
    const [updateData, SetUpdateState] = useState<boolean>(false);

    useEffect(() => {

        ; (async () => {
            const result = await axiosInstance.get(GET_ALL_SUB);
            setSubject(result.data);
        })()

    }, [props.updateData, updateData]);

    const handleDelete = (id: any) => {
        axiosInstance.delete(`${DELETE_SUBJECT}?subjectID=${id}`)
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
            <div className="grid grid-cols-3 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
                <div>No</div>
                <div>Subject Name</div>
                <div className="flex justify-center">Actions</div>
            </div>

            {subject?.filter((subList: any) => {
                return search.toLowerCase() === ""
                    ? subList
                    : subList.subjectName.toLowerCase().includes(search.toLowerCase());
            }).map((sub: any, index: any) => (
                <div key={index} className="grid grid-cols-3 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
                    <div className="flex items-center">{index + 1}</div>
                    <div className="flex items-center font-semibold">{sub.subjectName}</div>
                    <div className="flex justify-center items-center">
                        <Button
                            label={"Delete Subject"}
                            onClick={() => handleDelete(sub.subjectID)}
                            type="button"
                            variant="danger"
                        />
                    </div>

                </div>
            ))}
        </div>
    );
}

export default SubjectTableSection