import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/nav';
import Footer from '../Footer/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //lógica de autenticação tem que ficar aqui galera
    console.log('Email:', email);
    console.log('Senha:', password);
    try {
      console.log('try')
      const response = await fetch(`http://localhost:3005/api/usuario/${email}/${password}`);
      console.log("response:", response)
      if (!response.ok) {
          console.log('try 2')
          throw new Error('Erro ao buscar usuário');
      }
      console.log('try 3')
      const data = await response.json();

      console.log('Usuário encontrado:', data);

      setIsSuccess(true);
      setError(null);
    } catch (error) {
        console.log('catch')
        console.error('Erro ao buscar usuário:', error.message);
        setIsSuccess(false);
        setError('Usuário e/ou Senha incorreto(s). Tente novamente.');
    }
  };

  return (
    <>
    <Navbar/>
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <div className="text-center mb-4">
            <h2 className="display-4">Bem-vindo de volta!</h2>
            <p>Por favor, faça login na sua conta.</p>
          </div>

            {isSuccess && (
              <Alert variant="success" onClose={() => setIsSuccess(false)} dismissible>
                Login realizado com sucesso
              </Alert>
            )}

            {error && (
              <Alert variant="danger" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            )}

          <Form onSubmit={handleSubmit} className="form-container">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block className="mt-4">
              Entrar
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <p>Não tem uma conta? <Link to="/register">Registre-se aqui</Link>.</p>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default Login;
