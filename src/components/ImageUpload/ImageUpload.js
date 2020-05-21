import React from "react";
import { Form, Button } from "react-bootstrap";
//import axios from "axios";

const ImageUpload = (e) => {
  const styles = {
    marginLeft: "47rem",
    color: "#c4e1ff",
    paddingTop: "2rem",
    marginRight: "30rem",
  };
  const titleStyles = {
    paddingTop: "5rem",
    textAlign: "center",
    color: "#c4e1ff",
    paddingLeft: "2rem",
  };

  //posting data
  // const submit = (event) => {
  //   let email = e.target[0].value;
  //   let password = e.target[1].value;
  //   let address = e.target[2].value;
  //   let city = e.target[3].value;
  //   let data = {
  //     email,
  //     password,
  //     address,
  //     city,
  //   };

  //   console.log(data);
  //   postLetter(data);
  // };

  // const postLetter = (data) => {
  //   //console.log(data);
  //   axios
  //     .post("", data)
  //     .then((d) => {
  //       console.log(d);
  //     })
  //     .catch((err) => alert(err));
  // };

  return (
    <div>
      <h4 style={titleStyles}>Submit Your Photo </h4>
      <Form
        style={styles}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   submit(e);
        // }}
      >
        <Form.Row>
          <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control type="email" placeholder="Enter name" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group>
            <Form.Label>Image link</Form.Label>
            <Form.Control type="password" placeholder="Image url" />
          </Form.Group>
        </Form.Row>

        <Form.Group>
          Description
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Describe your image"
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default ImageUpload;
