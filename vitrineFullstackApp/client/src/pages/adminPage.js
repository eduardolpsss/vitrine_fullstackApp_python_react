import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';



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
     alert("An??ncio criado com sucesso!")
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
      alert("An??ncio editado com sucesso!")
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
    fetch("http://localhost:5000/cars").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  const getData = async () => {
    const res = await fetch("http://localhost:5000/cars");
    const data = await res.json();
    setData(data);
  };

  const editCar = async (id) => {
    alert("Voc?? pode editar o an??ncio pelos campos do formul??rio.")
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
    const userResponse = window.confirm(`Tem certeza que deseja excluir o an??ncio ${title}?`);
    if (userResponse) {
      const res = await fetch(`http://localhost:5000/car/${id}`, {
        method: "DELETE"
      })
      const data = await res.json();
      // console.log(data)
      alert("An??ncio deletado com sucesso!")
      await getData();
    }
  }


  return (
    <>
      <Head>
        <title>
          P??gina do administrador | Verzel Cars
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
        </Container>
      </Box>

      {/* Gerenciador de an??ncios */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 5,
          mb: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
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
                  Insira as informa????es para cadastrar um an??ncio de um ve??culo.
                </Typography>
              </Box>

              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                      {/* Box logo do an??ncio */}
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
                        Adicionar imagem para o an??ncio
                        <input hidden accept="image/*" multiple type="file" name="media" onChange={handleFileSelect}/>
                      </Button>
                    </Box> */}

                    {/* URL imagem do an??ncio (media) */}
                    <TextField
                      fullWidth
                      label="URL imagem do an??ncio"
                      margin="normal"
                      name="media"
                      onChange={e => setMedia(e.target.value)}
                      value={media}
                      variant="outlined"
                      className='form-control'
                    />

                    {/* T??tulo do an??ncio (title) */}
                    <TextField
                      fullWidth
                      label="T??tulo do an??ncio"
                      margin="normal"
                      name="title"
                      onChange={e => setTitle(e.target.value)}
                      value={title}
                      variant="outlined"
                      className='form-control'
                    />

                    {/* Marca do ve??culo (brand) */}
                    <TextField
                      fullWidth
                      label="Marca do ve??culo"
                      margin="normal"
                      name="brand"
                      onChange={e => setBrand(e.target.value)}
                      value={brand}
                      variant="outlined"
                      className='form-control'
                    />

                    {/* Ano do ve??culo (year) */}
                    <TextField
                      fullWidth
                      label="Ano do ve??culo"
                      margin="normal"
                      name="year"
                      onChange={e => setYear(e.target.value)}
                      value={year}
                      variant="outlined"
                      className='form-control'
                    />

                    {/* Kilometragem do ve??culo (kilometre) */}
                    <TextField
                      fullWidth
                      label="Kilometragem do ve??culo"
                      margin="normal"
                      name="kilometre"
                      onChange={e => setKilometre(e.target.value)}
                      value={kilometre}
                      variant="outlined"
                      className='form-control'
                    />
                      
                    {/* Cidade do ve??culo (city) */}
                    <TextField
                      fullWidth
                      label="Cidade aonde o ve??culo se encontra"
                      margin="normal"
                      name="city"
                      onChange={e => setCity(e.target.value)}
                      value={city}
                      variant="outlined"
                      className='form-control'
                    />

                    {/* Pre??o do ve??culo (price) */}
                    <TextField
                      fullWidth
                      label="Pre??o do ve??culo"
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
                      Cadastrar ve??culo
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
                
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Box sx={{ m: 1 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Gerenciar an??ncios ativos
              </Typography>

              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Edite ou delete an??ncios de ve??culos ativos no banco de dados.
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
                        <TableCell align="center">Tit??tlo an??ncio</TableCell>
                        <TableCell align="center">Marca</TableCell>
                        <TableCell align="center">Ano</TableCell>
                        <TableCell align="center">Kilometragem</TableCell>
                        <TableCell align="center">Localiza????o</TableCell>
                        <TableCell align="center">Pre??o</TableCell>
                        <TableCell align="center" colSpan={2}>Op????es</TableCell>
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
          </Grid>
        </Grid>
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
