// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../../utils/axiosInstance';
// import { GET_RESULTS, USERS_LIST_URL } from '../../utils/globalConfig';
// import toast from 'react-hot-toast';
// import { FaSearch } from 'react-icons/fa';
// import { IAuthUser } from '../../types/auth.types';

// const Results = (props?:any) => {
//     const [results, setResults] = useState<any>();
//     const [search, setSearch] = useState<string>("");
//     const [updateData, SetUpdateState] = useState<boolean>(false);
//     const [users, setUsers] = useState<IAuthUser[] | any>([]);

//     useEffect(() => {
//         getUsersList();
//         ; (async () => {
//             const result = await axiosInstance.get(GET_RESULTS);
//             setResults(result.data);
//         })()
//     }, [props.updateData, updateData]);

//     const getUsersList = async () => {
//         try {
//             const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
//             const { data } = response;
//             setUsers(data);

//         } catch (error) {
//             toast.error('An Error occurred. Please Contact admins');
//         }
//     };

//     return (
//         <div className="bg-white p-2 rounded-md">
//             <div>
//                 <div>
//                     <input
//                         type="text"
//                         className="text-[#000] border-1 border-[#000] hover:shadow-[0_0_5px_2px_#000] w-96 h-7 pl-10 pr-2 rounded-2xl duration-200"
//                         placeholder="Search Student..."
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     <div className="absolute top-0 bottom-0 flex items-center pl-3">
//                         <FaSearch className="text-gray-400" />
//                     </div>
//                 </div>
//             </div>
//             <br />
//             <div className="grid grid-cols-7 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
//                 <div>No</div>
//                 <div>Exam Name</div>
//                 <div>Exam Year</div>
//                 <div>Student Name</div>
//                 <div>Subject Name</div>
//                 <div>Marks</div>
//             </div>

//             {results?.map((sub: any, index: any) => (
//                 <div key={index} className="grid grid-cols-7 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
//                     <div className="flex items-center">{index + 1}</div>
//                     <div className="flex items-center font-semibold">{sub.gradeExam.examName}</div>
//                     <div className="flex items-center font-semibold">{sub.gradeExam.examYear}</div>
//                     <div className="flex items-center font-semibold">{users?.filter((user: any) => user.id == sub.studentId)
//                         .map((user: any, index: any) => { return <span key={index + "result"}>{user.userName}</span> })}</div>
//                     <div className="flex items-center font-semibold">{sub.e_Subject.subjectName}</div>
//                     <div className="flex items-center font-semibold">{sub.marks}</div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Results
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { GET_RESULTS, USERS_LIST_URL } from '../../utils/globalConfig';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import { IAuthUser } from '../../types/auth.types';

const Results = (props?: any) => {
    const [results, setResults] = useState<any>();
    const [search, setSearch] = useState<string>("");
    const [updateData, SetUpdateState] = useState<boolean>(false);
    const [users, setUsers] = useState<IAuthUser[] | any>([]);

    useEffect(() => {
        getUsersList();
        (async () => {
            const result = await axiosInstance.get(GET_RESULTS);
            setResults(result.data);
        })();
    }, [props.updateData, updateData]);

    const getUsersList = async () => {
        try {
            const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
            const { data } = response;
            setUsers(data);
        } catch (error) {
            toast.error('An Error occurred. Please Contact admins');
        }
    };

    return (<>
        <div className="bg-white p-4 rounded-md mx-auto w-full max-w-5xl">
        <h2 className='display-5 text-center font-semibold'>All Student Grade History</h2>
        <br/>
            <div className="relative">
                <input
                    type="text"
                    className="text-[#000] border-1 border-[#000] hover:shadow-[0_0_5px_2px_#000] w-full sm:w-96 h-7 pl-10 pr-2 rounded-2xl duration-200"
                    placeholder="Search By Exam Name..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute top-0 bottom-0 flex items-center pl-3">
                    <FaSearch className="text-gray-400" />
                </div>
            </div>
            <br />
            <div className="overflow-x-auto">
                <div className="grid grid-cols-7 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
                    <div>No</div>
                    <div>Exam Name</div>
                    <div>Exam Year</div>
                    <div>Student Name</div>
                    <div>Subject Name</div>
                    <div className='flex justify-content-center'>Marks</div>
                </div>

                {results?.filter((subList: any) => {
                    return search.toLowerCase() === ""
                        ? subList
                        : subList.gradeExam.examName.toLowerCase().includes(search.toLowerCase());
                }).map((sub: any, index: any) => (
                    <div key={index} className="grid grid-cols-7 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
                        <div className="flex items-center">{index + 1}</div>
                        <div className="flex items-center font-semibold">{sub.gradeExam.examName}</div>
                        <div className="flex items-center font-semibold">{sub.gradeExam.examYear}</div>
                        <div className="flex items-center font-semibold">
                            {users?.filter((user: any) => user.id == sub.studentId)
                                .map((user: any, index: any) => { return <span key={index + "result"}>{user.userName}</span> })}
                        </div>
                        <div className="flex items-center font-semibold">{sub.e_Subject.subjectName}</div>
                        <div className="flex items-center font-semibold justify-content-center">{sub.marks}</div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
};

export default Results;
