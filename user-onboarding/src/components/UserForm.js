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
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && <p className="error">{errors.name}</p>}
          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
          <Field className="role-select" component="select" name="role">
            <option>Select Role</option>
            <option value="Architect">Architect</option>
            <option value="Operations">Operations</option>
            <option value="Back-End">Back-End</option>
            <option value="Front-End">Front-End</option>
            <option value="UX Design">UX Design</option>
          </Field>
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
  mapPropsToValues({ name, email, password, role, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || "",
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
  handleSubmit(values, { setStatus, resetForm, setErrors }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken." });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res.data);
          setStatus(res.data);
        })
        .catch(err => console.log(err));
      resetForm({ name: "", email: "", password: "", tos: false });
    }
  }
})(UserForm);

export default FormikUserForm;
