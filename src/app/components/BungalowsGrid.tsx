// src/app/components/BungalowsGrid.tsx
'use client';

import { motion } from 'framer-motion';
import BungalowCard from '@/app/components/BungalowCard';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function BungalowsGrid({ bungalows }: { bungalows: any[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {bungalows.map((bungalow) => (
        <motion.div key={bungalow.id} variants={item}>
          <BungalowCard bungalow={bungalow} />
        </motion.div>
      ))}
    </motion.div>
  );
}