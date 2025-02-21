// import React from 'react';
import {toast} from 'react-hot-toast';
import { apiConnector } from '../connectApi';
import { catalogData } from '../apis';

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");

    let result = [];
    
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId});

        if(!response?.data?.success){
            throw new Error("Could not fetch catagory page data");
        }

        console.log("Catalog page data API fetch data successfully", response);

        result = response?.data;
    } 
    catch (error) {
        console.log("Catalog page data API Error...", error);
        toast.error(error.message);
        result = error.response?.data;
    }

    toast.dismiss(toastId);
    return result;
;}