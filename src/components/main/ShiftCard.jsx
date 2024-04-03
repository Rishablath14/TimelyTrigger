import { database } from '@/firebase';
import { push, ref, set } from 'firebase/database';
import React, { useState } from 'react';

import toast from 'react-hot-toast';

function ShiftTimingForm({univerid}) {
  const [shiftsData, setShiftsData] = useState([{ shiftName: '', from: '', to: '', lunchFrom: '', lunchTo: '', lectures: [{Timing: {from: '', to: ''}}] }]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const collegeData = {};
    shiftsData.forEach((shift, index) => {
      const shiftData = {
        Timing: {from: shift.from, to: shift.to},
        lectures: {},
        Lunch: {Timing:{from: shift.lunchFrom, to: shift.lunchTo }}
      };

      shift.lectures.forEach((lecture, lectureIndex) => {
        shiftData.lectures[`Lecture ${lectureIndex + 1}`] = lecture;
      });

      collegeData[`shift_${index + 1}`] = shiftData;
    });
    const postListRef = ref(database, 'universities/' + univerid + "/College Data");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      ...collegeData
    })
// set(ref(database, 'universities/' + univerid + "/College Data"), {
//   ...collegeData
// })
.then(() => {
      setShiftsData([{ shiftName: '', from: '', to: '', lunchFrom: '', lunchTo: '', lectures: [{Timing: {from: '', to: ''}}] }]);
      toast.success('Data saved successfully!');
      try
  {
      fetch('/api/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        univerId:false,  
  })}).then(()=>{
    location.reload();
  })
  }
    catch(e){console.log(e);}  
})
.catch((error) => {
      console.error('Error saving data:', error);
      alert('Error occurred while saving data. Please try again later.');
    });
  };

  const handleShiftChange = (index, fieldName, value) => {
    const updatedShiftsData = [...shiftsData];
    updatedShiftsData[index][fieldName] = value;
    setShiftsData(updatedShiftsData);
  };

  const handleLectureChange = (shiftIndex, lectureIndex, fieldName, value) => {
    const updatedShiftsData = [...shiftsData];
    updatedShiftsData[shiftIndex].lectures[lectureIndex].Timing[fieldName] = value;
    setShiftsData(updatedShiftsData);
  };

  const addShift = () => {
    setShiftsData([...shiftsData, { shiftName: '', from: '', to: '', lunchFrom: '', lunchTo: '', lectures: [{Timing: {from: '', to: ''}}] }]);
  };
  const removeShift = (index) => {
    const updatedShiftsData = [...shiftsData];
    updatedShiftsData.splice(index, 1);
    setShiftsData(updatedShiftsData);
  };
  const addLecture = (shiftIndex) => {
    const updatedShiftsData = [...shiftsData];
    updatedShiftsData[shiftIndex].lectures.push({Timing: {from: '', to: ''}});
    setShiftsData(updatedShiftsData);
  };
  const removeLecture = (shiftIndex, lectureIndex) => {
    const updatedShiftsData = [...shiftsData];
    updatedShiftsData[shiftIndex].lectures.splice(lectureIndex, 1);
    setShiftsData(updatedShiftsData);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Shift Timing Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {shiftsData.map((shift, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Shift {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Shift Name:</label>
                <input
                  type="text"
                  value={shift.shiftName}
                  onChange={(e) => handleShiftChange(index, 'shiftName', e.target.value)}
                  className="block w-full rounded-md border border-black dark:border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white px-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Shift From:</label>
                <input
                  type="time"
                  value={shift.from}
                  onChange={(e) => handleShiftChange(index, 'from', e.target.value)}
                  className="block w-full rounded-md border border-black dark:border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white px-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Shift To:</label>
                <input
                  type="time"
                  value={shift.to}
                  onChange={(e) => handleShiftChange(index, 'to', e.target.value)}
                  className="block w-full rounded-md border border-black dark:border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white px-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Lunch Time:</label>
                <div className="flex">
                  <input
                    type="time"
                    value={shift.lunchFrom}
                    onChange={(e) => handleShiftChange(index, 'lunchFrom', e.target.value)}
                    className="block w-full mr-2 rounded-md border border-black dark:border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white px-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    value={shift.lunchTo}
                    onChange={(e) => handleShiftChange(index, 'lunchTo', e.target.value)}
                    className="block w-full ml-2 rounded-md border border-black dark:border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white px-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
            </div>
            {shift.lectures.map((lecture, lectureIndex) => (
              <div key={lectureIndex} className="border-t mt-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Lecture {lectureIndex + 1} Start Time:</label>
                    <input
                      type="time"
                      value={lecture.Timing.from}
                      onChange={(e) => handleLectureChange(index, lectureIndex, 'from', e.target.value)}
                      className="block w-full rounded-md border border-black dark:border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white px-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Lecture {lectureIndex + 1} End Time:</label>
                    <input
                      type="time"
                      value={lecture.Timing.to}
                      onChange={(e) => handleLectureChange(index, lectureIndex, 'to', e.target.value)}
                      className="block w-full rounded-md border border-black dark:border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white px-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>
                <button type="button" onClick={() => removeLecture(index, lectureIndex)} className="bg-red-500 text-white font-bold py-1 px-1 rounded hover:bg-red-700">Remove Lecture</button>
              </div>
            ))}
            <button type="button" onClick={() => addLecture(index)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 mr-4">Add Lecture</button>
            <button type="button" onClick={() => removeShift(index)} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 mt-4">Remove Shift</button>
          </div>
        ))}
        <button type="button" onClick={addShift} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Add Shift</button>
        <button type="submit" className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 ml-4">Submit</button>
      </form>
    </div>
  );
}

export default ShiftTimingForm;