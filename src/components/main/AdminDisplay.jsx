import React, { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { onValue, ref, set } from 'firebase/database';
import { database } from '@/firebase';
import toast from 'react-hot-toast';

function ExcelReader({univerid}) {
  const [academicData, setAcademicData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dataToShow, setDataToShow] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
useEffect(() => {
  if(filteredData) setDataToShow(filteredData);
  else setDataToShow(academicData);
}, [filteredData,academicData])

  // const columns = useMemo(() => {
  //   if (!academicData || academicData.length === 0) return [];
  //   return Object.keys(academicData[0]).map((key) => ({ Header: key, accessor: key }));
  // }, [academicData]);


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
      const response = await fetch('http://127.0.0.1:5000/upload_academic_data', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
    //   const reader = new FileReader();
    //   reader.onload = async (e) => {
    //   const data = new Uint8Array(e.target.result);
    //   const workbook = XLSX.read(data, { type: 'array' });
    //   const sheetName = workbook.SheetNames[0];
    //   const sheet = workbook.Sheets[sheetName];
    //   const jsonData = XLSX.utils.sheet_to_json(sheet);
    //   // setAcademicData(jsonData);
    //   reader.readAsArrayBuffer(file);
    // };
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
    })
    // console.log(result);
    // const data = Object.entries(academicData);
    // const filteredData = data.filter(([department]) => department.toLowerCase() === filter);
    // const filterId = filteredData[0][0];
    // console.log(filter);
    if (academicData.hasOwnProperty(filterId)) {
      setFilteredData({[filterId]:academicData[filterId]});
    } else {
      return null; // Return null if department not found
    }
    // setFilteredData(filteredData);
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
      console.log(data);
      setAcademicData(data);
      
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
          <label htmlFor="excel-upload" disabled={uploading} className="block text-lg font-bold mb-3">Upload Excel Sheet Academics Data</label>
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
              <th className="p-2">Department</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Programs</th>
              <th className="p-2">Semester 1 subjects</th>
              <th className="p-2">Semester 2 subjects</th>
              <th className="p-2">Semester 3 subjects</th>
              <th className="p-2">Semester 4 subjects</th>
              <th className="p-2">Semester 5 subjects</th>
              <th className="p-2">Semester 6 subjects</th>
              <th className="p-2">Semester 7 subjects</th>
              <th className="p-2">Semester 8 subjects</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow && Object.entries(dataToShow).map(([department, branchs]) => (
              Object.entries(branchs).map(([branch, programs]) => (
                Object.entries(programs).map(([program, subjects]) => (
                  Object.entries(subjects).map(([subject, semesters],ind) => (
                    <tr key={ind} className="border-t">
                      <td className="p-2 border-[1px]">{department}</td>
                      <td className="p-2 border-[1px]">{branch}</td>
                      <td className="p-2 border-[1px]">{program}</td>
                      {Object.entries(semesters).map(([semester, subjectsarr]) => (
                      <td className="p-2 border-[1px]" key={semester}>
                        {
                          Object.entries(subjectsarr).map(([subjectId, subjectname])=>(<span key={subjectId}>{subjectname + ", "}</span>))
                        }
                      </td>
                      ))
                      }
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

export default ExcelReader;
