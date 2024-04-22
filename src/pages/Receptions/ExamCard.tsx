'use client';

import { Card } from 'flowbite-react';
import { useState } from 'react';
import { BsFillFileEarmarkMedicalFill } from 'react-icons/bs';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

interface ExamCardProps {
  name: string;
}

const ExamCard = ({ name }: ExamCardProps) => {
  const [isSelected, setIsSelected] = useState(false); // 


  return (


    <button
      onClick={() => setIsSelected(!isSelected)}
      className={`max-w-40 w-60 h-25 font-bold py-2 px-4 rounded inline-flex items-center shadow-body gap-1 hover:bg-whiten dark:bg-boxdark dark:hover:bg-secondary dark:text-whiten dark:hover:text-white ${isSelected ? 'relative bottom-2 left-2 shadow-md shadow-black dark:bg-primary' : 'shadow-sm'}`}>
      {isSelected ? <IoIosCheckmarkCircle className={`text-primary dark:text-white`}/> : <IoIosCheckmarkCircleOutline />}
      
      <span>{name}</span>
    </button>


  ) 
}

export default ExamCard;


