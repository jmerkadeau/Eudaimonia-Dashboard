import React from 'react';

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const year = today.getFullYear();
export const date = month+'-'+day+'-'+year;