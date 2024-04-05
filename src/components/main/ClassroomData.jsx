import React, { useState, useEffect } from 'react';
import { onValue, ref} from 'firebase/database';
import { database } from '@/firebase';
import toast from 'react-hot-toast';

function ClassroomExcelReader({univerid}) {
  const [academicData, setAcademicData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dataToShow, setDataToShow] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
useEffect(()=>{univerid && fetchData()},[univerid])

useEffect(() => {
  if(filteredData) setDataToShow(filteredData);
  else setDataToShow(academicData);
}, [filteredData,academicData])


  const onDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setUploading(true);
    const toastGo = toast.loading("Uploading File...");
    const file = e.target.files? e.target.files[0] : e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('univerId', univerid);
    try {
      const response = await fetch('http://127.0.0.1:5000/upload_classroom_data', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        fetchData();
        toast.success(
          `File Uploaded Successfully!`,{
            id:toastGo
          })

      } else {
        toast.error('Failed to upload file',{
          id:toastGo});
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    finally{
      setUploading(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const applyFilter = () => {
    if (!academicData) return;
    const filter = filterValue.replaceAll(" ", "_").toLowerCase();
    const filterId = Object.keys(academicData).reduce((acc,key)=>{
      if(key.toLowerCase()===filter){
        acc[key] = academicData[key];
      }
      return acc;
    },{})
    setFilteredData(filterId);
  };

  const clearFilter = () => {
    setFilterValue('');
    setFilteredData(null);
    fetchData();
  };

  const fetchData = async () => {
    // Fetch data from Firebase
    return onValue(ref(database, 'universities/' +univerid+ "/academic_data"), (snapshot) => {
      const data = (snapshot.val()) || 'Anonymous';
      data==="Anonymous"?setAcademicData(null):setAcademicData(data);
    }, {
      onlyOnce: true
    });
  };

  return (
    <div className="w-full px-2 my-5">
        <div className="mb-3 w-full flex flex-wrap gap-3">
          <input type="text" placeholder="Enter Department to filter" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mr-2" />
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={applyFilter}>Apply Filter</button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={clearFilter}>Clear Filter</button>
      </div>
      <div className="mb-5">
        <div className={`border border-dashed border-gray-500 p-5 ${isDragging ? 'bg-gray-100' : ''}`} onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
          <label htmlFor="excel-upload" disabled={uploading} className="block text-lg font-bold mb-3">Upload Excel Sheet Classroom Data</label>
          <input type="file" name="file" disabled={uploading} accept=".xlsx, .xls" id="excel-upload" onChange={(e) => onDrop(e)} className="hidden" />
          <div className="h-32 flex flex-col justify-center items-center">
            <p className="text-gray-600">Drag 'n' drop or click to select an Excel file</p>
          </div>
        </div>
      </div>
      <div className="table-responsive overflow-x-auto max-w-full">
        <table className="w-full table-auto border-collapse border text-center">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white dark:font-bold">
            <th className="p-2">Room Number</th>
              <th className="p-2">Room Type</th>
              <th className="p-2">Capacity</th>
              <th className="p-2">Department Name</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow && Object.entries(dataToShow).map(([department, branchs]) => (
              Object.entries(branchs).map(([branch, names]) => (
                branch=="classrooms_labs_data" &&
                Object.entries(names).map(([name, details]) => (
                  Object.entries(details).map(([detail, sub],ind) => (
                    <tr key={ind} className="border-t">
                      <td className="p-2 border-[1px]">{detail}</td>
                      <td className="p-2 border-[1px]">{sub["Room Type"]}</td>
                      <td className="p-2 border-[1px]">{sub["Capacity"]}</td>
                      <td className="p-2 border-[1px]">{department}</td>
                    </tr>
              ))
            ))
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassroomExcelReader;
