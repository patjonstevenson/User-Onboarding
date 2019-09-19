import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserList from "./UserList";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <div>
      <div className="user-form">
        <Form>
          <Field type="text" name="name" />
          {touched.name && errors.name && <p className="error">{errors.name}</p>}
          <Field type="text" name="email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
          <Field type="text" name="password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
          <label>
            Terms of Service
          <Field type="checkbox" name="tos" />
            {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
          </label>
          <button type="submit">Add User</button>
        </Form>
        {/*users.map(user => <h1>Hello World</h1>)*/}
        {<UserList users={users} />}
      </div>


    </div>
  );


};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password can be no longer than 50 characters")
      .required("Password required"),
    tos: Yup.boolean()
      .oneOf([true], "Must agree to Terms of Service")
      .required()
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res.data);
        setStatus(res.data);
      })
      .catch(err => console.log(err));
  }
})(UserForm);

export default FormikUserForm;
