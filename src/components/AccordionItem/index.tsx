import styles from './AccordionItem.module.css';
import faq_plus from '../../assets/images/faq_plus.svg';
import {useState} from "react";

export type AccordionItemProps = {
    question: string;
    answer: string;
};

const AccordionItem = ({ question, answer }:AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className={styles.list}>
            <button className={styles.question} onClick={toggleOpen}>
                {question}
                <img
                    src={faq_plus}
                    alt="plus"
                    className={`${styles.img} ${isOpen ? styles.rotate : ''}`}
                />
            </button>
            <div className={`${styles.collapse} ${isOpen ? styles.open : ''}`}>
                <div className={styles.answer}>{answer}</div>
            </div>
        </li>
    );
};

export default AccordionItem;
