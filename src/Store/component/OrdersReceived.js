import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import {Container, Form, Col, Row, Button} from "react-bootstrap"
import "../css/index.css"
import {getAllOrders, searchOrdersby} from "../Dal/api"
import OrdersTable from "./orderRecivedComponent/OrdersTable"


function OrderReceived(){

    const history = useHistory()

    const [orders, setOrders] = useState([])
    const [showSearchby, setShowSearchby] = useState(true)
    const [searchby, setSearchby] = useState("1")
    const [searchValue, setSearchValue] = useState("0")
    const [validation, setValidation] = useState("")

    const patternNumber = /[0-9]$/
    const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 

    useEffect(()=>{
        if(localStorage.getItem("user")){
            if(!JSON.parse(localStorage.getItem("user")).admin){
                history.push("/")
            }
        }  else{
            history.push("/")
        }
        getOrders()
    },[])


    async function getOrders(){
        try{
            const allOrders = await getAllOrders()
            setOrders(allOrders)
        }
        catch(error){
            setOrders([])
        }
    }

    async function searchOrders(){
        if(searchValue!=="0" && validationInputSearch(searchValue)){
            const searchOrdersBy = await searchOrdersby(searchby, searchValue)
            setOrders(searchOrdersBy)
        }
    }


    function changeSearch(value){
        setSearchby(value)
        setValidation("")

        if(value === "1"){
            setShowSearchby(true)
            setSearchValue("0")
            getOrders()
        } else {
            if(searchValue === "0" || searchValue === "1" || searchValue === "2" || searchValue === "3" || searchValue === "4"){
                setSearchValue("")
            }
            setShowSearchby(false)
        }
    }


    function changeStatus(value){
        if(value==="0"){
            getOrders()
        }
        setSearchValue(value)
    }
    

    function insertValueSearch(value){
        setSearchValue(value)
        validationInputSearch(value)
    }


    function validationInputSearch(value){
        let isValid = true

        if(searchby==="2"){

            if(!patternNumber.test(value) && value){
                setValidation("?????? ???? ???????? ????????")
                isValid = false
            
            } else if(!value){
                setValidation("???????? - ???????? ??????????")
                isValid = false

            } else{
                setValidation("")
            }

        } else if(searchby==="3"){

            if(!patternEmail.test(value) && value){
                setValidation("???????? ???????????????? - ???? ????????")
                isValid = false

            } else if(!value){
                setValidation("???????? - ???????? ??????????????????")
                isValid = false

            } else{
                setValidation("")
            }
        }
        return isValid
    }


    return <>
        <Container className="mt-2 mb-5">
            <h1>???????????? ??????????????</h1>
           
            <Row className="justify-content-center align-items-center mt-3">
                <Col xs={11} md={6} lg={4}>
                    <Form.Group as={Col} controlId="formGridState" className="input">
                    <Form.Label>?????????? ?????? ...</Form.Label>
                    <Form.Control as="select" defaultValue="????????????" onChange={(e)=>changeSearch(e.target.value)}>
                        <option value="1">????????????</option>
                        <option value="2">???????? ??????????</option>
                        <option value="3">????????????</option>
                    </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={11} md={6} lg={4}>
                    {showSearchby&&<Form.Group as={Col} controlId="formGridState" className="input">
                    <Form.Label>???????????? ??????????</Form.Label>
                    <Form.Control as="select" defaultValue="??????????" onChange={(e)=>changeStatus(e.target.value)}>
                        <option value="0">???? ??????????????</option>
                        <option value="1">??????????</option>
                        <option value="2">??????????</option>
                        <option value="3">????????</option>
                        <option value="4">????????</option>
                    </Form.Control>
                    </Form.Group>}

                    {!showSearchby&&<Form.Group as={Col} controlId="formGridCity" className="input">
                        <Form.Label>??????</Form.Label>
                        <Form.Control onBlur={(e)=>{insertValueSearch(e.target.value)}}/>
                        <small className="text-danger">{validation}</small>
                    </Form.Group>}
                </Col>
            </Row>
            <Row className="justify-content-center mb-4" onClick={()=>searchOrders()}>
                    <Button variant="dark" className="col-4 col-md-3 col-lg-2">??????</Button>
            </Row>

            {(orders.length===0)&&
            <div className="order-summary text-center mt-5">
            <h3>???? ???????????? ????????????</h3>
            </div>}
            

            {orders.map(order =>
            <OrdersTable order = {order}/>
            )}
        </Container>
    </>
}

export default OrderReceived