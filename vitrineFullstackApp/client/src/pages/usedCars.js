import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { CarListToolbar } from '../components/product/car-list-toolbar';
import { CarCard } from '../components/product/car-card';
import { DashboardLayout } from '../components/dashboard-layout';

function Page(props) {

  const [data, setData] = useState([{}])

  useEffect(() => {
     fetch("http://localhost:5000/cars").then(
        res => res.json()
     ).then(
        data => {
            setData(data)
        }
     )
  }, [])  

  return (
    <div>
        <Head>
            <title>
                Carros usados | Verzel Cars
            </title>
        </Head>

        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <CarListToolbar />

                <Box sx={{ pt: 3 }}>
                    <Grid
                        container
                        spacing={3}
                    >
                        {(typeof data === 'undefined')? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <CircularProgress fullwidth></CircularProgress>
                            </Box>
                        ):(                            
                            data.map((car, i) =>(
                            <Grid
                                item
                                key={car._id}
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <CarCard car={car} />
                            </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </Container>
        </Box>
    </div>
  );
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;