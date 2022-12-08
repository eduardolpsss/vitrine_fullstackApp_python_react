import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Card, CardContent } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { CarCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';

function Page(props) {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/cars").then(
        res => res.json()
    ).then(
        data => {
            setData(data)
            console.log(data)
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
                <ProductListToolbar />

                <Box sx={{ pt: 3 }}>
                    <Grid
                        container
                        spacing={3}
                    >
                        {(typeof data === 'undefined')? (
                            <p>Loading...</p>
                        ): (
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