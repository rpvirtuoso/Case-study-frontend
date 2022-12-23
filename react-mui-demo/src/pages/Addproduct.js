import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import  { useState } from 'react';
import { AppBar,  IconButton, Stack, Toolbar, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import axios from 'axios';
import { useEffect } from 'react';

const Addproduct = () => {
    const navigate=useNavigate();
    const [name,setName]=useState([]);
    const [price,setPrice]=useState([]);
    const [image,setImage]=useState([]);
    const [category,setCategory]=useState(null);
    const [subcategory,setSubCategory]=useState([]);
    const [description,setDescription]=useState([]);

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);


    const handleAddProduct=async (event)=>
    {
        
        event.preventDefault();
        const token=localStorage.getItem('token');
  
    const config = {  headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Token ${token}`
      }
  };
        const body = {
            name,
            price,
            image,
            category,
            subcategory,
            description,
          };
          const response = await axios.post('http://127.0.0.1:8000/api/products/addProduct',  body,config)
          console.log(response);
        
    }
    useEffect(() => {
        async function fetchCategories() {
            const token=localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Token ${token}` }
            };
          const response = await axios.get('http://127.0.0.1:8000/api/products/getCategories',config);
          console.log(response);
          if (response.status===401){
            navigate('/login');
            console.log(response.status);

          }
          const data = await response.data;
          console.log(data);
          setCategories(data);
        }
        fetchCategories();
      }, []);

      useEffect(() => {
        async function fetchSubCategories() {
            const token=localStorage.getItem('token');
              console.log(token)
              if(token===null)
              {
                navigate('/login')
              }
                const config = {  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                    }
                    };
            
          const response = await axios.post('http://127.0.0.1:8000/api/products/getSubCategories',{ category },config);
          console.log(response);
          if (response.status===401){
            navigate('/login');
            console.log(response.status);

          }
          const data = await response.data;
          setSubCategories(data);

        }
        fetchSubCategories();
      }, [category]);




  return (
    <div>
       <AppBar position='static'>
            <Toolbar>
                <IconButton onClick={() => {  navigate("/"); }} size='large' edge='start' color="inherit" aria-label="logo">
                        <StoreIcon/>
                </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow:1}}>
                        Shopping App
                    </Typography>
                    </Toolbar>
                    </AppBar>
                    <Form>
    <Form.Group className="mb-3" controlId="formname">
      <Form.Label>Product Name</Form.Label>
      <Form.Control onChange={(e)=>setName(e.target.value)} placeholder="Enter Product name" />
    </Form.Group>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control onChange={(e)=>setPrice(e.target.value)} type="number" placeholder='Enter Product  Price' />
        
      </Form.Group>

      <Form.Group as={Col} controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Form.Text className="text-muted">
                Select an image file from your device.
            </Form.Text>
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" controlId="formCategory">
      <Form.Label>category</Form.Label>
        <Form.Control as="select" onChange={(e)=>{setCategory(e.target.value);
                                                    console.log(category)}}>
            <option value="">Select a category</option>
                {categories.map((category) => (
                <option key={category.id} value={category.name}>
                        {category.name}
                </option>
             ))}
        </Form.Control>    
    </Form.Group>

    <Form.Group className="mb-3" controlId="formSubCategory">
      <Form.Label>SubCategory</Form.Label>
      <Form.Control  as='select' onChange={(e)=>setSubCategory(e.target.value)}>
      <option value="">Select a sub-category</option>
                {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.name}>
                        {subcategory.name}
                </option>
             ))}
      </Form.Control>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" placeholder='Enter Product  Dexscription' onChange={(e)=>setDescription(e.target.value)}>
      
      </Form.Control>
    </Form.Group>


    
{/* 
    <Form.Group className="mb-3" id="formGridCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group> */}

    <Button onClick={handleAddProduct} variant="primary" type="submit">
      Add
    </Button>
  </Form>
    </div>
  )
}

export default Addproduct
