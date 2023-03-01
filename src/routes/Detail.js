import { type } from '@testing-library/user-event/dist/type';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Nav } from 'react-bootstrap';
import { insertCart } from '../store.js';
import { useDispatch, useSelector } from 'react-redux';

styled.button`
  background : 
`

function Detail(props) {
  let { id } = useParams();
  let prod = props.shoes.find(function (x) {
    return x.id == id
  });
  let [tab, setTab] = useState(0);

  let state = useSelector((state) => { return state })
    let dispatch = useDispatch();

  // let [input, setInput] = useState();
  // useEffect(() => {
  //   if (isNaN(input) == true) {
  //     alert('그러지마세요')
  //   }
  // }, [input])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          {/* <input onChange={(e) => { setInput(e.target.value) }} /> */}
          <h4 className="pt-5">{prod.title}</h4>
          <p>{prod.content}</p>
          <p>{prod.price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(insertCart(prod))
          }
          }>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}/>

    </div>
  );
}

function TabContent(props){
  // if (props.tab === 0){
  //   return <div>내용0</div>
  // }
  // if (props.tab === 1){
  //   return <div>내용1</div>
  // }
  // if (props.tab === 2){
  //   return <div>내용2</div>
  // }

  let [fade, setFade] = useState('')
  useEffect(()=>{
    let a = setTimeout(() => {
      setFade('end')  
    }, 100);
    return ()=>{
      clearTimeout(a);
      setFade('')
    }
  }, [props.tab])

  return (
    <div className={'start '+fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
    </div>
  )
}

export default Detail;