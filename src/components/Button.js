import styles from './Button.module.css';
function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onclick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
