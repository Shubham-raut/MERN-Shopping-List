import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorAction';

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated && modal) {
      toggle();
    }
  }, [isAuthenticated]);

  const toggle = () => {
    dispatch(clearErrors());
    setModal((modal) => !modal);
  };

  const inputHandlor = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const { email, password } = data;

    // Create user object
    const user = {
      email,
      password,
    };

    // Attempt to login
    dispatch(login(user));
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={submit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={inputHandlor}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={inputHandlor}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
