import type { PropDef } from '@radix-ui/themes';

const cardPropDefs = {
  title: { type: 'string', default: 'MapCard' },
  x: { type: 'string | number', default: 0 },
  y: { type: 'string | number', default: 0 },
} satisfies {
  title: PropDef<string>;
  x: PropDef<string | number>;
  y: PropDef<string | number>;
};

export { cardPropDefs };
