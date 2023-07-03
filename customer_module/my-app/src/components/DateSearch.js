import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSearch = ({ onSearch }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSearch(date);
  };

  return (
    <div className="date-search">
      <DatePicker
        selected={selectedDate} 
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        isClearable
        placeholderText="Select a date"
     
      />
    </div>
  );
};

export default DateSearch;
