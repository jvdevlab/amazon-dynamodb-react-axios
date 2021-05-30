import "./App.css";
import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import ReactJson from "react-json-view";
import LoadingOverlay from "react-loading-overlay";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
export default function App() {
  const classes = useStyles();
  const table = "test_data";
  const URL = "api/data";

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);

  async function getItem() {
    setLoading(true);
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({
          operation: "get",
          tableName: table,
          payload: {
            Key: {
              id: "1",
            },
          },
        })
      );
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function putItem() {
    setLoading(true);
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({
          operation: "put",
          tableName: table,
          payload: {
            Item: {
              id: "1",
              lastSeen: new Date(),
              isValid: true,
              desc: "Test",
            },
          },
        })
      );
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function updateItem() {
    setLoading(true);
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({
          operation: "update",
          tableName: table,
          payload: {
            Key: {
              id: "1",
            },
            AttributeUpdates: {
              newField: {
                Action: "PUT",
                Value: "Some Value",
              },
            },
          },
        })
      );
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function deleteItem() {
    setLoading(true);
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({
          operation: "delete",
          tableName: table,
          payload: {
            Key: {
              id: "1",
            },
          },
        })
      );
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function scan() {
    setLoading(true);
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({
          operation: "scan",
          tableName: table,
          payload: {},
        })
      );
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <LoadingOverlay active={isLoading} spinner text="Loading. Please wait..." className="App">
      <div>
        <div className={classes.root} style={{ padding: 15 }}>
          <Button onClick={putItem} variant="contained" color="primary">
            Put Item
          </Button>
          <Button onClick={getItem} variant="contained">
            Get Item
          </Button>
          <Button onClick={updateItem} variant="contained">
            Update Item
          </Button>
          <Button onClick={scan} variant="contained">
            Scan
          </Button>
          <Button onClick={deleteItem} variant="contained" color="secondary">
            Delete Item
          </Button>
        </div>
        <ReactJson src={data} name={false} theme="monokai" style={{ fontSize: 15 }} />
      </div>
    </LoadingOverlay>
  );
}
