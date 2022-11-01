import { FC } from "react";
import classes from "./SimplePlayer.module.less";
import MARIO_AVATAR from "../../../../assets/mario-avatar.png";

const SimplePlayer: FC = () => {
  return (
    <div className={classes.playerContainer}>
      <div className={classes.playerAvatar}>
        <img src={MARIO_AVATAR} />
      </div>
      <div className={classes.playerStats}>18</div>
    </div>
  );
};

export default SimplePlayer;
