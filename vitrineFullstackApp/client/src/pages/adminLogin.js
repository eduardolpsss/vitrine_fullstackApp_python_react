import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Card, CardContent, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../components/dashboard-layout';

const Login = ()=> {

  const [res_data, setData] = useState([{}])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const token = ''
  const role = ''

  useEffect(() => {
    fetch("http://127.0.0.1:5000/login").then(
        res => res.json()
    ).then(
        res_data => {
          setData(res_data)
        }
    )
  }, [])

  const handleSubmit = async (e, token, role) => {
    e.preventDefault()

    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",    
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email,
        password
    })
  })

  const res_data = await res.json();

  if (res_data.code == "200") {
    alert(res_data.message + `\n\nToken JWT: ${res_data.data.token}`)
    window.location.href = '/adminPage'
  }else {
      alert(res_data.message)
      
      // Limpando campos 
      setEmail("")
      setPassword("")
    }

    return token, role
  }

  return (
    <>
      <Head>
        <title>Admin login | Verzel Cars</title>
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
            href="/"
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
                    Logar como admin
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Insira as informações para logar como administrador do sistema. Caso não possua uma conta admin ainda, você pode se cadastrar clicando {" "} 
                    <NextLink
                      href="/registerAdmin"
                      passHref
                    >
                      <a style={{textDecoration: "none"}}>aqui</a>
                    </NextLink>.
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

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
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

Login.getLayout = (Login) => (
  <DashboardLayout>
    {Login}
  </DashboardLayout>
);

export default Login;