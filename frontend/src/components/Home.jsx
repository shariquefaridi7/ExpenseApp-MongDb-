import { useState, useEffect } from 'react';
import { Box,TextField, Button, FormControl, MenuItem, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import NavBar from './NavBar';
import axios from 'axios';
import PaginationComponent from "./pagination"


const Home = () => {


    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [respData, setRespData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setID] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const totalPages = Math.ceil(count / 10)

    useEffect(() => {
        const handlePageChange = async () => {

            const token = localStorage.getItem("token");
            const userId = JSON.parse(localStorage.getItem("userId"));

            const getData = await axios.get(`https://expensebackend-xksx.onrender.com/expense/${userId}?page=${currentPage}&limit=10`, { headers: { authentication: `Bearer ${token}` } });
            if (getData.data.message) {
                alert("Please Regester Youself")
            }
            else {
                setRespData(getData.data.resp);
                setCount(getData.data.count);
            }
        }
        handlePageChange();
    }, [currentPage])




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
        const dateObject=new Date();
       const date= format(dateObject,1);
      const month=format(dateObject,2);

        if (isEdit && id) {

            const resp = await axios.put(`https://expensebackend-xksx.onrender.com/expense/${userId}/${id}`, { category, description, amount }, { headers: { authentication: `Bearer ${token}` } });

            if (resp.data.message) {
                alert("Please Register Yourself")
            } else {

                const getData = await axios.get(`https://expensebackend-xksx.onrender.com/expense/${userId}?page=${currentPage}&limit=10`, { headers: { authentication: `Bearer ${token}` } });

                setRespData(getData.data.resp);
                setCount(getData.data.count);
                setIsEdit(false);
            }
        }
        else {
            const resp = await axios.post("https://expensebackend-xksx.onrender.com/expense/", { category, description, amount, userId ,date,month}, { headers: { authentication: `Bearer ${token}` } });

            if (resp.data.message) {
                alert("Please Register Yourself")
            } else {

                const getData = await axios.get(`https://expensebackend-xksx.onrender.com/expense/${userId}?page=${currentPage}&limit=10`, { headers: { authentication: `Bearer ${token}` } });

                setRespData(getData.data.resp);
                setCount(getData.data.count);

            }
        }

        setCategory('');
        setDescription('');
        setAmount('');

    }


    const handleEdit = async (resp) => {
        setIsEdit(true);
        setCategory(resp.category);
        setDescription(resp.description);
        setAmount(resp.amount);
        setID(resp.id)

    };

    const handleDelete = async (id) => {

        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("userId"), { headers: { authentication: `Bearer ${token}` } });

        const delItem = await axios.delete(`https://expensebackend-xksx.onrender.com/expense/${userId}/${id}`, { headers: { authentication: `Bearer ${token}` } });
        if (delItem.data.message) {
            alert("Please Regester Youself");
        } else {
            const getData = await axios.get(`https://expensebackend-xksx.onrender.com/expense/${userId}?page=${currentPage}&limit=10`, { headers: { authentication: `Bearer ${token}` } });

            setRespData(getData.data.resp);
            setCount(getData.data.count);

        }
    }



    // change date format
    const format = (date,check) => {
        if(check==1){

        const dateObject = new Date(date);

        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear().toString(); // Get the last 2 digits of the year

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
        }else{
            const dateObject = new Date(date);

    
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear().toString(); // Get the last 2 digits of the year

        const formattedDate = `${year}-${month}`;
        return formattedDate
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("userId"));
        const fetch = async () => {
            const getData = await axios.get(`https://expensebackend-xksx.onrender.com/expense/${userId}?page=${currentPage}&limit=10`, { headers: { authentication: `Bearer ${token}` } });
            if (getData.data.message) {
                alert("Please Regester Youself")
            }
            else {
                setRespData(getData.data.resp);
                setCount(getData.data.count);
            }
        }
        fetch();
    }, [])


    return (
        <>

            <NavBar />
            <br />
            <Box sx={{marginLeft:"30px",marginRight:"30px"}}>
            <form onSubmit={handleSubmit} >

                <Grid container component={Paper} alignItems="center" style={{ paddingLeft: "30px", paddingTop: "15px",paddingBottom: "3px", border: "2px solid #22A699", borderRadius: "7px", backgroundColor: "#ECF8F9" }} >
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
                              
                                return (
                                    <>

                                        <TableRow key={index}>
                                            <TableCell>{row.date}</TableCell>
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
            </Box>
            <br />
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}

                setCurrentPage={setCurrentPage}
            />
        </>

    );
};

export default Home;
