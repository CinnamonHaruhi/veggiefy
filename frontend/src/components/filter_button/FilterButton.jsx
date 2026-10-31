import {React, useEffect, useState} from 'react'

const FilterButton = (props) => {
  const [ buttonClass, setButtonClass ] = useState("filter");

  useEffect(() => {
    const setActive = () => {
      if (props.filterValue == "all" && props.status.length > 1) {
        setButtonClass("filter active");
      } else if (props.status[0] == props.filterValue && props.status.length == 1) {
        setButtonClass("filter active");
      } else {
        setButtonClass("filter");
      }
    }
    setActive();
  }, [props.status]);
 
  return (
    <button 
      type="button" 
      className={buttonClass} 
      data-filter={props.filterValue} 
      role="tab" 
      aria-selected="true" 
      onClick={props.onClick}>
        {props.filterName}
      </button>
  )
}

export default FilterButton