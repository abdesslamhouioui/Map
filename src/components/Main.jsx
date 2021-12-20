import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, ListGroup, Accordion, Button } from "react-bootstrap";
import MyMap from "./MyMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteBuilding, show, active } from "../Redux/actions";
import AddForm from "./AddForm";
import "./styles.css";

const Main = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => Object.keys(state.clients));
  const state = useSelector((state) => state.clients);
  const activee = useSelector((state) => state.active);
  const add = useSelector((state) => state.add);
  const [client, setclient] = useState(clients[0] || { name: "building1", location: "Tunisia" });
  const [edit, setedit] = useState({});
  useEffect(() => {dispatch(show())}, [dispatch]);
  const [building, setbuilding] = useState(state[client][0])
  useEffect(() => {setbuilding(state[client][0])}, [client])
  const [testt, settestt] = useState()
  const test = (newbuilding)=>{settestt(newbuilding)}
  useEffect(() => {if (testt)setbuilding(testt)}, [testt])

  return (
    <div>
      <div className="main-div-1">
        {/* Client dropdown */}
        <Dropdown onSelect={(e) => setclient(e.slice(1))}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {client}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {clients.map((e) => (
              <Dropdown.Item href={`#${e}`}>{e}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="main-div-2">
        <div className="main-div-3">
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="1">
              <Accordion.Header className="accordion1">
                <h3 className="h3">Buildings</h3>
              </Accordion.Header>
              <Accordion.Body>
                {/* Buildings list */}
                <ListGroup as="ol" numbered>
                  {state[client].map((e) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      onClick={() => {setbuilding({name:e.name,location:e.location});
                        dispatch(active({ building: e.name, active: true }))}}
                      active={activee.building === e.name ? activee.active : false}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{e.name}</div>
                      </div>
                      {/* Edit building button */}
                      <Button variant="none"onClick={() => {setedit({ name: e.name, location: e.location });dispatch(show(true))}}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      {/* Delete building button */}
                      <Button variant="none"onClick={() => dispatch(deleteBuilding(client, e))}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
              <div className="main-div-4">
                {/* Add building button */}
                <Button onClick={() => {dispatch(show(true));setedit({})}}>
                  Add Building
                </Button>
              </div>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="main-div-5">
          {add ?<AddForm key={edit.name} test={test} client={client} edit={edit} />: 
            <MyMap key={edit} countyTarget={state[client][0]!== undefined?building.location:"Tunisia"}
              BuildingName={state[client][0]!== undefined? building.name:"building1"}/>}
        </div>
      </div>
    </div>
  );
};
export default Main;