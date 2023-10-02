import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, MenuItem, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import NavBar from './NavBar';
import axios from 'axios';

const Home = () => {


    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [respData, setRespData] = useState([]);
    const [isEdit,setIsEdit] =useState(false);
    const [id,setID]=useState(null);


    const categories = [
        'Mobile & Computer',
        'Fashion & Beauty',
        'Groceries & Pet Supplies',
        'Home , Furniture & Application',
        'Music ,Video & Gamming',
        'Book & Education',
        'Toys ,Children & Baby',
        'Payment & Booking',
        'Automotive',
        'Office & Profeesional',
        'Sports , Outdoor & Travel',
        'Gifting',
        "Bills  & EMI's",
        'Other'
    ];


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    // Handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("userId"));

       if(isEdit&&id){

        const resp = await axios.put(`http://localhost:4000/expense/${userId}/${id}`, { category, description, amount }, { headers: { authentication: `Bearer ${token}` } });

        if (resp.data.message) {
            alert("Please Register Yourself")
        } else {

            const getData = await axios.get(`http://localhost:4000/expense/${userId}`, { headers: { authentication: `Bearer ${token}` } });

            setRespData(getData.data);
            setIsEdit(false);
        }
    }
      else{      
        const resp = await axios.post("http://localhost:4000/expense/", { category, description, amount, userId }, { headers: { authentication: `Bearer ${token}` } });

        if (resp.data.message) {
            alert("Please Register Yourself")
        } else {

            const getData = await axios.get(`http://localhost:4000/expense/${userId}`, { headers: { authentication: `Bearer ${token}` } });

            setRespData(getData.data);

        }
       }

        setCategory('');
            setDescription('');
            setAmount('');

       }
    

    const handleEdit = async(resp) => {
            setIsEdit(true);
            setCategory(resp.category);
            setDescription(resp.description);
            setAmount(resp.amount);
            setID(resp.id)

    };

    const handleDelete = async (id) => {
       
        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("userId"), { headers: { authentication: `Bearer ${token}` } });

        const delItem = await axios.delete(`http://localhost:4000/expense/${userId}/${id}`, { headers: { authentication: `Bearer ${token}` } });
        if (delItem.data.message) {
            alert("Please Regester Youself");
        } else {
            const getData = await axios.get(`http://localhost:4000/expense/${userId}`, { headers: { authentication: `Bearer ${token}` } });

            setRespData(getData.data);
            
        }


    };

    // change date format
const format=(date)=>{
   
const dateObject = new Date(date);

const day = dateObject.getDate().toString().padStart(2, '0');
const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
const year = dateObject.getFullYear().toString(); // Get the last 2 digits of the year

const formattedDate = `${day}-${month}-${year}`;
return formattedDate
}


    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("userId"));
        const fetch = async () => {
            const getData = await axios.get(`http://localhost:4000/expense/${userId}`, { headers: { authentication: `Bearer ${token}` } });
            if (getData.data.message) {
                alert("Please Regester Youself")
            }
            else {
                setRespData(getData.data);
            }
        }
        fetch();
    }, [])


    return (
        <>

        <NavBar/>
        <br/>
            <form onSubmit={handleSubmit} >

                <Grid container component={Paper} alignItems="center" style={{ paddingLeft: "60px", paddingTop: "15px", paddingBottom: "3px", border: "2px solid #22A699", borderRadius: "7px", backgroundColor: "#ECF8F9" }} >
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                select
                                label="Select Category"
                                variant="outlined"
                                value={category}
                                onChange={handleCategoryChange}
                                style={{ maxWidth: '200px', marginTop: "5px", marginBottom: "15px" }}
                                size='small'
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={description}
                            style={{ maxWidth: '200px', marginTop: "5px", marginBottom: "15px" }}
                            onChange={(e) => setDescription(e.target.value)}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} style={{ paddingRight: "30px" }}>
                        <TextField
                            fullWidth
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
                            style={{ maxWidth: '200px', marginTop: "5px", marginBottom: "15px" }}
                            onChange={(e) => setAmount(e.target.value)}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} style={{ paddingLeft: "20px" }}>
                        <Button variant="contained" color="success" type="submit" size='large' style={{ maxWidth: '200px', marginTop: "5px", marginBottom: "10px" }}>
                            Add Expensis
                        </Button>
                    </Grid>
                </Grid>

            </form>

            <br /><br />
            <TableContainer component={Paper} style={{ borderRadius: "10px" }} >
                <Table>
                    <TableHead style={{ border: "2px solid #22A699", backgroundColor: "#22A699" }}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ border: "2px solid #22A699", backgroundColor: "#ECF8F9" }}>
                        {
                            respData.map((row, index) => {
                                const Date=format(row.createdAt);
                                return (
                                    <>
                                    
                                        <TableRow key={index}>
                                            <TableCell>{Date}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>Rs {row.amount}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEdit(row)}
                                                    size='small'
                                                    style={{ marginRight: "15px", marginBottom: "7px", marginTop: "5px" }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(row.id)}
                                                    size='small'
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
};

export default Home;
