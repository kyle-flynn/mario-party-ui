import { FC } from 'react';
import classes from './PlayerResult.module.less';

import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";

const PlayerResult: FC = () => {
    return (
        <div className={classes.playerContainer}>
            <div className={classes.playerResult}>
                <div>
                    1st
                </div>
                <div className='center'>
                    <span><img src={STAR_ICON} /></span>
                    <span>6</span>
                </div>
                <div className='center'>
                    <span><img src={COIN_ICON} /></span>
                    <span>30</span>
                </div>
            </div>
            <div className={classes.playerName}>
                Jacob Komar
            </div>
        </div>
    )
}

export default PlayerResult;