import React, { useState } from "react";
import Table from "./RenderTable";
import Database from "./Database";
import FormInput from "./FormInput";
import "rsuite/dist/styles/rsuite-default.css";
import { Alert, Button } from "rsuite";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const styles = {
  btn: {
    backgroundColor: "red",
    color: "#fff",
  },
};

export default function Manage(props) {
  const history = useHistory();
  const [arrayProduct, setArrayProduct] = useState(Database);
  const [properties, setProperties] = useState({
    id: "",
    name: "",
    manufacturer: "",
    price: "",
    country: "",
  });
  const [arrayTemporary, setArrayTemporary] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [disableInputID, setDisableInputID] = useState(false);

  const onChangeStatusInputId = (disableInputID = false) => {
    setDisableInputID(disableInputID);
  };

  const clearInput = () => {
    setProperties({});
  };

  const onChangeSearchField = (e) => {
    let search = arrayProduct.filter((newArray) => {
      return (
        newArray.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
        newArray.id.toUpperCase().includes(e.target.value.toUpperCase())
      );
    });
    setKeyWord(e.target.value.toUpperCase());
    setArrayTemporary(search);
    clearInput();
  };

  const checkValidateId = (ProductAttribute) => {
    let validate = true;
    let messenger = "";
    let count = 0;
    let idInput = ProductAttribute.id.toLowerCase();
    for (let x = 0; x < arrayProduct.length; x++) {
      let idformData = arrayProduct[x].id.toLowerCase();
      if (idformData === idInput) {
        count = count + 1;
      }
    }
    if (count > 0) {
      messenger = "The product id already exists!";
      validate = false;
    }
    if (messenger) {
      Alert.error(messenger, 1500);
    }
    return validate;
  };

  const handleDataSubmit = (obj) => {
    let index = arrayProduct.findIndex((s) => s.id === obj.id);
    if (!disableInputID) {
      if (!checkValidateId(obj)) {
        return;
      } else {
        setArrayProduct([...arrayProduct, obj]);
      }
    } else {
      if (arrayTemporary.length === 0) {
        let index1 = arrayProduct.findIndex((s) => s.id === obj.id);
        arrayProduct[index1] = obj;
      } else {
        console.log("current: ", index);
        let index2 = arrayTemporary.findIndex(
          (s) => s.id === arrayProduct[index].id
        );
        arrayProduct[index] = obj;
        arrayTemporary[index2] = obj;
      }
      setArrayProduct(arrayProduct);
      setArrayTemporary(arrayTemporary);
    }
    onChangeStatusInputId(false);
    clearInput();
    Alert.success("Success!", 1500);
  };

  const showFormEdit = (id) => {
    let index = arrayProduct.findIndex((s) => s.id === id);
    setTimeout(() => {
      onChangeStatusInputId(true);
      setProperties(arrayProduct[index]);
    }, 0);
    console.log(arrayProduct[index]);
    history.push("/input");
  };
  const deleteData = (id) => {
    let index = arrayProduct.findIndex((s) => s.id === id);
    if (arrayTemporary.length === 0) {
      arrayProduct.splice(index, 1);
      setArrayProduct(arrayProduct);
    } else {
      let index2 = arrayTemporary.findIndex((s) => s.id === id);
      arrayProduct.splice(index, 1);
      arrayTemporary.splice(index2, 1);
      setArrayProduct(arrayProduct);
      setArrayTemporary(arrayTemporary);
    }
    Alert.success("Deleted!", 1500);
    clearInput();
  };

  return (
    <Router>
      <div className="main">
        <Route path="/input" exact>
          <FormInput
            onSubmitData={handleDataSubmit}
            initialValues={properties}
            disableInputID={disableInputID}
          />
        </Route>

        <div className="content">
          <Link
            to={{
              pathname: "/input",
              state: { lll: "3435" },
            }}
          >
            <Button style={styles.btn}>New Product</Button>
          </Link>
          <div className="search">
            <input
              onChange={onChangeSearchField}
              value={keyWord}
              placeholder="Search by id or name..."
            />
          </div>
          <Table
            arrayProduct={arrayProduct}
            arrayTemporary={arrayTemporary}
            showFormEdit={showFormEdit}
            deleteData={deleteData}
            keyWord={keyWord}
          />
        </div>
      </div>
    </Router>
  );
}
