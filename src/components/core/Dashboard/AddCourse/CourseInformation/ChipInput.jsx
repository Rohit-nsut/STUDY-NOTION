import React, { useState,useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';


const ChipInput = ({label, name, placeholder, register, setValue, getValues, errors}) => {

    const[requirement, setRequirement] = useState("");
    const[requirementList, setRequirementList] = useState([]);

    const {course, editCourse} = useSelector( (state) => state.course);


    useEffect( () => {
        if(editCourse) {
            setRequirementList(course?.tag);
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    },[editCourse, course, register, name]);

    useEffect( () => {
        setValue(name, requirementList);
    },[requirementList, name, setValue]);
    


    const handleOnkeyDown = (e) => {
        // e.preventDefault();
        if(e.key === 'Enter' || e.key === ','){
            e.preventDefault();
            const newList = [...requirementList, requirement];
            setRequirementList(newList);
            setRequirement("");
        }
    }

    const removeHandler = (index) => {
        const newList = requirementList.filter( (_,i) => (i !== index) );

        setRequirementList(newList);
    }

  return (
    <div >

        <label htmlFor={name} className='flex  flex-col gap-2'>
            <p>{label}</p>

            {
                requirementList.length > 0 && (
                    <div className='flex flex-wrap gap-3'>
                        {
                            requirementList.map( (tag, index) => (
                                <div key={index} className='flex max-w-full gap-1 justify-center text-richblack-5 items-center px-3 py-1 bg-yellow-400 rounded-full'>
                                    <p> {tag} </p>
                                    <RxCross2 onClick={ () => removeHandler(index)}/>
                                </div>
                            ))
                        }
                    </div>
                )

            }

            <input
                type='text'
                id={name}
                placeholder={placeholder}
                value={requirement}
                onChange={ (e) => setRequirement(e.target.value)}
                onKeyDown={handleOnkeyDown}
                className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
            />

            {
                errors[name] && (
                    <span>
                        {label} is required
                    </span>
                )
            }

        </label>
        
    </div>
  )
}

export default ChipInput;