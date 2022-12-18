import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Card, CardContent, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../components/dashboard-layout';

const RegisterAdmin = ()=> {

  const [data, setData] = useState([{}])

  const [id, setId] = useState('')
  // const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    fetch("http://localhost:5000/admin").then(
        res => res.json()
    ).then(
        data => {
          setData(data)
        }
    )
  }, [])

  // const getData = async () => {
  //   const res = await fetch("http://localhost:5000/admin");
  //   const data = await res.json();
  //   setData(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:5000/admin", {
      method: "POST",    
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        username
      })
    })

    alert("Usuário administrador do sistema criado com sucesso!")
    const data = await res.json();

    window.location.href = '/adminLogin'

    // Limpando campos 
    setEmail("")
    setPassword("")
    setUsername("")
  }

  return (
    <>
      <Head>
        <title>Cadastro de admins | Verzel Cars</title>
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

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Crie uma conta admin
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Insira as informações para cadastrar um administrador do sistema.
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  label="E-mail"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Senha"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Nome de usuário"
                  margin="normal"
                  name="username"
                  type="text"
                  variant="outlined"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Registrar
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

RegisterAdmin.getLayout = (RegisterAdmin) => (
  <DashboardLayout>
    {RegisterAdmin}
  </DashboardLayout>
);

export default RegisterAdmin;