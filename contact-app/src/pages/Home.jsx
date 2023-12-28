import React, { useState } from 'react'

const Home = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
    });

    const [tableData, setTableData] = useState([]);

    const [editClick, setEditClick] = useState(false);

    const [editIndex, setEditIndex] = useState("");

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editClick) {
            const tempTableData = tableData; 
            Object.assign(tempTableData[editIndex], inputs)
            setTableData([...tempTableData]);
            setEditClick(false);
            setInputs({
                name: "",
                email: "",
            });
        } else {
            setTableData([
                ...tableData, inputs
            ]);
            setInputs({
                name: "",
                email: "",
            });
        }
    };

    const handleDelete = (index) => {
        const filterData = tableData.filter((item, i) => i!== index);
        setTableData(filterData);
    };

    const handleUpdate = (index) => {
        const tempData = tableData[index];
        setInputs({
            name: tempData.name,
            email: tempData.email,
        })
        setEditClick(true);
        setEditIndex(index);
    }

    return (
        <div className='min-h-screen bg-[#004b43]'>
            <h1 className='text-center mb-5 text-lg text-white'>Crud Application</h1>
            <div className='bg-[#e5e4e4] max-w-fit m-auto p-12'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-2'>
                        <label>Name</label>
                        <input name='name' value={inputs.name} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label>Email</label>
                        <input name='email' value={inputs.email} onChange={handleChange} />
                    </div>
                    <button type='submit' className='w-full bg-[#014d64] text-white mt-4'>{editClick ? "Update" : "Add"}</button>
                </form>
            </div>
            <div>
                <table className='w-full text-center mt-4 text-white'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((item, i) => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button onClick={() => handleUpdate(i)} className='mr-3 text-yellow-300'>Edit</button>
                                        <button onClick={() => handleDelete(i)} className='mr-3 text-red-300'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home