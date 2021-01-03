import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getItems, deleteItem } from "../actions/itemActions";
import { useDispatch, useSelector } from "react-redux";

const ShoppingList = () => {
  const items = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

  const onDeleteClick = (id) => {
    console.log(id);
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => onDeleteClick(_id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
