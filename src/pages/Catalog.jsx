import { useEffect, useState } from 'react'
import FooterSection from '../components/common/FooterSection';
import { apiConnector } from '../services/connectApi';
import { categories } from '../services/apis';
import { useParams } from 'react-router-dom';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { Link } from 'react-router-dom';



const Catalog = () => {

    const {catalogName} = useParams();

    const [catalogData, setCatalogData] = useState(null);

    const [categoryId, setCategoryId] = useState("");

    // const [mostSellingCourses, setMostSellingCourses] = useState([]);

    useEffect( () => {

        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            
            // console.log(55,res);
            const category_id = res?.data?.allCategory?.filter( (ct) => ct.name === catalogName)[0]._id;
            
            setCategoryId(category_id);
            // console.log(category_id);
            // console.log("categoryId",categoryId);
        }  
        
        getCategories();

    },[catalogName]);


    // console.log("catalogData",catalogName);
    useEffect( () => {
        const getCategoryDetails = async() => {
            if(!categoryId)return;
            try {
                const res = await getCatalogPageData(categoryId);
                // console.log("printing res", res);

                setCatalogData(res);    

            } 
            catch (error) {
                console.log(error);
            }
        }

        
        getCategoryDetails();
        // console.log("Rohit",catalogData?.data?.differentCategories);
    },[categoryId]);


  return (
    <div className=''>


        <div className='bg-richblack-800'>
            <div className='flex w-10/12 mx-auto justify-between gap-3 py-8'>

                <div className='flex flex-col gap-3 py-10'>
                    <p className='text-richblack-300'> {`Home / Catalog / `} 
                        <span className='text-yellow-50'>
                            {catalogData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className='text-richblack-5 text-3xl font-semibold'> {catalogData?.data?.selectedCategory?.name} </p>
                    <p className='text-richblack-300'> {catalogData?.data?.selectedCategory?.description} </p>
                </div>

                <div className='flex flex-col gap-3 py-3 lg:w-72'>
                    <div className='text-richblack-5 text-xl font-semibold'>Related Resources</div>
                    <ul className='text-richblack-300 list-disc pl-4 flex flex-col gap-2'>
                        <Link className=' hover:text-richblack-25 '>
                            <li>Doc {catalogData?.data?.selectedCategory?.name}</li>
                        </Link>
                        <Link className=' hover:text-richblack-25 '>
                            <li>Cheatsheets</li>
                        </Link>
                        <Link className=' hover:text-richblack-25 '>
                            <li>Articles</li>
                        </Link>
                        <Link className=' hover:text-richblack-25 '>
                            <li>Community Forums</li>
                        </Link>
                        <Link className=' hover:text-richblack-25 '>
                            <li>Projects</li>
                        </Link>
                    </ul>
                </div>

            </div>
        </div>
        

        <div className='flex flex-col gap-12 py-16 w-10/12 mx-auto'>
            {/* Section 1 */}
            <div className='flex flex-col gap-10 '>
                <div className='flex flex-col gap-4'>
                    <div className='text-richblack-5 text-3xl font-semibold'>Courses to get you Started</div>
                    <div className='flex gap-5 text-richblack-300 border-b border-richblack-500'>
                        <p className='text-yellow-25 border-b-2 border-yellow-25'>Most Popular</p>
                        <p>New</p>
                    </div>
                </div>
                <div className=''>
                    <CourseSlider courses={catalogData?.data?.selectedCategory.courses} />
                </div>
            </div>

            {/* Section 2 */}
            <div className='flex flex-col gap-8'>
                <p className='text-richblack-5 text-3xl font-semibold'>Top Courses in {catalogData?.data?.selectedCategory?.name}</p>
                <div>
                <div>
                    <CourseSlider courses={catalogData?.data?.mostSellingCourses} />
                </div>
                </div>
            </div>

            {/* section 3 */}
            <div className='flex flex-col gap- py-5'>
                <p className='text-richblack-5 text-3xl font-semibold'>Frequently Bought Together</p>
                <div className='py-8'>
                    <div className='flex flex-wrap  justify-between gap-10'>
                        
                        {
                            catalogData?.data?.mostSellingCourses?.map( (course, index) => (
                                <CourseCard course={course} key={index} Height={"h-[300px]"} />
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>

        <FooterSection />

    </div>
  )
}

export default Catalog;