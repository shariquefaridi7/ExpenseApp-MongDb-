import { Button, Container,TextField, Paper,Stack, Typography ,TableContainer,Table,TableBody,TableCell,TableHead,TableRow} from '@mui/material'
import {useState}from 'react';
import NavBar from './NavBar';

import axios from "axios";




const Report = () => {

    const [date,setDate]=useState('');
    const [dayData,setdayData]=useState([]);
    const [monthData,setMonthData]=useState([]);

  const  handleReportByMonth =async()=>{
console.log(date);
const token = localStorage.getItem("token");
const userId = JSON.parse(localStorage.getItem("userId")); 

     const resp=await axios.get(`https://expensebackend-xksx.onrender.com/expense/monthlyExpense/${userId}/${date}`,{ headers: { authentication: `Bearer ${token}` } });
     setMonthData(resp.data);
  
  }


 const handleReport=async()=>{
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("userId")); 
    
      const resp=await axios.get(`https://expensebackend-xksx.onrender.com/expense/dayExpense/${userId}/${date}`,{ headers: { authentication: `Bearer ${token}` } });
     setdayData(resp.data);

 }
let daytotalAmount=0;
 const sum=(amount)=>{
    daytotalAmount +=(amount);

 }

 let monthtotalAmount=0;
 const sum1=(amount)=>{
    monthtotalAmount +=(amount);

 }


  return (
    <>
    <NavBar/>
     <Container component="main" maxWidth="lg"  sx={{ mt:4}}  >
    <Paper elevation={6}  style={{ border: "2px solid #22A699", backgroundColor: "#ECF8F9" ,borderRadius:"7px"}}  sx={{p:4}}>
     <Stack    direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 4, sm: 2, md: 4 }}>
      <Stack direction={{ xs: 'column'}}   spacing={{ xs: 3 }}>
        <Typography variant='h5'  >DAILY REPORTS</Typography>
        <Typography>Set Date</Typography>
      <TextField type='date' onChange={(e)=>setDate(e.target.value)}/>
         <Button variant='contained' sx={{ mt: 2, width: '40px', height: '40px' }} onClick={handleReport}>Show</Button>
      </Stack>

    
         <TableContainer >
         <Table >
           <TableHead>
             <TableRow>
             <TableCell >Date</TableCell>
               <TableCell>Category</TableCell>
               <TableCell >Description</TableCell>
               <TableCell >Amount</TableCell>
              
             
             </TableRow>
           </TableHead>
           <TableBody>
             {dayData.map((row) => {
                sum(row.amount);
                return(
                    <>
               <TableRow
                 key={row.id}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                 <TableCell component="th" scope="row">
                   {row.date}
                 </TableCell>
                 <TableCell >{row.category}</TableCell>
                 <TableCell >{row.description}</TableCell>
                 <TableCell >{row.amount}</TableCell>
               </TableRow>
    </>  
                )       
})}
               <TableRow >
               <TableCell >{"     "}</TableCell>
               <TableCell >{"     "}</TableCell>
               <TableCell >{"     "}</TableCell>
            <TableCell >{`Total : ${daytotalAmount}`}</TableCell>
                  </TableRow> 
           </TableBody>
         </Table>
       </TableContainer>
    
     
     </Stack>
    </Paper>
   </Container>


     {/*  Second Container */}

     <Container component="main" maxWidth="lg"  sx={{ mt:7}}>
    <Paper elevation={6}   style={{ border: "2px solid #22A699", backgroundColor: "#ECF8F9" ,borderRadius:"7px"}}  sx={{p:4}}>
     <Stack    direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 4, sm: 2, md: 4 }}>
      <Stack direction={{ xs: 'column'}}   spacing={{ xs: 3 }}>
        <Typography variant='h5'  >MONTHLY REPORTS</Typography>
        <Typography>Set Date</Typography>
      <TextField type='month' onChange={(e)=>setDate(e.target.value)}/>
        <Button variant='contained' sx={{ mt: 2, width: '40px', height: '40px' }} onClick={handleReportByMonth}>Show</Button>
      </Stack>

    <TableContainer >
      <Table >
        <TableHead>
          <TableRow>
          <TableCell >Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Amount</TableCell>
           
          
          </TableRow>
        </TableHead>
        <TableBody>
          {monthData.map((row) => {
              sum1(row.amount)
            return(<>
           
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell >{row.category}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >{row.amount}</TableCell>
            </TableRow>
            </>
          )
          })}
            <TableRow >
            <TableCell >{"     "}</TableCell>
            <TableCell >{"     "}</TableCell>
            <TableCell >{"     "}</TableCell>
            <TableCell >{`Total : ${monthtotalAmount} `}</TableCell>
               </TableRow> 
        </TableBody>
      </Table>
    </TableContainer>
     
     </Stack>
    </Paper>
   </Container>
    </>
  
  )
}

export default Report