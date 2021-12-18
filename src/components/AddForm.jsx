import React, { useState } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import countries from "../data/countriesList.json";
import { addBuilding, editBuilding, show } from "../Redux/actions";
import { useDispatch } from "react-redux";
import "./styles.css";

const AddForm = ({ client, edit }) => {
  const dispatch = useDispatch()
  const [newbuilding, setnewbuilding] = useState(Object.keys(edit).length?edit:{location:countries[0].name})
  return (
    <div className="add-div-1">
      <Form >
        <h4>Add/Edit building</h4>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Building Name" defaultValue={edit.name} 
              onChange={(e)=>setnewbuilding({...newbuilding,name:e.target.value})}/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Location</Form.Label>
            <Form.Select defaultValue={edit.location} onChange={(e)=>setnewbuilding({...newbuilding,location:e.target.value})}>
              {countries.map((e) => <option>{e.name}</option>)}
            </Form.Select>
          </Form.Group>
        </Row>
        <br />
        <div className="='add-div-2" style={{ display: "flex" }}>
          <Button variant="success" type="submit" onClick={(e) => {e.preventDefault();if(Object.keys(newbuilding).length>1) 
              {Object.keys(edit).length === 0?dispatch(addBuilding(client,newbuilding)):dispatch(editBuilding(client,newbuilding,edit));
                dispatch(show(false))}else alert('Please fill all the fields')}}>
            {Object.keys(edit).length === 0?"Create":"Edit"}
          </Button>
          <div className="add-div-3">
            <Button variant="danger" type="cancel" onClick={()=> dispatch(show(false))}>Cancel</Button>
          </div>
        </div>
      </Form>
    </div>
  )
}
export default AddForm;