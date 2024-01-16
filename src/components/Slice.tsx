import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import "./Slice.css";

interface ListItem {
  id?: number;
  name?: string;
}

const Slice: React.FC = () => {
    const [listItem, setListItem] = useState<ListItem[]>([
    {
      id: 1,
      name: "Shashank",
    },
    {
      id: 2,
      name: "Saqlain",
    },
    {
      id: 3,
      name: "Akshat",
    },
    {
      id: 4,
      name: "Manish",
    },
    {
      id: 5,
      name: "Utkarsh",
    },
    {
      id: 6,
      name: "Abhay",
    },
    {
      id: 7,
      name: "Shakshi",
    },
    {
      id: 8,
      name: "Arushi",
    },
    {
      id: 9,
      name: "Raftaar",
    },
    {
      id: 10,
      name: "Pooja",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredOptions = listItem.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [prevSearch, setPrevSearch] = useState<ListItem[]>([]);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ListItem[]>([]);

  const handleClick = (item: ListItem) => {
    setSelectedItem((prev) => [...prev, item]);
    setListItem(listItem.filter((i) => i.id !== item.id));
  };

  const handleCancelButton = (item: ListItem) => {
    setSelectedItem((prev) => {
      setPrevSearch(prev);
      return prev.filter((ele) => ele.id !== item.id);
    });
    setListItem([...listItem, item]);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showList]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (showList && (event.target as HTMLElement).closest("body") === null) {
      setShowList(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      setSelectedItem(prevSearch);
      setBackspaceCount(backspaceCount + 1);
      if (backspaceCount >= 2) {
        setSelectedItem([]);
        setBackspaceCount(0);
      }
    }
  };

  return (
    <div className="container">
      <div className="section-A">PICK USERS</div>
      <div className="section-B">
        {selectedItem.map((item, index) => (
          <div key={index} className="section-B-1">
            <p>{item.name}</p>
            <button onClick={() => handleCancelButton(item)}>
              X
            </button>
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="Add More User..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            onClick={() => setShowList(!showList)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {showList && (
        <div className="section-C">
          {filteredOptions.map((option, index) => (
            <div key={index} onClick={() => handleClick(option)} className="section-C-1">
              <p>{option.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slice;



