import React from 'react'

export const formatDate = (date) => {
    // Format the date as 'mm-dd-yyyy'
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};



