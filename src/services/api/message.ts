/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
//import React from 'react'

export async function getMessage(id: any) {

    try{
        const { data } = await axios.get(`localhost:5173/message/${id}`);

        return data;
    } catch( error ) {
        console.log(error);
    }    
}
