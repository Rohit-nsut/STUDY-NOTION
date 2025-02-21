import React from "react"
import RenderSteps from "./RenderSteps"

export default function AddCourse () {

    return (
        <div className="text-white flex justify-evenly py-10 ">

            <div className="flex flex-col w-[60%] gap-5">
                <h1 className="font-semibold text-3xl text-center text-pink-300">Add Course</h1>
                <div>
                    <RenderSteps />
                </div>
            </div>

            <div className='flex flex-col gap-4 h-1/4 w-1/3 text-richblack-50 bg-richblack-800 px-5 py-5 rounded-lg border-2 border-richblack-700'>
                <p className="text-blue-200 font-semibold text-xl ">⚡Course Upload Tips</p>
                <div className="pl-6">
                    <ol className=" list-disc">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ol>
                </div>
            </div>

        </div>
    )

}