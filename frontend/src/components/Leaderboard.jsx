import { Container, Paper, Stack, Typography, Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'
import { useEffect, useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import axios from 'axios';
import NavBar from './NavBar';

const Leaderborad = () => {

    const [data, setData] = useState([]);


    const fetchData = async () => {

        // Retrieve the token from localStorage
        try {
            const token = localStorage.getItem('token');

            const headers = {
                authentication: `Bearer ${token}`,
            };

            const response = await axios.get('https://expensebackend-xksx.onrender.com/leaderboard/', {
                headers,
            });

            if (response.data && Array.isArray(response.data)) {
                // Assuming the API response is an array of objects with a "totalExpenses" property
                const sortedData = response.data.sort((a, b) => b.totalExpenses - a.totalExpenses);
                setData(sortedData);
            } else {
                console.error('Invalid API response format');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };







    useEffect(() => {
        fetchData();
    }, []);

    let count = 1;

    return (
        <>
            <NavBar />
            <Container component="main" maxWidth="lg" sx={{ mt: 3 }}>
                <Paper elevation={6} style={{ paddingLeft: "30px", paddingTop: "15px", paddingBottom: "3px", border: "2px solid #22A699", borderRadius: "7px", backgroundColor: "#ECF8F9" }} sx={{ p: 4 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 10, md: 7 }}>
                        <Box>
                            <Stack direction={{ xs: "row" }} spacing={{ xs: 2 }} >
                                <Typography variant='h4'>Leaderboard</Typography>
                                <EmojiEventsIcon style={{ height: "50px", width: "50px", color: "yellow" }} />
                            </Stack>
                        </Box>
                        <Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ px: 10 }}>
                                                <Typography>Position</Typography>
                                            </TableCell>

                                            <TableCell sx={{ px: 10 }}>
                                                <Typography>Name</Typography>
                                            </TableCell>

                                            <TableCell sx={{ px: 10 }}>
                                                <Typography>TotalExpanses</Typography>
                                            </TableCell>

                                        </TableRow>


                                    </TableHead>
                                    <TableBody>

                                        {data.map((item) => {
                                            return (
                                                <>
                                                    <TableRow>
                                                        <TableCell sx={{ px: 10 }}>{count++}</TableCell>

                                                        <TableCell sx={{ px: 10 }} >{item.username}</TableCell>



                                                        <TableCell sx={{ px: 10 }}>{item.totalExpenses}</TableCell>
                                                    </TableRow>
                                                </>
                                            )
                                        })}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                    </Stack>
                </Paper>
            </Container>
        </>
    )
}

export default Leaderborad