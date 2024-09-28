import React from 'react';
import AccordionItem from "../AccordionItem";
import styles from './Accordion.module.css';

export interface AccordionProps  {
    items: {
        question: string;
        answer: string;
    }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    return (
        <div className={styles.accordion}>
            {items.map((item, index) => (
                <AccordionItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};

export default Accordion;
