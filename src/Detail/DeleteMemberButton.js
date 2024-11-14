import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { DetailContext } from "../Providers/DetailProvider";

function RemoveMemberButton({ memberId }) {
  const { handlerMap } = useContext(DetailContext);

  return (
    <>
      <Button
        variant="danger"
        onClick={() => handlerMap.removeMember({ memberId })}
      >
        Delete member
      </Button>{" "}
    </>
  );
}

export default RemoveMemberButton;
