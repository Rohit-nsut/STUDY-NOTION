import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import {useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import {toast} from 'react-hot-toast';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import ChipInput from './ChipInput';
import Upload from '../Upload';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        // reset,
        setValue, 
        getValues,
        formState: { errors} 
    } = useForm();

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector( (state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    const {token} = useSelector( (state) => state.auth);


    const getCategories = async () => {

        try{
            setLoading(true);
            const categories = await fetchCourseCategories();
    
            // console.log(categories.length,"a");
    
            if(categories.length > 0){
                setCourseCategories(categories);
            }
        }

        catch(error){
            console.log(error.message);
        }

        setLoading(false);
    }

    useEffect( () => {

        // if form is in edit mode
        if(editCourse) {
            // console.log("data populated", editCourse)
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("Price", course.price)
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category)
            setValue("courseRequirement", course.instructions)
            setValue("thumbnailImage", course.thumbnail)
        }

        getCategories();
        // console.log("cat", categories);
        
    },[editCourse, course, setValue]);


    const isFormUpdated = () => {
        const currentValues = getValues();
        if( 
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.Price !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirement.toString() !== course.instructions.toString() ||
            currentValues.thumbnailImage !== course.thumbnail
        ) {
            return true
        }

        else
        return false;
    }

    //  handle next button click
    const onSubmit = async (data) => {
        // console.log(data)
        // data.preventDefault();

        if(editCourse) {
            // const currentValues = getValues()
            // console.log("changes afer editing form values:", currentValues)
            // console.log("now course:", course)
            // console.log("Has Form Changed:", isFormUpdated())
            if(isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                formData.append("courseId", course._id)
                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if(currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("courseBenefits", data.whatYouWillLearn)
                }
                if (currentValues.Price !== course.price && data.coursePrice !== undefined) {
                    formData.append("price", Number(data.coursePrice)); // Ensure it's a valid number
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseCategory !== course.category._id && typeof data.courseCategory === "string") {
                    formData.append("category", data.courseCategory.trim()); // Ensure it's a valid string
                } else {
                    console.error("Invalid category ID:", data.courseCategory);
                }
                if(currentValues.courseRequirement.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirement))
                }
                // console.log("q")
                if(currentValues.thumbnailImage !== course.thumbnail) {
                    formData.append("thumbnail", data.thumbnailImage)
                    }
                    console.log("Edit Form data: ", formData)
                    setLoading(false)
                    const result = await editCourseDetails(formData, token)
                if(result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } 
            
            else {
                toast.error("No change made to the form");
                // dispatch(setStep(2));
            }

            return ;
        }

        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.Price)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", "Draft")
        formData.append("instructions", JSON.stringify(data.courseRequirement))
        formData.append("thumbnail", data.thumbnailImage)
        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if(result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false);
        console.log("Printing formdata", formData);
    }


  return (
    <div>

        <form className='' onSubmit={handleSubmit(onSubmit)}>

            <div className='flex w-full flex-col gap-6 justify-between  text-richblack-50 bg-richblack-800 px-9 py-7 rounded-lg border-2 border-richblack-700'>

                {/* Title */}
                <div>
                    <label htmlFor='courseTitle'>
                        <p>Course Title<sup>*</sup></p>
                        <input 
                            type='text'
                            id='courseTitle'
                            placeholder='Enter Course Title'
                            name='courseTitle'
                            className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                            {...register("courseTitle", {required: true})}
                        />
                        {
                            errors.courseTitle && (
                                <span>Course Title is Required**</span>
                            )
                        }
                    </label>
                </div>

                {/* Course Description */}
                <div>
                    <p>Course Short Description<sup>*</sup></p>
                    <textarea 
                        rows={5}
                        cols={50}
                        placeholder='Enter Description'
                        name='courseShortDesc'
                        className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                        {...register("courseShortDesc", {required: true})}
                    />
                    {
                        errors.courseShortDesc && (<span>Course Description is required**</span>)
                    }
                </div>

                
                {/* Price */}
                <div>
                    <label htmlFor='Price'className='relative'>
                        <p>Price<sup>*</sup></p>
                        <input 
                            type='text'
                            id='Price'
                            placeholder='Enter Price'
                            name='Price'
                            className=' relative p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none pl-10'
                            {...register("Price", {required: true,valueAsNumber: true,})}
                        />
                        <HiOutlineCurrencyRupee  className=' absolute top-[70%] left-3 text-xl text-richblack-300'/>
                        {
                            errors.Price && (
                                <span>Course Price is Required</span>
                            )
                        }
                    </label>
                </div>


                {/* Course Category */}
                <div>
                    <label htmlFor='courseCategory'>
                        <p>Course Category<sup>*</sup></p>

                        <select 
                            id='courseCategory'
                            defaultValue=""
                            className=' relative p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none placeholder:p-8 text-'
                            {...register("courseCategory", {required: true})}
                        >
                            <option value="" disabled >Choose a Category</option>

                            {
                                !loading && courseCategories.map( (category, index) => (
                                    <option key={index} value={category?._id}>
                                        {category?.name}
                                    </option>
                                ))
                            }
                        </select>
                        {
                            errors.courseCategory && (<span>Course Category is Required</span>)
                        }
                    </label>
                </div>

                
                {/* create a custom component for handling tags input */}
                <ChipInput
                    label="Tags"
                    name="courseTags"
                    placeholder="Enter tags and press enter"
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                />



                {/* create a component for uploading and showing preview of media */}
                <Upload 
                    label="Course Thumbnail"
                    name="thumbnailImage"
                    // placeholder="Enter tags and press enter"
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                    editData={editCourse ? course?.thumbnail : null}
                />



                {/* Benefits from the Course */}
                <div>
                    <label htmlFor='courseBenefits'>
                        <p>Benefits of the Course<sup>*</sup></p>
                        <textarea
                            id='courseBenefits'
                            rows={4}
                            cols={50}
                            placeholder='Enter Benefits of the Course'
                            name='courseBenefits'
                            className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                            {...register("courseBenefits", {required: true})}
                        />

                        {
                            errors.courseBenefits && (<span>CourseBenefits is required**</span>)
                        }                               

                    </label>
                </div>


                <RequirementField 
                    name="courseRequirement"
                    label="Requirements/Instructions"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                    placeholder={"Enter Benefits of the Course"}
                />


                <div className='flex gap-8'>

                    <IconBtn 
                        text={!editCourse ? "Next" : "Save Changes"}
                        onclick={onsubmit}
                    />

                    {
                        editCourse && (
                            <button
                               onClick={ () => dispatch(setStep(2)) }
                            className='font-semibold bg-yellow-50 py-2 px-6 rounded-lg text-black flex items-center gap-2'
                            >
                                Continue Without Saving
                            </button>
                        )
                    }

                </div>




                

            </div>



        </form>

    </div>
  )
}

export default CourseInformationForm;