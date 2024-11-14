import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { DetailContext } from "../Providers/DetailProvider";

function DeleteItemButton({ itemId }) {
  const { handlerMap } = useContext(DetailContext);

  const handleDeleteItem = () => {
    handlerMap.deleteItem({ itemId });
  };

  return (
    <>
      <Button variant="danger" onClick={handleDeleteItem}>
        Delete
      </Button>{" "}
    </>
  );
}

export default DeleteItemButton;
