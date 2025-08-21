import styles from './Header.module.css';
import { useState } from 'react';
import { Modal } from '../../modal/Modal';
import { HookForm } from '../../forms/HookForm';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHookForm, setIsOpenHookForm] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            setIsOpen(true);
            setIsOpenHookForm(false);
          }}
        >
          Form 1
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setIsOpen(true);
            setIsOpenHookForm(true);
          }}
        >
          Form 2
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {isOpenHookForm ? <HookForm /> : <div>Form 111</div>}
      </Modal>
    </header>
  );
};
