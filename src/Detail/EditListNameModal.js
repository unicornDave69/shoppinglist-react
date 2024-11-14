import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditNameModal(  
  showModal,
  handleCloseModal,
  listName,
  setListName,
  selectedMembers,
  setSelectedMembers,
  userMap,
  loggedInUser,
  handleSaveList,) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Edit list name:</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formListName">
          <Form.Label>New name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSaveList}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);
  );
}

export default EditNameModal;