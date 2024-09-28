import React from 'react';
import Accordion from "../Accordion";
import styles from './Faq.module.css';

const FAQ: React.FC = () => {
    const faqItems = [
        {
            question: 'How can I track the status of my order?',
            answer: 'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.',
        },
        {
            question: 'How can I return or exchange an item?',
            answer: 'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.',
        },
    ];

    return (
        <section className={styles.faq} id="faq">
            <div className={styles.container}>
                <h2 className={styles.title}>FAQ</h2>
                <Accordion items={faqItems} />
            </div>
        </section>
    );
};

export default FAQ;
