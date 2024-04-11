"use client"
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function GenerateTimeTable({univerid}) {
    const [shifts, setShifts] = useState([]);
    const [branches, setBranches] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [sessionFromMonth, setSessionFromMonth] = useState('January');
    const [sessionToMonth, setSessionToMonth] = useState('January');
    const [sessionYear, setSessionYear] = useState('');
    const [departments,setDepartments] = useState([]);
    const [genTimetable, setgenTimetable] = useState(null);
    
    const formData = new FormData();
    formData.append('univerId', univerid);
    
    useEffect(() => {
        if(univerid){
        fetchShifts();
        fetchTimetable();
        fetchdepartments();}
    }, [univerid]);


    const fetchTimetable=()=>{
            fetch('https://timelytriggerbackend.onrender.com/fetch_generated_timetable', {
                method: 'POST',
                body: formData,
              })
                .then(response => response.json())
                .then(data => {
                    setgenTimetable(data.gentimetable)
                })
                .catch(error => console.error('Error fetching shifts:', error));
        };

    const fetchShifts = () => {
        fetch('https://timelytriggerbackend.onrender.com/fetch_shifts', {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
                setShifts(data.shifts);
            })
            .catch(error => console.error('Error fetching shifts:', error));
    };
    const fetchdepartments = () => {
        fetch('https://timelytriggerbackend.onrender.com/fetch_departments', {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
                setDepartments(data.departments);
            })
            .catch(error => console.error('Error fetching departments:', error));
    };

    const fetchBranches = department => {
        formData.append('department', department);
        fetch('https://timelytriggerbackend.onrender.com/fetch_branches', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setBranches(data.branches);
            })
            .catch(error => console.error('Error fetching branches:', error));
    };

    const fetchPrograms = (department, branch) => {
        formData.append('department', department);
        formData.append('branch', branch);
        fetch('https://timelytriggerbackend.onrender.com/fetch_programs', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setPrograms(data.programs);
            })
            .catch(error => console.error('Error fetching programs:', error));
    };

    const fetchSemesters = (department, branch, program) => {
        formData.append('department', department);
        formData.append('branch', branch);
        formData.append('program', program);
        fetch('https://timelytriggerbackend.onrender.com/fetch_semesters', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setSemesters(data.semesters);
            })
            .catch(error => console.error('Error fetching semesters:', error));
    };

    const fillYearDropdown = () => {
        const currentYear = new Date().getFullYear();
        const earliestYear = 2020; // Adjust this as needed
        const latestYear = currentYear + 1; // or set this to a specific year
        const years = [];
        for (let year = earliestYear; year <= latestYear; year++) {
            years.push(year);
        }
        return years;
    };

    const adjustDateSelection = () => {
        // Example: Prevent the "To" month from being earlier than the "From" month if they choose the same year
        // This is a simple starter idea; you may need something more complex based on your application's logic
        const fromMonthIndex = sessionFromMonth ? sessionFromMonth : 0;
        const toMonthIndex = sessionToMonth ? sessionToMonth : 0;
        if (fromMonthIndex > toMonthIndex) {
            setSessionToMonth(sessionFromMonth);
        }
    };

    useEffect(() => {
        adjustDateSelection();
    }, [sessionFromMonth, sessionToMonth]);
    

    const handleSubmit = (department,branch,shift,program,semester,e) => {
        e.preventDefault();
        formData.append('department', department);
        formData.append('branch', branch);
        formData.append('program', program);
        formData.append('shift', shift);
        formData.append('semester', semester);
        formData.append('sessionFromMonth', sessionFromMonth);
        formData.append('sessionToMonth', sessionToMonth);
        formData.append('sessionYear', sessionYear);
        const toastGo = toast.loading("Generating Timetable...");
        fetch('https://timelytriggerbackend.onrender.com/generate_time_table_result', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setTimeout(()=>{
                    toast.success(
                        `Timetable Generated Successfully!`,{
                          id:toastGo
                        })
                },30000)
            })
            .catch(error => {console.error('Error fetching semesters:', error);
            toast.error(
                `Timetable Generation Failed!`,{
                  id:toastGo
                })});
    }
    const printTimetable = () => {
        const printableContent = document.getElementById('timetable').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Printed Timetable</title>
                <link rel="stylesheet" href="/print.css" type="text/css" media="print">
            </head>
            <body>
                ${printableContent}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    return (
        <div className='flex flex-col gap-2 md:mx-4 mx-2'>
            <h1 className='text-xl font-bold mb-2'>Generate Time Table</h1>
            <form id="generateForm" onSubmit={e => handleSubmit(document.getElementById('department').value, document.getElementById('branch').value,document.getElementById('shift').value,document.getElementById('program').value,document.getElementById('semester').value,e)}>
                <label htmlFor="shift">Choose a Shift:</label>
                <select id="shift" defaultValue={shifts[0]} name="shift">
                    {shifts.map((shift, index) => (
                        <option key={index} value={shift}>
                            {shift}
                        </option>
                    ))}
                </select>
                <br /><br />
                <label htmlFor="department">Choose a Department:</label>
                <select defaultValue="" id="department" name="department" onChange={e => fetchBranches(e.target.value)}>
                    <option value="" disabled>Choose a Department</option>
                    {departments.map((department, index) => (
                        <option key={index} value={department}>{department}</option>
                    ))}
                </select>
                <br /><br />
                <label htmlFor="branch">Choose a Branch:</label>
                <select defaultValue="" id="branch" name="branch" onChange={e => fetchPrograms(document.getElementById('department').value, e.target.value)}>
                    <option value="" disabled>Select a Branch</option>
                    {branches.map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                    ))}
                </select>
                <br /><br />
                <label htmlFor="program">Choose a Program:</label>
                <select defaultValue="" id="program" name="program" onChange={e => fetchSemesters(document.getElementById('department').value, document.getElementById('branch').value, e.target.value)}>
                    <option value="" disabled>Select a Program</option>
                    {programs.map((program, index) => (
                        <option key={index} value={program}>{program}</option>
                    ))}
                </select>
                <br /><br />
                <label htmlFor="semester">Choose a Semester:</label>
                <select defaultValue="" id="semester" name="semester">
                    <option value="" disabled>Choose a Semester</option>
                    {semesters.map((semester, index) => (
                        <option key={index} value={semester}>{semester}</option>
                    ))}
                </select>
                <br /><br />
                <div className='mb-5 flex items-center gap-[10px]'>
                    <label htmlFor="sessionFromMonth">Session From:</label>
                    <select id="sessionFromMonth" name="sessionFromMonth" value={sessionFromMonth} onChange={e => setSessionFromMonth(e.target.value)}>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>

                    <label htmlFor="sessionToMonth">To:</label>
                    <select id="sessionToMonth" name="sessionToMonth" value={sessionToMonth} onChange={e => setSessionToMonth(e.target.value)}>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>

                    <select id="sessionYear" name="sessionYear" value={sessionYear} onChange={e => setSessionYear(e.target.value)}>
                        {fillYearDropdown().map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                {/* Add other form fields as needed */}
                {/* button to redirect to Generate Time Table page */}
                <button type="submit" className='p-2 bg-gray-700 text-xl text-white rounded-md mt-2'>Generate Timetable</button>
            </form>
            <div className="max-w-full mt-4">
        {genTimetable && Object.entries(genTimetable).map(([key,structs]) => (
            <div>
            <button onClick={printTimetable} className='p-2 bg-gray-700 text-base text-white rounded-md mt-2'>Print Timetable</button>    
            <div key={key} className="table-responsive overflow-x-scroll max-w-full" id='timetable'>
            <h3 className='text-md font-bold text-white bg-zinc-900 rounded-md p-2 my-4' key={key}>{
                structs["Structure"]
            }</h3>

          <table className="w-full table-auto border-collapse border text-center overflow-x-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white dark:font-bold">
            <th className='p-2'>Days</th>    
            {structs["shift"]=="shift_1" &&   
            ['08:30 - 09:20', '09:20 - 10:10', '10:10 - 11:00', '11:00 - 11:50', '11:50 - 12:20', '12:20 - 13:10', '13:10 - 14:00', '14:00 - 14:50'].map((time,ind)=>
              <th className="p-2" key={ind}>{time}</th>
            )
            }
            {structs["shift"]!="shift_1" &&   
            ['10:10 - 11:00', '11:00 - 11:50', '11:50 - 12:40', '12:40 - 13:10', '13:10 - 14:00', '14:00 - 14:50','14:50 - 15:40','15:40 - 16:30'].map((time,ind)=>
              <th className="p-2" key={ind}>{time}</th>
            )
            }
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
            <td className="p-2 border-[1px]">Monday</td>   
          {Object.entries(structs["timetable"]["Monday"]).map(([day,timings],ind)=>
          ( ind==4?
            <td key={ind} className="p-12 border-[1px]">
            Lunch
            </td>
             :
             <td key={ind} className="p-2 border-[1px]">
                {`${timings['subject']} (${(timings['teacher'])})`}
             </td>
          )
        )}
        </tr>
            <tr className="border-t">
            <td className="p-2 border-[1px]">Tuesday</td>   
          {Object.entries(structs["timetable"]["Tuesday"]).map(([day,timings],ind)=>
          ( ind==4?
            <td key={ind} className="p-12 border-[1px]">
            Lunch
            </td>
             :
             <td key={ind} className="p-2 border-[1px]">
                {`${timings['subject']} (${(timings['teacher'])})`}
             </td>
          )
        )}
        </tr>
            <tr className="border-t">
            <td className="p-2 border-[1px]">Wednesday</td>   
          {Object.entries(structs["timetable"]["Wednesday"]).map(([day,timings],ind)=>
          ( ind==4?
            <td key={ind} className="p-12 border-[1px]">
            Lunch
            </td>
             :
             <td key={ind} className="p-2 border-[1px]">
                {`${timings['subject']} (${(timings['teacher'])})`}
             </td>
          )
        )}
        </tr>
            <tr className="border-t">
            <td className="p-2 border-[1px]">Thrusday</td>   
          {Object.entries(structs["timetable"]["Thursday"]).map(([day,timings],ind)=>
          ( ind==4?
            <td key={ind} className="p-12 border-[1px]">
            Lunch
            </td>
             :
             <td key={ind} className="p-2 border-[1px]">
                {`${timings['subject']} (${(timings['teacher'])})`}
             </td>
          )
        )}
        </tr>
            <tr className="border-t">
            <td className="p-2 border-[1px]">Friday</td>   
          {Object.entries(structs["timetable"]["Friday"]).map(([day,timings],ind)=>
          ( ind==4?
            <td key={ind} className="p-12 border-[1px]">
            Lunch
            </td>
             :
             <td key={ind} className="p-2 border-[1px]">
                {`${timings['subject']} (${(timings['teacher'])})`}
             </td>
          )
        )}
        </tr>
            <tr className="border-t">
            <td className="p-2 border-[1px]">Saturday</td>   
          {Object.entries(structs["timetable"]["Saturday"]).map(([day,timings],ind)=>
          ( ind==4?
            <td key={ind} className="p-12 border-[1px]">
            Lunch
            </td>
             :
             <td key={ind} className="p-2 border-[1px]">
                {`${timings['subject']} (${(timings['teacher'])})`}
             </td>
          )
        )}
        </tr>
          </tbody>
        </table>
            </div>
            </div>

        // <table className="w-full table-auto border-collapse border text-center">
        //   <thead>
        //     <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white dark:font-bold">
        //     <th className="p-2">Room Number</th>
        //       <th className="p-2">Room Type</th>
        //       <th className="p-2">Capacity</th>
        //       <th className="p-2">Department Name</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //   </tbody>
        // </table>
            ))
    }
        </div>
        </div>
    );
}

export default GenerateTimeTable;
