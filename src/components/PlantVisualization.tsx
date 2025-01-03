import React from 'react';
import { GROWTH_STAGES } from '../utils/plants';
import { motion } from 'framer-motion';

interface Plant {
  id: string;
  name: string;
  waterLevel: number;
  plantedDate: Date;
  lastWatered: Date;
  health: number;
  stage: 'seed' | 'sprout' | 'growing' | 'mature' | 'flowering';
  growth: number;
}

const PlantVisualization: React.FC<{ stage: Plant['stage'], animate?: boolean }> = ({ stage, animate }) => {
  const stageVisuals = {
    seed: (
      <motion.path
        d="M12 16 L12 8 C12 8 8 10 8 12 C8 14 12 16 12 16 C12 16 16 14 16 12 C16 10 12 8 12 8"
        stroke={GROWTH_STAGES.seed.color}
        fill={GROWTH_STAGES.seed.color}
        initial={animate ? { scale: 0 } : undefined}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    ),
    sprout: (
      <>
        <motion.path
          d="M12 16 L12 4"
          stroke={GROWTH_STAGES.sprout.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M12 8 C12 8 8 6 8 4"
          stroke={GROWTH_STAGES.sprout.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </>
    ),
    growing: (
      <>
        <motion.path
          d="M12 16 L12 4"
          stroke={GROWTH_STAGES.growing.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
        />
        <motion.path
          d="M12 12 C12 12 8 10 6 8 M12 8 C12 8 16 6 18 4"
          stroke={GROWTH_STAGES.growing.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </>
    ),
    mature: (
      <>
        <motion.path
          d="M12 16 L12 4"
          stroke={GROWTH_STAGES.mature.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
        />
        <motion.path
          d="M12 12 C12 12 6 10 4 12 M12 8 C12 8 18 6 20 8"
          stroke={GROWTH_STAGES.mature.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.path
          d="M12 4 C12 4 8 2 8 0 M12 4 C12 4 16 2 16 0"
          stroke={GROWTH_STAGES.mature.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </>
    ),
    flowering: (
      <>
        <motion.path
          d="M12 16 L12 4"
          stroke={GROWTH_STAGES.flowering.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
        />
        <motion.path
          d="M12 12 C12 12 6 10 4 12 M12 8 C12 8 18 6 20 8"
          stroke={GROWTH_STAGES.flowering.color}
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.circle
          cx="12"
          cy="4"
          r="3"
          fill="#ff69b4"
          initial={animate ? { scale: 0 } : undefined}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 16" width="48" height="32">
      {stageVisuals[stage]}
    </svg>
  );
};

export default PlantVisualization;