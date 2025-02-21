import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import {toast} from 'react-hot-toast';
import NestedView from './NestedView';
import { updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { createSection } from '../../../../../services/operations/courseDetailsAPI';
import {setCourse, setEditCourse, setStep} from "../../../../../slices/courseSlice";


const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors}} = useForm();

  const [editSectionName, setEditSectionName] = useState(null);

  const {token} = useSelector( (state) => state.auth);

  const {course} = useSelector( (state) => state.course)

  const { editCourse, step } = useSelector((state) => state.course);
  console.log("EditCourse:", editCourse, "Step:", step);


  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); 


  const onSubmit = async (data) => {
    // e.preventDefault();
    // setLoading(true);
    let result;
    console.log("p",editSectionName,"s",data);

    if(editSectionName) {
      console.log("d",data);
      result = await updateSection({
        sectionNewName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      },token);
      console.log("result", result)
    }

    else{
      // console.log("p",data);
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token)
      console.log("result", result)
    }

    if(result){
      dispatch(setCourse(result));
      console.log("Printing1", course);
      console.log("Printing2", course?.courseContent);
      console.log("Printing2", course?.courseContent?.sectionName);

      setEditSectionName(null);
      setValue("sectionName", "");
    }

    // setLoading(false);

  }


  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
    console.log("GoBack triggered: Edit mode enabled, step set to 1");
    console.log("EditCourse:", editCourse, "Step:", step);
  }

  const goNext = () => {
    console.log("len",course.courseContent.length);
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one Section");
      return;
    }

    if(course.courseContent.some( (section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each Section");
      return;
    }

    // go to next
    dispatch(setStep(3));
    
  } 


  const handleChangedEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='flex w-full flex-col gap-6 justify-between  text-richblack-50 bg-richblack-800 px-9 py-7 rounded-lg border-2 border-richblack-700'>
        <p className='text-2xl font-bold text-richblack-5'>Course Builder</p>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label htmlFor='sectionName'>
              <p>Section Name<sup>*</sup></p>

              <input 
                type='text'
                id='sectionName'
                placeholder='Add Section Name'
                {...register("sectionName",{required:true})}
                className=' relative p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
              />
              {
                errors.sectionName && (
                  <span>Section Name is required</span>
                )
              }
            </label>
          </div>

          <div className='flex gap-2' >

            {/* <IoMdAddCircleOutline /> */}
            <IconBtn
              type="Submit"
              text={editSectionName ? "Edit Section Name" : "Create Section"}
              outline={true}
              children={<IoMdAddCircleOutline className='text-yellow-50 text-lg' />}
              customClasses={"text-yellow-50"}
            />

            {
              editSectionName && (
                <button  
                  type='button'
                  onClick={cancelEdit}
                  className='text-sm text-richblack-25 underline'
                >Cancel Edit</button>
              )
            }

          </div>

        </form>

        {
          course?.courseContent?.length > 0 && (
            <NestedView handleChangedEditSectionName={handleChangedEditSectionName} />
          )
        }

        <div className='flex justify-between items-center'>
          <button onClick={goBack}
            className='font-semibold py-2 px-6 rounded-md bg-richblack-700 shadow-white shadow-sm flex gap-2 items-center justify-center'
          >
            <BiLeftArrow />
            <p>Back</p>
          </button>
            <IconBtn text="Next" onclick={goNext}>
              <BiRightArrow />
            </IconBtn>
        </div>
    </div>
  )
}

export default CourseBuilderForm;