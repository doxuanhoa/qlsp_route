import React from "react";
import "rsuite/lib/styles/index.less";
import "rsuite/dist/styles/rsuite-default.css";
import { Icon, Button, Table } from "rsuite";
import { Link } from "react-router-dom";
const { Column, HeaderCell, Cell } = Table;
const styles = {
  btn: {
    backgroundColor: "#169de0",
    color: "#fff",
  },
  table: {
    width: "710px",
    border: "1px solid blue",
  },
};

const RenderTable = (props) => {
  const { deleteData, arrayProduct = [], arrayTemporary = [], keyWord } = props;

  function getData() {
    const listData = keyWord === "" ? arrayProduct : arrayTemporary;
    return listData;
  }
  const data = getData();
  return (
    <div>
      <Table style={styles.table} data={data} height={400}>
        <Column width={70} align="center">
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={220}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={100}>
          <HeaderCell>Manufacturer</HeaderCell>
          <Cell dataKey="manufacturer" />
        </Column>
        <Column width={100}>
          <HeaderCell>Country</HeaderCell>
          <Cell dataKey="country" />
        </Column>
        <Column width={100} flexGrow={1}>
          <HeaderCell>Price</HeaderCell>
          <Cell dataKey="price" />
        </Column>
        <Column width={120} fixed="right">
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowIndex) => {
              return (
                <span>
                  <Button
                    style={styles.btn}
                    componentClass={Link}
                    to={{
                      pathname: "/input",
                      state: { rowIndex: rowIndex, setIsInputId: true },
                    }}
                  >
                    <Icon icon="edit2" />
                  </Button>{" "}
                  <Button
                    style={styles.btn}
                    onClick={() => deleteData(rowIndex.id)}
                  >
                    <Icon icon="trash2" />
                  </Button>
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default RenderTable;
