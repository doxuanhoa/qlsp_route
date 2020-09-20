import React, { useState, useEffect } from "react";
import Table from "./RenderTable";
import Database from "./Database";
import "rsuite/dist/styles/rsuite-default.css";
import { Alert, Button } from "rsuite";
import { Link, useLocation } from "react-router-dom";

const styles = {
  btn: {
    backgroundColor: "red",
    color: "#fff",
  },
};

export default function Manage(props) {
  const getState = useLocation().state;
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
  const [isInputId, setIsInputId] = useState(false);

  useEffect(() => {
    if (getState) {
      const index1 = arrayProduct.findIndex((s) => s.id === getState.obj.id);
      if (!getState.isInputId) {
        if (!checkValidateId(getState.obj)) {
          return;
        }
        setArrayProduct([...arrayProduct, getState.obj]);
      } else {
        if (arrayTemporary.length === 0) {
          arrayProduct[index1] = getState.obj;
        } else {
          const index2 = arrayTemporary.findIndex((s) => s.id === getState.id);
          arrayProduct[index1] = getState.obj;
          arrayTemporary[index2] = getState.obj;
        }
        setArrayProduct(arrayProduct);
        setArrayTemporary(arrayTemporary);
      }
      Alert.success("Success!", 2000);
    }
  }, []);

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
    <div className="main">
      <div className="content">
        <Button
          style={styles.btn}
          componentClass={Link}
          to={{
            pathname: "/input",
            state: { setIsInputId: false },
          }}
        >
          New Product
        </Button>
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
          deleteData={deleteData}
          keyWord={keyWord}
        />
      </div>
    </div>
  );
}
