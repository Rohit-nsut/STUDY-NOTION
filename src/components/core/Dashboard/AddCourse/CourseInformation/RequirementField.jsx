import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { validate } from '../../../../../../SERVER/models/Course';

const RequirementField = ({name, label, register, errors, setValue, getValues, placeholder}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const { editCourse, course } = useSelector((state) => state.course)

    
    useEffect( () => {
        if(editCourse) {
            setRequirementList(course?.instructions);
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    },[editCourse, course, register, name]);

    useEffect( () => {
        setValue(name, requirementList);
    },[requirementList, name, setValue]);


    const add = () => {
        // e.preventDefault();
        if(requirement){
            const newList = [...requirementList,requirement];
            setRequirementList(newList);
            setRequirement("");
        }
    }

    const del = (id) => {
        const newList = requirementList.filter( (_,i) => (i !== id) );

        setRequirementList(newList);
    }

  return (
    <div>

        {/* <form onSubmit={(e) => e.preventDefault()}> */}

            <div className='flex flex-col gap-2 items-start'>
                <label htmlFor={name} className='w-full'>
                    <p>{label}<sup>*</sup></p>
                    <input 
                        type='text'
                        id={name}
                        placeholder={placeholder}
                        value={requirement}
                        className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                        onChange={ (e) => setRequirement(e.target.value)}
                    />
                </label>

                <button
                    type='button'
                    onClick={add}
                    className='text-yellow-50'
                >Add</button>
            </div>


            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map( (requirement, index) => (
                                <li key={index} className='flex gap-1'>
                                    <span>{requirement}</span>
                                    <button
                                        onClick={() => del(index)}
                                        type='button'
                                        className='text-xs text-pure-greys-200'
                                    >Clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }

            {
                errors[name] && (
                    <span>
                        {label} is required
                    </span>
                )
            }

        {/* </form> */}
        
    </div>
  )
}

export default RequirementField;