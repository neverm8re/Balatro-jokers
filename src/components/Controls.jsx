import styles from './Controls.module.css';

export const Controls = ({ searchTerm, setSearchTerm, filterRarity, setFilterRarity }) => {
  const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Legendary'];

  return (
    <div className={styles.controlsWrapper}>
      <input
        type="text"
        placeholder="Search Joker..."
        className={`${styles.searchInput} balatro-font`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.filterGroup}>
        {rarities.map((rarity) => (
          <button
            key={rarity}
            onClick={() => setFilterRarity(rarity)}
            className={`
              balatro-font 
              ${styles.filterBtn} 
              ${filterRarity === rarity ? styles.filterBtnActive : ''}
            `}
          >
            {rarity}
          </button>
        ))}
      </div>
    </div>
  );
};