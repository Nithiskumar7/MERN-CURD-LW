
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from './Navbar';


function App() {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');

  //fetch data
  const [foodList, setFoodList] = useState([]);
  //Edit
  const [newFoodName, setNewFoodName] = useState('');

  useEffect(() => {
    Axios.get('https://curd-server-qqej.onrender.com/read')
      .then((response) => {
        console.log(response.data)
        setFoodList(response.data.Result);
      })

  }, [])

  const addFoodData = () => {
    Axios.post("https://curd-server-qqej.onrender.com/insert",
      {
        foodName: foodName,
        description: description
      });
  };

  const UpdateFoodData = (id) => {
    Axios.put("https://curd-server-qqej.onrender.com/update", {
      id: id, newFoodName: newFoodName
    })
  }

  const DeleteData = (id) => {
    Axios.delete(`https://curd-server-qqej.onrender.com/delete/${id}`)
    .then((res)=>console.log(res))
    .catch(err=>console.log(err))
    };


  return (
    <>
    <Navbar/>
      <div className="container">
     
        <form action="">
        <div class="title"><span> REACT-CURD </span></div>
          <div className="form-float">
          <label for="floatingInput">Food Name</label>
            <input type="text" className="form-control" id="floatingInput" placeholder="Food Name" required
              onChange={(e) => { setFoodName(e.target.value) }} />
          </div>

          <div className="form-float">
          <label for="floatingInput">Description</label>
            <input type="text" className="form-control" id="floatingInput" placeholder="Description" required
              onChange={(e) => { setDescription(e.target.value) }} />
          </div>

          <button type="button" className="btn" onClick={addFoodData}>Submit</button>
        </form>
      </div>

<div className="container2">
      <table class="table" border={1}>
    <tr>
      <th>FoodName</th>
      <th>Food Description</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
 

  {foodList.map((val,key) => {
            return    <tr>
       <td>{val.foodName}</td>
       <td>{val.description}</td>  
       <td className='edit'>
        <input type="text" placeholder="update foodname"
        onChange={(event) => {
          setNewFoodName(event.target.value);
        }}></input>
        <button onClick={()=> UpdateFoodData(val._id)}>Edit</button>
        </td>
        <td>
          <button className='btn2' onClick={()=> DeleteData(val._id)}>Delete</button>
          </td> 
        
  
        </tr>
          })}

</table>
</div>
    </>
  );
}

export default App;
