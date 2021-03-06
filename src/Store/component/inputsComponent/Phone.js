import {FcPhoneAndroid} from "react-icons/fc"
import {Form,InputGroup} from "react-bootstrap"
import validation from "../../function/validation"


function Phone(props){
return <>
    <div>
     <InputGroup hasValidation>
        <InputGroup.Text className="input-icon-background"><FcPhoneAndroid className="input-icon"/></InputGroup.Text>
        <Form.Control 
        type="text" 
        name="phone"
        defaultValue={props.phone}
        placeholder="פלאפון"
        isInvalid = {props.inputs["phone"].inValid}
        onBlur={(e)=>{props.setInputs(validation(e.target,props.inputs))}}/>
         {props.inputs["phone"].errors.map((value,index)=>
        {return <Form.Control.Feedback key={index} type="invalid"> {value} </Form.Control.Feedback>})}
    </InputGroup>
    </div>
</>
}

export default Phone