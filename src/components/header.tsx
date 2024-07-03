import styles from './header.module.css';

const Header = () => {
  return (
    <header>
      <h1 className={styles.title}>都道府県別の人口推移グラフ</h1>
    </header>
  );
};

export default Header;
