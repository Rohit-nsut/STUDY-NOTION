import React, { useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../../../common/ConfirmationModal';

import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { AiOutlinePlus } from 'react-icons/ai';
import SubSectionModal from './SubSectionModal';


const NestedView = ({handleChangedEditSectionName}) => {

    const {course} = useSelector( (state) => state.course);
    const {token} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationalModal] = useState(null);


    const handleDeleteSection = async (sectionId) => {
        // course.courseContent.f

        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        });

        if(result){
            dispatch(setCourse(result));
        }
        
        setConfirmationalModal(null);
    }


    const handleDeleteSubSection = async (subSectionId, sectionId) => {

        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token
        });

        if(result){
            const updatedCourseContent = course.courseContent.map( (section) => section._id === sectionId ? result : section);

            const updatedCourse = {...course, courseContent: updatedCourseContent };

            dispatch(setCourse(updatedCourse));
        }

        setConfirmationalModal(null);
    }

  return (
    <div>

        <div className='relative px-6  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'>
            {course?.courseContent?.map( (section) => (

                <details key={section._id} open>

                    <summary className='flex items-center justify-between gap-3 py-3 border-b border-richblack-600'>

                        <div className='flex items-center gap-2'>
                            <RxDropdownMenu className='text-richblack-300 text-lg' />
                            <p className='text-richblack-50 font-semibold'> {section.sectionName} </p>
                        </div>

                        <div className='flex items-center gap-2 text-richblack-5'>
                            <button onClick={ () => handleChangedEditSectionName(section._id,  section.sectionName)}>
                                <MdEdit className='text-richblack-300 text-lg' />
                            </button>

                            <button onClick={ () => setConfirmationalModal({
                                text1: "Delete this Section",
                                text2:"All the lectures in this section will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDeleteSection(section._id),
                                btn2Handler: () => setConfirmationalModal(null)
                            })}>
                                <RiDeleteBin6Line className='text-richblack-300 text-lg' />
                            </button>
                            <span className='text-richblack-300'>|</span>
                            <BiSolidDownArrow className='text-richblack-300 text-xs' />
                        </div>
                    </summary>


                        {/* subsection */}
 
                        <div> 
                            {
                                section.subSection.map( (data) => (
                                    <div key={data?._id} onClick={() => setViewSubSection(data)} className='flex justify-between ml-5 py-[2px] border-b border-richblack-600' >

                                        <div className='flex items-center gap-2'>
                                            <RxDropdownMenu className='text-richblack-300 text-lg' />
                                            <p className='text-richblack-50 font-semibold'> {data?.title} </p>
                                        </div>

                                        <div  onClick={(e) => e.stopPropagation()} className='flex items-center gap-3'>

                                            <button onClick={ () => setEditSubSection({...data, sectionId: section._id})}>
                                                <MdEdit className='text-richblack-300' />
                                            </button>

                                            <button onClick={ () => setConfirmationalModal({
                                                text1: "Delete this Sub Section",
                                                text2: "Selected Lecture will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                                                btn2Handler: () => setConfirmationalModal(null),
                                                })}
                                            >
                                                <RiDeleteBin6Line className='text-richblack-300 text-lg' />
                                            </button>
                                        </div>

                                    </div>
                                ))
                            }

                            <button onClick={() => setAddSubSection(section._id)} className='flex justify-between gap-2 items-center text-yellow-50 '>
                                <AiOutlinePlus className='text-lg ' />
                                <p>Add Lecture</p>
                            </button>

                        </div>


                </details>
            ))}
        </div>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
            {
                    addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />) 
                    : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />) 
                    : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />) 
                    : (<div></div>)
            }

        
    </div>
  )
}

export default NestedView;