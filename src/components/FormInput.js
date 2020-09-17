import React from "react";
import { Form as Final_Form } from "react-final-form";
import Styles from "./Styles";
import "rsuite/dist/styles/rsuite-default.css";
import { ControlLabel, Button, Form } from "rsuite";
import InputElement from "./InputElement";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";

export default function FormInput(props) {
  const { onSubmitData, disableInputID } = props;
  const loaction = useLocation();
  const history = useHistory;
  console.log("current ID: ", loaction.state);
  const onSubmit = (obj, form) => {
    //onSubmitData(obj);
    setTimeout(form.restart, 0);
    //history.push("/table");
  };
  return (
    <Styles>
      <div className="modal-body">
        <Final_Form
          onSubmit={onSubmit}
          initialValues={props.initialValues}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <Form onSubmit={handleSubmit}>
              <ControlLabel>ID</ControlLabel>
              <InputElement
                type="text"
                icon="edit"
                name="id"
                disabled={disableInputID}
              />
              <ControlLabel>Name</ControlLabel>
              <InputElement type="text" icon="slack" name="name" />
              <ControlLabel>Company</ControlLabel>
              <InputElement type="text" icon="home" name="manufacturer" />
              <ControlLabel>Price</ControlLabel>
              <InputElement type="number" icon="usd" name="price" />
              <ControlLabel>Country</ControlLabel>
              <InputElement type="text" icon="map-marker" name="country" />
              <div className="buttons">
                <Button
                  type="submit"
                  disabled={submitting}
                  componentClass={Link}
                  to={{
                    pathname: "/home",
                    state: {
                      properties: values,
                    },
                  }}
                >
                  {disableInputID ? "Update" : "Add"}
                </Button>
                <Button
                  type="button"
                  onClick={form.restart}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    </Styles>
  );
}
