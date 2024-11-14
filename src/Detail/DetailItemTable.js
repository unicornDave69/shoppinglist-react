import React, { useContext, useState } from "react";
import { DetailContext } from "../Providers/DetailProvider";
import Table from "react-bootstrap/Table";
import DeleteItemButton from "./DeleteItemButton";
import AddItemButton from "./AddItemButton";
import ResolveItemButton from "./ResolveItemButton";
import BackToOverview from "./BackToOverviewButton";
import { OverviewContext } from "../Providers/OverviewProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { UserContext } from "../Providers/UserProvider";
import ConfirmLeave from "./ConfirmLeaveListModal";

function DetailItemTable() {
  const { data, handlerMap } = useContext(DetailContext);
  const { findShoppingList, updateShoppingList } = useContext(OverviewContext);
  const { loggedInUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const navigate = useNavigate();

  const { itemList } = data;
  const { listId } = useParams();
  const shoppingList = findShoppingList(listId);

  const isOwner = shoppingList.owner === loggedInUser;

  const handleRemoveMember = (memberId) => {
    setMemberToRemove(memberId);
    setShowModal(true);
  };

  const handleConfirmLeave = () => {
    const updatedMemberList = shoppingList.memberList.filter(
      (member) => member !== memberToRemove
    );

    updateShoppingList(listId, {
      ...shoppingList,
      memberList: updatedMemberList,
    });
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <BackToOverview />
      <h3>Detail Nákupního Seznamu</h3>

      {isOwner && (
        <>
          <Button
            variant="secondary"
            onClick={handlerMap.updateItemList}
            style={{
              borderRadius: "50%",
              width: "75px",
              height: "75px",
              margin: "5px",
            }}
          >
            Edit list name
          </Button>
          <Button
            variant="success"
            onClick={handlerMap.addMember}
            style={{
              borderRadius: "50%",
              width: "75px",
              height: "75px",
              margin: "5px",
            }}
          >
            Add member
          </Button>

          <Button
            variant="warning"
            onClick={() => handleRemoveMember(loggedInUser)}
            style={{
              borderRadius: "50%",
              width: "75px",
              height: "75px",
              margin: "5px",
            }}
          >
            Remove member
          </Button>
        </>
      )}

      {!isOwner && (
        <Button
          variant="danger"
          onClick={() => handleRemoveMember(loggedInUser)}
          style={{
            borderRadius: "50%",
            width: "75px",
            height: "75px",
            margin: "5px",
          }}
        >
          Leave the list
        </Button>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <td>{shoppingList.id}</td>
          </tr>
          <tr>
            <th>Název Seznamu</th>
            <td>{shoppingList.name}</td>
          </tr>
          <tr>
            <th>Vlastník</th>
            <td>{shoppingList.owner}</td>
          </tr>
          <tr>
            <th>Členové</th>
            <td>{shoppingList.memberList.join(", ")}</td>
          </tr>
        </thead>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Položka</th>
            <th>Množství</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>
                <ResolveItemButton
                  onClick={() =>
                    handlerMap.resolveItem({ itemId: item.itemId })
                  }
                />
              </td>
              <td>
                <DeleteItemButton
                  onClick={() => handlerMap.deleteItem({ itemId: item.itemId })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddItemButton
        onClick={() =>
          handlerMap.addItem({
            itemId: `${Math.random()}`,
            itemName: "Nová Položka",
            quantity: 1,
          })
        }
      />

      <ConfirmLeave
        show={showModal}
        onClose={() => setShowModal(false)}
        onLeave={handleConfirmLeave}
      />
    </>
  );
}

export default DetailItemTable;
