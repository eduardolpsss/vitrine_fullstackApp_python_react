import React, {useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => {

  const [media, setMedia] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [kilometre, setKilometre] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')

  const formik = useFormik({
    initialValues: {
      kilometre: '',
      title: '',
      year: '',
      city: '',
      price: ''
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .max(255)
        .required('É necessário informar um título para o anúncio.'),
        year: Yup
          .string()
          .max(255)
          .required('É necessário informar o ano do veículo.'),
      kilometre: Yup
        .string()
        .max(255)
        .required('É necessário informar a kilometragem do veículo.'),
      city: Yup
        .string()
        .max(255)
        .required('É necessário informar o local onde o veículo se encontra.'),
      price: Yup
        .string()
        .max(255)
        .required('É necessário informar o preço do veículo.')
    })
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:5000/cars", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        media,
        title,
        year,
        kilometre,
        city,
        price
      })
    })

    alert("Anúncio criado com sucesso!")
    
    const data = await res.json();
    console.log(data)

    window.location.reload(true);
  }

  return (
    <>
      <Head>
        <title>
          Cadastro de carros usados | Verzel Cars
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/adminPage"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Voltar
            </Button>
          </NextLink>
          
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <Box sx={{ my: 3 }}>
                    <Typography
                      color="textPrimary"
                      variant="h4"
                    >
                      Cadastro de carros usados
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Insira as informações para cadastrar um veículo.
                    </Typography>
                  </Box>

                  {/* Media anúncio (media) */}
                  <TextField
                    error={Boolean(formik.touched.title && formik.errors.media)}
                    fullWidth
                    helperText={formik.touched.title && formik.errors.media}
                    onBlur={formik.handleBlur}
                    label="URL de mídia"
                    margin="normal"
                    name="media"
                    onChange={e => setMedia(e.target.value)}
                    value={media}
                    variant="outlined"
                    className='form-control'
                  />                  

                  {/* Título do anúncio (title) */}
                  <TextField
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    fullWidth
                    helperText={formik.touched.title && formik.errors.title}
                    onBlur={formik.handleBlur}
                    label="Título do anúncio"
                    margin="normal"
                    name="title"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    variant="outlined"
                    className='form-control'
                  />

                  {/* Ano do veículo (year) */}
                  <TextField
                    error={Boolean(formik.touched.year && formik.errors.year)}
                    fullWidth
                    helperText={formik.touched.year && formik.errors.year}
                    onBlur={formik.handleBlur}
                    label="Ano do veículo"
                    margin="normal"
                    name="year"
                    onChange={e => setYear(e.target.value)}
                    value={year}
                    variant="outlined"
                    className='form-control'
                  />

                  {/* Kilometragem do veículo (kilometre) */}
                  <TextField
                    error={Boolean(formik.touched.kilometre && formik.errors.kilometre)}
                    fullWidth
                    helperText={formik.touched.kilometre && formik.errors.kilometre}
                    onBlur={formik.handleBlur}
                    label="Kilometragem do veículo"
                    margin="normal"
                    name="kilometre"
                    onChange={e => setKilometre(e.target.value)}
                    value={kilometre}
                    variant="outlined"
                    className='form-control'
                  />

                  {/* Cidade do veículo (city) */}
                  <TextField
                    error={Boolean(formik.touched.city && formik.errors.city)}
                    fullWidth
                    helperText={formik.touched.city && formik.errors.city}
                    onBlur={formik.handleBlur}
                    label="Cidade aonde o veículo se encontra"
                    margin="normal"
                    name="city"
                    onChange={e => setCity(e.target.value)}
                    value={city}
                    variant="outlined"
                    className='form-control'
                  />

                  {/* Preço do veículo (price) */}
                  <TextField
                    error={Boolean(formik.touched.price && formik.errors.price)}
                    fullWidth
                    helperText={formik.touched.price && formik.errors.price}
                    onBlur={formik.handleBlur}
                    label="Preço do veículo"
                    margin="normal"
                    name="price"
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                    variant="outlined"
                    className='form-control'
                  />
                </div>

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Cadastrar veículo
                  </Button>
                </Box>

              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
