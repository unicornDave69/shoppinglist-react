import { createContext, useMemo, useState } from "react";

export const DetailContext = createContext();

function DetailProvider({ children }) {
  const [data, setData] = useState({
    id: ``,
    name: "",
    owner: "",
    memberList: [],
    itemList: [
      {
        itemId: ``,
        itemName: "",
        quantity: null,
        resolved: false,
      },
    ],
  });

  const [showResolved, setShowResolved] = useState(false);

  const dataFilter = useMemo(() => {
    const result = { ...data };
    if (!showResolved) {
      result.itemList = result.itemList.filter((item) => !item.resolved);
    }
    return result;
  }, [data, showResolved]);

  const setListDetails = (newData) => {
    setData(newData);
  };

  const value = {
    data: dataFilter,
    handlerMap: {
      addItem: ({ itemId, itemName, quantity }) => {
        setData((current) => ({
          ...current,
          itemList: [
            ...current.itemList,
            {
              itemId,
              itemName,
              quantity,
              resolved: false,
            },
          ],
        }));
      },
      updateItem: ({ itemId, itemName, quantity }) => {
        setData((current) => ({
          ...current,
          itemList: current.itemList.map((item) =>
            item.itemId === itemId ? { ...item, itemName, quantity } : item
          ),
        }));
      },
      updateListName: ({ name }) => {
        setData((current) => ({
          ...current,
          name,
        }));
      },
      resolveItem: ({ itemId }) => {
        setData((current) => ({
          ...current,
          itemList: current.itemList.map((item) =>
            item.itemId === itemId
              ? { ...item, resolved: !item.resolved }
              : item
          ),
        }));
      },
      deleteItem: ({ itemId }) => {
        setData((current) => ({
          ...current,
          itemList: current.itemList.filter((item) => item.itemId !== itemId),
        }));
      },
      addMember: ({ memberId }) => {
        setData((current) => ({
          ...current,
          memberList: current.memberList.includes(memberId)
            ? current.memberList
            : [...current.memberList, memberId],
        }));
      },
      removeMember: ({ memberId }) => {
        setData((current) => ({
          ...current,
          memberList: current.memberList.filter(
            (member) => member !== memberId
          ),
        }));
      },
    },
    showResolved,
    toggleShowResolved: () => setShowResolved((current) => !current),
    setListDetails,
  };

  return (
    <DetailContext.Provider value={value}>{children}</DetailContext.Provider>
  );
}

export default DetailProvider;
