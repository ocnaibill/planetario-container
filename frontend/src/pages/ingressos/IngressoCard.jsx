import React from 'react';
import styles from './IngressoCard.module.css';

const IngressoCard = ({ image, title, details }) => {
    return (
        <div className={`${styles.ingressoCard} ${styles.ticketBox}`}>
            <img className={styles.ingressoImage} src={image} alt={title} />
            <div className={styles.ingressoTitle}>{title}</div>
            <div className={styles.ingressoSubtitle}>Seus Ingressos!</div> {/* Novo título */}
            <div
                className={styles.ingressoDetails}
                dangerouslySetInnerHTML={{ __html: details }}
            />
        </div>
    );
};

export default IngressoCard;
