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
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';

const Page = () => {

  // const [selectedFile, setSelectedFile] = useState(null);
  const [media, setMedia] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [kilometre, setKilometre] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')

  // const handleFileSelect = (event) => {
  //   console.log(event.target.files, "$$$$");
  //   console.log(event.target.files[0], "$$$$");
    
  //   let media = event.target.files[0]
    
  //   this.setState({media: media})
  // };

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
    // router.push("/institutions");
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

                  {/* Box logo do anúncio */}
                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                  
                    <Avatar
                      src={ selectedFile ? URL.createObjectURL(selectedFile) : "https://via.placeholder.com/400.png"}

                      sx={{
                        height: 120,
                        mb: 2,
                        width: 120,
                      }}
                    />
                  </Box> */}

                  {/* Box adicionar imagem
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button variant="contained" component="label">
                      Adicionar imagem para o anúncio
                      <input hidden accept="image/*" multiple type="file" name="media" onChange={handleFileSelect}/>
                    </Button>
                  </Box> */}

                  {/* URL imagem do anúncio (media) */}
                  <TextField
                    fullWidth
                    label="URL imagem do anúncio"
                    margin="normal"
                    name="media"
                    onChange={e => setMedia(e.target.value)}
                    value={media}
                    variant="outlined"
                    className='form-control'
                  />

                  {/* Título do anúncio (title) */}
                  <TextField
                    fullWidth
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
                    fullWidth
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
                    fullWidth
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
                    fullWidth
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
                    fullWidth
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
