export const GROWTH_STAGES = {
  seed: { minGrowth: 0, color: '#795548' },
  sprout: { minGrowth: 20, color: '#81c784' },
  growing: { minGrowth: 40, color: '#66bb6a' },
  mature: { minGrowth: 70, color: '#43a047' },
  flowering: { minGrowth: 90, color: '#2e7d32' },
};

export const PLANT_LEVEL = {
  '1': 'seed',
  '2': 'sprout',
  '3': 'growing',
  '4': 'mature',
  '5': 'flowering',
  '6': 'flowering',
  '7': 'flowering',
  '8': 'flowering'
};

export const plantCardVariants = {
  hidden: { 
    opacity: 0, 
    y: -20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      bounce: 0.3,
      type: "spring"
    }
  }
};