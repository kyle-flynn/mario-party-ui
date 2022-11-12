import { FC, MouseEvent, useState } from "react";
import { Item, Items } from "../../../AppTypes";
import classes from "../AdminPanel.module.less";

interface Props {
  onSelect: (item: Item) => void;
}

export const ItemDropdown: FC<Props> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleSelect = (item: Item) => {
    setOpen(false);
    onSelect(item);
  };

  return (
    <div className={classes.itemDropdown}>
      <button onClick={handleClick}>Add Item</button>
      <div className={open ? classes.itemListOpen : classes.itemListClosed}>
        {Items.map((i) => {
          const select = () => handleSelect(i);
          return <div onClick={select} key={`item-${i.name}`}>{i.name}</div>;
        })}
      </div>
    </div>
  );
};
