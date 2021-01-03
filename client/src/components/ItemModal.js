import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addItem } from "../actions/itemActions";

const ItemModal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const toggle = () => {
    setModal((modal) => !modal);
  };

  const inputHandlor = (e) => {
    setName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      addItem({
        name: name,
      })
    );
    toggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Item
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={submit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={inputHandlor}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
