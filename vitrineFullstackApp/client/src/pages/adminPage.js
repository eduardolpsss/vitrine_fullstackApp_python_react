import React, { useState, useEffect } from 'react';
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
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../components/dashboard-layout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Condition from 'yup/lib/Condition';

export const RegisterCars = () => {
  
  const [data, setData] = useState([{}])

  const [res_data, setResData] = useState([{}])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [id, setId] = useState('')
  // const [selectedFile, setSelectedFile] = useState(null);
  const [media, setMedia] = useState('')
  const [title, setTitle] = useState('')
  const [brand, setBrand] = useState('')
  const [year, setYear] = useState('')
  const [kilometre, setKilometre] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [editing, SetEditing] = useState(false)

  // const handleFileSelect = (event) => {
  //   console.log(event.target.files, "$$$$");
  //   console.log(event.target.files[0], "$$$$");
  //   let media = event.target.files[0]
  //   this.setState({media: media})
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()

   if (!editing) {
     const res = await fetch("http://localhost:5000/cars", {
       method: "POST",    
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         media,
         title,
         brand,
         year,
         kilometre,
         city,
         price
       })
     }) 
     alert("Anúncio criado com sucesso!")
     const data = await res.json();
     // console.log(data)
   } else {
      const res = await fetch(`http://localhost:5000/car/${id}`, {
       method: "PUT",    
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         media,
         title,
         brand,
         year,
         kilometre,
         city,
         price
       })
      })
      alert("Anúncio editado com sucesso!")
      const data = await res.json();
      // console.log(data)
   }

    await getData();
    
    // Limpando campos 
    setMedia("")
    setTitle("")
    setBrand("")
    setYear("")
    setKilometre("")
    setCity("")
    setPrice("")
  }

  useEffect(() => {
    if (Condition) {
      fetch("http://localhost:5000/cars").then(
        res => res.json()
      ).then(
        data => {
            setData(data)
        }
      )
    } else {
      alert("Apenas administradores do sistema autenticados podem ter acesso a essa página.")
      window.location.href = '/adminLogin'
    }
  }, [])

  const getData = async () => {
    const res = await fetch("http://localhost:5000/cars");
    const data = await res.json();
    setData(data);
  };

  const editCar = async (id) => {
    alert("Você pode editar o anúncio pelos campos do formulário.")
    const res = await fetch(`http://localhost:5000/car/${id}`)
    const data = await res.json();

    SetEditing(true)
    setId(id)
    
    setMedia(data.media)
    setTitle(data.title)
    setBrand(data.brand)
    setYear(data.year)
    setKilometre(data.kilometre)
    setCity(data.city)
    setPrice(data.price)
  }

  const deleteCar = async (title, id) => {
    const userResponse = window.confirm(`Tem certeza que deseja excluir o anúncio ${title}?`);
    if (userResponse) {
      const res = await fetch(`http://localhost:5000/car/${id}`, {
        method: "DELETE"
      })
      const data = await res.json();
      // console.log(data)
      alert("Anúncio deletado com sucesso!")
      await getData();
    }
  }


  return (
    <>
      <Head>
        <title>
          Página do administrador | Verzel Cars
        </title>
      </Head>
      
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          mt: 5,
          mb: 3
          // minHeight: '100%'
        }}
      >
        <Container maxWidth="false">

        <NextLink
          href="/adminLogin"
          passHref
        >
          <Button
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
          >
            Voltar
          </Button>
        </NextLink>

        <Box sx={{ m: 1 }}>
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

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>

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

                  {/* Marca do veículo (brand) */}
                  <TextField
                    fullWidth
                    label="Marca do veículo"
                    margin="normal"
                    name="brand"
                    onChange={e => setBrand(e.target.value)}
                    value={brand}
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
                    variant="outlined"                  
                  >
                    Cadastrar veículo
                  </Button>
                </Box>

              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
      
      {/* Gerenciador de anúncios */}
      <Box
            component="main"
            sx={{
                flexGrow: 1,
                mt: 5,
                mb: 8
            }}
        >
            <Container maxWidth={false}>

                <Box sx={{ m: 1 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Gerenciar anúncios ativos
                  </Typography>

                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Edite ou delete anúncios ativos no banco de dados.
                  </Typography>
                </Box>

                <Box sx={{ pt: 3 }}>
                  <Grid
                    container
                  >
                    <TableContainer component={Paper} sx={{mt: 3}}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            {/* <TableCell align="center">ID</TableCell> */}
                            <TableCell align="center">Titútlo anúncio</TableCell>
                            <TableCell align="center">Marca</TableCell>
                            <TableCell align="center">Ano</TableCell>
                            <TableCell align="center">Kilometragem</TableCell>
                            <TableCell align="center">Localização</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center" colSpan={2}>Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        
                        <TableBody>
                          {data.map((car) => (
                            <TableRow
                              key={data._id} 
                            >
                              {/* <TableCell>{car._id}</TableCell> */}
                              <TableCell>{car.title}</TableCell>
                              <TableCell align="center">{car.brand}</TableCell>
                              <TableCell align="center">{car.year}</TableCell>
                              <TableCell align="center">{car.kilometre}</TableCell>
                              <TableCell align="center">{car.city}</TableCell>
                              <TableCell align="center">{car.price}</TableCell>
                              <TableCell align="center">
                                <Button color="success" variant="outlined" endIcon={<EditIcon/>} onClick={(e) => editCar(car._id)}>
                                  Editar
                                </Button>
                              </TableCell>
                              <TableCell align="center">
                                <Button color="error" variant="outlined" endIcon={<DeleteIcon />} onClick={(e) => deleteCar(car.title, car._id)}>
                                  Deletar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Box>
            </Container>
        </Box>
    </>
  );
};

RegisterCars.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default RegisterCars;
