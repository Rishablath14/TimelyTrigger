import React, { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { onValue, ref, set } from 'firebase/database';
import { database } from '@/firebase';
import toast from 'react-hot-toast';

function TeacherExcelReader({univerid}) {
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


  const columns = useMemo(() => {
    if (!academicData || academicData.length === 0) return [];
    return Object.keys(academicData[0]).map((key) => ({ Header: key, accessor: key }));
  }, [academicData]);


  const onDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setUploading(true);
    const toastGo = toast.loading("Uploading File...");
    const file = e.target.files? e.target.files[0] : e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://127.0.0.1:5000//upload_teachers_data', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
      const reader = new FileReader();
      reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setAcademicData(jsonData);
    };

    reader.readAsArrayBuffer(file);
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
    const filteredData = academicData.filter(row => row['Department Name']?.toLowerCase() === filterValue?.toLowerCase());
    setFilteredData(filteredData);
  };

  const clearFilter = () => {
    setFilterValue('');
    setFilteredData(null);
    fetchData();
  };

  const fetchData = async () => {
    // Fetch data from Firebase
    return onValue(ref(database, 'universities/' + "test2_University" + "/academic_data"), (snapshot) => {
      const data = (snapshot.val()) || 'Anonymous';
      console.log(data);
      
    }, {
      onlyOnce: true
    });
  };

  return (
    <div className="w-full px-2 mx-auto my-5">
        <div className=" mb-3 w-full flex flex-wrap gap-3">
          <input type="text" placeholder="Enter Department to filter" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mr-2" />
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={applyFilter}>Apply Filter</button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={clearFilter}>Clear Filter</button>
        </div>
      <div className="mb-5">
        <div className={`border border-dashed border-gray-500 p-5 ${isDragging ? 'bg-gray-100' : ''}`} onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
          <label htmlFor="excel-upload" disabled={uploading} className="block text-lg font-bold mb-3">Upload Excel Sheet Teachers Data</label>
          <input type="file" name="file" disabled={uploading} accept=".xlsx, .xls" id="excel-upload" onChange={(e) => onDrop(e)} className="hidden" />
          <div className="h-32 flex flex-col justify-center items-center">
            <p className="text-gray-600">Drag 'n' drop or click to select an Excel file</p>
          </div>
        </div>
      </div>
      <div className="table-responsive overflow-x-auto max-w-full">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white dark:font-bold">
              {columns.map((column, index) => (
                <th key={index} className="p-2">{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataToShow && dataToShow.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex} className="p-2">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherExcelReader;
