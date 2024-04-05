import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


function App() {

  const[jsonResult,setJsonResult] = useState([])
  const[bookId,SetBookId]= useState()
  const[oneBookJSON,SetOneBookJSON]= useState()
  const[newBook,SetnewBook] = useState({title:"", author:""})

  async function GetBooks()
  {
    try{
    let rest = await axios.get("https://apibooks-server-5.onrender.com/api/books/")
        console.log(rest.data)
        setJsonResult(rest.data)
        SetOneBookJSON()
        SetBookId("")
        
      }
      catch(error){
          console.log(error)
      }
  }

  async function GetOneBook()
  {

    console.log("https://apibooks-server-5.onrender.com/api/books/"+ bookId)
    try
    {
        let rest = await axios.get("https://apibooks-server-5.onrender.com/api/books/"+ bookId)
        console.log(rest.data)
        SetOneBookJSON(rest.data)
    }
    catch(error)
    {
        SetOneBookJSON("no se encontro un objeto con ese id")
    }
        
  }

  async function AddBook()
  {
      try
        {
            console.log(newBook)
            await axios.post("https://apibooks-server-5.onrender.com/api/books/",newBook)
            SetnewBook({title:"",author:""})

        }
      catch(error)
        {

        }

  }

  async function Deletebook(){
    try
    {
        await axios.delete("https://apibooks-server-5.onrender.com/api/books/"+ bookId)
        SetBookId("")

    }
    catch(error){
        console.log(error)
    }
  }


  


  return (
    <div className="App">
      <h1>API REST</h1>
      
      <div className='mx-5'>
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={GetBooks}>
        <span class="badge text-bg-success p-3 me-2">GET</span><h1>/api/books/</h1>
        </Accordion.Header>
        <Accordion.Body style={{overflow:"overlay"}}>
        {jsonResult.map((libro)=>{
              return(<div>{JSON.stringify(libro)}</div>)
          })}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
        <span class="badge text-bg-success p-3 me-2">GET</span><h1>/api/books/:id</h1>
        </Accordion.Header>
        <Accordion.Body style={{overflow:"overlay"}}>
        <InputGroup className="mb-3">
        <Form.Control value={bookId} onChange={e=> SetBookId(e.target.value)}
          placeholder="Ingrese id"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" > <button onClick={GetOneBook}>GET BOOK</button></InputGroup.Text>
      </InputGroup>
            <div>{JSON.stringify(oneBookJSON)}</div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header><span class="badge text-bg-primary p-3 me-2">POST</span><h1>/api/books/</h1></Accordion.Header>
        <Accordion.Body style={{overflow:"overlay"}}>
        <InputGroup className="mb-3">
        <Form.Control value={newBook.title} onChange={e=> SetnewBook({...newBook,title: e.target.value})}
          placeholder="Ingrese titulo"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />

        <Form.Control value={newBook.author} onChange={e=> SetnewBook({...newBook,author: e.target.value})}
          placeholder="Ingrese autor"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" > <button onClick={AddBook}>POST BOOK</button></InputGroup.Text>
      </InputGroup>
          {JSON.stringify(newBook)}
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>
        <span class="badge text-bg-danger p-3 me-2">DELETE</span><h1>/api/books/:id</h1>
        </Accordion.Header>
        <Accordion.Body style={{overflow:"overlay"}}>
        <InputGroup className="mb-3">
        <Form.Control value={bookId} onChange={e=> SetBookId(e.target.value)}
          placeholder="Ingrese id"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" > <button onClick={Deletebook}>DELETE BOOK</button></InputGroup.Text>
      </InputGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <div>
      <h1 style={{fontSize:"small"}}>Nota: Alojé la API en un servidor gratis, por lo tanto. tarda aprox 50seg en realizar la primera peticion</h1>
    </div>
    </div>
    </div>
  );
}

export default App;
