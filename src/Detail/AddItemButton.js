import React, { useContext, useState } from "react";
import { DetailContext } from "../Providers/DetailProvider";
import { Modal, Button, Form } from "react-bootstrap";

function AddButton() {
  const { handlerMap } = useContext(DetailContext);
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateItem = () => {
    handlerMap.addItem({
      itemId: Math.random().toString(),
      itemName,
      quantity: parseInt(quantity, 10),
    });
    setItemName("");
    setQuantity("");
    handleCloseModal();
  };

  return (
    <>
      <Button variant="success" onClick={handleShowModal}>
        Add Item
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formItemName&quantity">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <hr />
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter item quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateItem}>
            Save Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddButton;
