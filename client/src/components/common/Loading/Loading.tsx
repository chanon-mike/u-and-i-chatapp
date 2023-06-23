import styles from './Loading.module.css';

export const Loading = (props: { visible: boolean }) => {
  return props.visible ? (
    <>
      <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-gray-900">
        <div className={styles.loader} />
      </div>
    </>
  ) : null;
};
