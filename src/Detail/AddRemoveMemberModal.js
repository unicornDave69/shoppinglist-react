import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";

function AddRemoveMemberModal({
  showModal,
  handleCloseModal,
  selectedMembers,
  setSelectedMembers,
  userMap,
  loggedInUser,
  handleSaveList,
}) {
  const handleSelect = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Members:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-members">
              Vyber členy
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.entries(userMap).map(
                ([userId, user]) =>
                  userId !== loggedInUser && (
                    <Dropdown.Item
                      key={userId}
                      onClick={() => handleSelect(userId)}
                      active={selectedMembers.includes(userId)}
                    >
                      {user.name}
                    </Dropdown.Item>
                  )
              )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="mt-3">
            {selectedMembers.length > 0 && (
              <div>
                <strong>Členové:</strong>
                <ul>
                  {selectedMembers.map((userId) => (
                    <li key={userId}>{userMap[userId].name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveList}>
          Save List
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddRemoveMemberModal;
