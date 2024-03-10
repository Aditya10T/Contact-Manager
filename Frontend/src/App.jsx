import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'
import { useEffect, useState } from 'react';
import axios from "axios";
import FormModal from './components/FormModal';

function App() {

  const [tableData,setTableData] = useState([]);
  const [selectedRows,setSelectedRows] = useState([]);
  const [add,setAdd] = useState(false);
  const [editSection,setEditSection] = useState(false);
  const [formData,setFormData] = useState({
    name :"",
    email:"",
    phone:"",
    hobbies:[],
  })

  const [formDataEdit,setFormDataEdit] = useState({
    name : "",
    email : "",
    mobile : "",
    hobbies:[],
    _id : ""
  })

  const handleOnChange = (e) => {
    const {value,name} = e.target;
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/v1/create",formData);
      setAdd(false);
      alert("Data added Successfully");
      setFormData({
        name:"",
        email:"",
        phone:"",
        hobbies:[]
      })
      fetchData();
    } catch (error) {
      alert(res.data.error.message);
    }
  }

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/v1/all");
      setTableData(res.data);
    } catch (err) {
      alert(res.data.error.message);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8800/api/v1/update",formDataEdit)
      alert("Updated Successfully");
      fetchData();
      setEditSection(false);
    } catch (error) {
      alert(res.data.error.message);
    }
  }

  const handleEditOnChange = async (e) => {
     const{value,name} = e.target;
     setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
     })
  }

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:8800/api/v1/delete/"+id)
      alert("Deleted Successfully");
      fetchData();
    } catch (error) {
      alert(res.data.error.message);
    }
  }

  const handleCheckboxChange = (el) => {
    // console.log(el);
    if(selectedRows.includes(el)){
      setSelectedRows(selectedRows.filter(row=> row!==el));
    }
    else{
      setSelectedRows([...selectedRows,el]);
    }
  }
  // console.log(selectedRows);

  const handleMail = async () => {
    try {
      // console.log(selectedRows);
      if(selectedRows.length === 0){
        alert("You haven't selected any row")
      }
      else{
        console.log(selectedRows);
        const res = await axios.post("http://localhost:8800/api/v1/mail",{
          selectedRows:selectedRows,
        });
        alert("Email sent successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <>
    <div className=''>
    <div className='bg-black w-full flex justify-between items-center'>
        <span className='text-white font-bold text-3xl ml-8'>RPS</span>
        <div className="">
          <button className='bg-indigo-500 hover:bg-indigo-800 text-white font-bold rounded-lg ml-4 px-4 py-2 my-4' onClick={() => { setAdd(true) }}>Add</button>
          <button className='bg-indigo-500 ml-4 mr-4 rounded-lg font-bold text-white hover:bg-indigo-800 px-4 py-2 my-4' onClick={handleMail}>SendMail</button>
        </div>
      </div>
      {add && (
        <FormModal  setAdd={setAdd} handleSubmit={handleSubmit} handleOnChange={handleOnChange} rest={formData} setRest={setFormData}/>
      )}
      {
        editSection && (
          <FormModal  setAdd={setEditSection} handleSubmit={handleUpdate} handleOnChange={handleEditOnChange} rest={formDataEdit} setRest={setFormDataEdit}/>
        )
      }
    </div>
     <table className="w-full mt-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               <th scope="col" className="px-6 py-3 bg-indigo-300 text-white">
                  Select
                </th>
                <th scope="col" className="px-6 py-3 bg-indigo-400 text-white">
                    SNo.
                </th>
                <th scope="col" className="px-6 py-3 bg-indigo-300 text-white">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 bg-indigo-400 text-white">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3 bg-indigo-300 text-white">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 bg-indigo-400 text-white">
                    Hobbies
                </th>
                <th scope="col" className="px-6 py-3 bg-indigo-300 text-white">
                    Action
                </th>
            </tr>
        </thead>
        {tableData[0] ? (
          tableData.map((el,index)=>{
            return(
              <Table index={index} el={el} handleEdit={handleEdit} handleDelete={handleDelete} handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows}/>
            )
          })
        ):<span>No data</span>}
    </table>
    </>
  )
}

export default App
