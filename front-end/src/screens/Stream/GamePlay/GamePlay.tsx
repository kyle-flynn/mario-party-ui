import { FC } from "react";
import SimplePlayer from "./components/SimplePlayer";
import classes from "./GamePlay.module.less";

export const GamePlay: FC = () => {
  return (
    <div className={classes.playerContainer}>
      <SimplePlayer />
      <SimplePlayer />
      <SimplePlayer />
      <SimplePlayer />
    </div>
  );
};
