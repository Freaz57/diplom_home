import React from 'react';
import styles from './ShowMore.module.css';

interface ShowMoreProps {
    onClick: () => void;
    hasMore: boolean;
}

const ShowMore: React.FC<ShowMoreProps> = ({ onClick, hasMore }) => {
    if (!hasMore) return null;

    return (
        <button type="button" className={styles.button} onClick={onClick}>
            Show More
        </button>
    );
};

export default ShowMore;
