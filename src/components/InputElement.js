import React from "react";
import { Field } from "react-final-form";
import "rsuite/dist/styles/rsuite-default.css";
import { Input, InputGroup, Icon } from "rsuite";

export default function InputElement(props) {
  const required = (value) => (value ? undefined : "This field is required");
  return (
    <div>
      <InputGroup>
        <InputGroup.Addon>
          <Icon icon={props.icon} />
        </InputGroup.Addon>
        <Field name={props.name} validate={required}>
          {({ input, meta }) => (
            <div>
              <Input {...input} type={props.type} disabled={props.disabled} />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
      </InputGroup>
    </div>
  );
}
