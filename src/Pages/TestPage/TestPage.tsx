import React, { useEffect, useRef, useState } from 'react';
import FilterList from '../../Components/FilterList/FilterList';
import '../../Styles/TestPage.css';

const  TestPage: React.FC = () => {
    const [ShowContent,setShowContent] = useState<boolean>(false);
    const FilterListRef = useRef<HTMLDivElement>(null);

    const HandelButtonEvent= () => {
        setShowContent(true);
    }

    const HandleClickOutside = (e: MouseEvent) => {
        // Close the FilterList if the click is outside of the FilterList element
        if (FilterListRef.current && !FilterListRef.current.contains(e.target as Node)) {
          setShowContent(false);
        }
      };

    useEffect(()=> {
        document.addEventListener('mousedown', HandleClickOutside);
        return () => {
            document.removeEventListener('mousedown' ,  HandleClickOutside);
        }        
    },[]);
  return (
    <div className='test-page'>
      <div>
        <button className='filter-button' onClick={HandelButtonEvent}>Filter-List</button>
      </div>
      <div>
         {ShowContent && <FilterList ref={FilterListRef}/>}
      </div>
    </div>
  )
}

export default TestPage
