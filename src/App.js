import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import Detail from './routes/Detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import Cart from './routes/Cart.js'

function App() {

  let [shoes, setShoes] = useState(data);
  let [btnCnt, setBtnCnt] = useState(0);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/Cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>



      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세</Link> */}

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <Container>
              <Row>
                {/* <Col>
          <img src={process.env.PUBLIC_URL + '/shoes1.jpg'} width='80%'/>
          <h4>{shoes[0].title}</h4>
          <p>{shoes[0].price}</p>
        </Col>
        <Col>
          <img src={process.env.PUBLIC_URL + '/shoes2.jpg'} width='80%'/>
          <h4>{shoes[1].title}</h4>
          <p>{shoes[1].price}</p>
        </Col>
        <Col>
          <img src={process.env.PUBLIC_URL + '/shoes3.jpg'} width='80%'/>
          <h4>{shoes[2].title}</h4>
          <p>{shoes[2].price}</p>
        </Col> */}

                {
                  shoes.map(function (a, i) {
                    return (
                      <Col key={shoes[i].id}>
                        <Modal shoes={shoes} i={i} />
                      </Col>
                    );
                  })
                }



              </Row>
            </Container>
            <button onClick={() => {
              if (btnCnt == 0) {
                axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
                  console.log(결과.data);
                  console.log(btnCnt);
                  let copy = [...shoes, ...결과.data];
                  setShoes(copy);
                  setBtnCnt(btnCnt + 1);
                })
                  .catch(() => {
                    console.log('실패함')
                  })
              } else if (btnCnt == 1) {
                axios.get('https://codingapple1.github.io/shop/data3.json').then((결과) => {
                  console.log(결과.data);
                  let copy = [...shoes, ...결과.data];
                  setShoes(copy);
                  setBtnCnt(btnCnt + 1);
                })
                  .catch(() => {
                    console.log('실패함')
                  })
              } else {
                alert('더없음');
              }

            }}>더보기</button>
          </>
        } />
        <Route path='/detail/:id' element={
          <Detail shoes={shoes} />
        } />

        <Route path='/cart' element={
          <Cart />
        } />

        {/* <Route path='/about' element={<About />}>
          <Route path='member' element={<div>멤버</div>} />
          <Route path='location' element={<div>위치</div>} />
        </Route>

        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route> */}

      </Routes>



    </div>
  );
}

function About(props) {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event(props) {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Modal(props) {
  return (
    <Col>
      <img src={process.env.PUBLIC_URL + '/shoes' + (props.i + 1) + '.jpg'} width='80%' />
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}</p>
    </Col>
  );
}

export default App;
