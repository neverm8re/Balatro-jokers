import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './JokerCard.module.css';

export const JokerCard = ({ joker }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cleanPath = joker.image.replace(/\\/g, '/').replace(/^\//, '');
const imagePath = `public/${cleanPath}`;

  const rarityStyles = {
    Common: { bg: "#4987ba", stroke: "#2d5a7d" },
    Uncommon: { bg: "#59ad62", stroke: "#3a7a41" },
    Rare: { bg: "#e55041", stroke: "#9e342a" },
    Legendary: { bg: "#b166d1", stroke: "#7a3f91" },
  };

  const currentRarity = rarityStyles[joker.rarity] || rarityStyles.Common;

  return (
    <div className={styles.cardContainer} style={{ zIndex: isHovered ? 999 : 1 }}>
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ y: isHovered ? -25 : 0, scale: isHovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative cursor-pointer flex justify-center items-center w-full h-full"
      >
        <motion.div
          animate={{ rotate: [-1.2, 1.2, -1.2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className={styles.cardVisual}
        >
          <img 
            src={imagePath} 
            alt={joker.name} 
            className="w-full h-full object-contain pixelated"
            onError={(e) => {
               console.error("Failed to load image at:", imagePath);
            }}
          />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: 0 }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: 15 }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: 0 }}
              className={styles.tooltip}
              style={{ left: '50%' }}
            >
              <h3 className={`${styles.tooltipTitle} balatro-font`}>{joker.name}</h3>
              <div className={styles.effectBox}>
                <p className={`${styles.effectText} balatro-font`}>{joker.effect}</p>
              </div>
              <div className={styles.rarityBadge}>
                <div 
                  className={styles.rarityLabel}
                  style={{ 
                    backgroundColor: currentRarity.bg,
                    borderBottom: `4px solid ${currentRarity.stroke}` 
                  }}
                >
                  <span className="balatro-font">{joker.rarity}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};