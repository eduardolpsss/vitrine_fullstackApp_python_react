import React from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import { Box, Container, Grid, Button, Typography } from '@mui/material';
import { LatestProducts } from '../components/dashboard/latest-products';
import { About } from '../components/dashboard/about';
import { DashboardLayout } from '../components/dashboard-layout';
import NextLink from 'next/link'

const Page = () => (
  <>
    <Head>
      <title>
        Administrador | Verzel Cars
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
      
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Administrador
        </Typography>
      </Box>

      <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3
          }}
        >
          <NextLink
            href="/registerCars"
            passHref
          >
            <Button
                // disabled
                color="primary"
                variant="contained"
                sx={{ mr: 1 }}
            >
                Adicionar anúncios
            </Button>
          </NextLink>

          <NextLink
            href="/listOfAds"
            passHref
          >
            <Button
                // disabled
                color="primary"
                variant="contained"
                sx={{ ml: 1 }}
            >
                Gerenciar anúncios
            </Button>
          </NextLink>
        </Box>
{/* 
        <br/>
        <hr/> */}
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
