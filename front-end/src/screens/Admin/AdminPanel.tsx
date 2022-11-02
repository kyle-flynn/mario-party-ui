import { FC } from "react";
import classes from "./AdminPanel.module.less";

export const AdminPanel: FC = () => {
  return (
    <div className={`container ${classes.adminPanel}`}>
      <div>
        <h1>Mario Party Admin Panel</h1>
      </div>
    </div>
  );
};
