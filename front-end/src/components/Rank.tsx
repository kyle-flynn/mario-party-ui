import { FC, useMemo } from 'react';

interface Props {
    rank: number;
}

export const Rank: FC<Props> = ({ rank }) => {
    const text = useMemo(() => {
      switch (rank) {
        case 1:
          return '1st';
        case 2:
          return '2nd';
        case 3:
          return '3rd';
        case 4:
          return '4th';
        default:
          return `${rank}th`;
        }
    }, [rank]);
    return <span>{text}</span>;
};