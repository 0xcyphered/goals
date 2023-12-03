import type { PropDef } from '@radix-ui/themes';

const edgePropDefs = {
  startNode: { type: 'string', default: '' },
  endNode: { type: 'string', default: '' },
  startOrder: { type: 'string | number', default: 0 },
  endOrder: { type: 'string | number', default: 0 },
  startGroup: { type: 'string | number', default: 0 },
  endGroup: { type: 'string | number', default: 0 },
  endDisplace: { type: 'string | number', default: 0 },
  startDisplace: { type: 'string | number', default: 0 },
  heightDisplace: { type: 'string | number', default: 0 },
  cardWidth: { type: 'string | number', default: 0 },
  cardHeight: { type: 'string | number', default: 0 },
  cardsVGap: { type: 'string | number', default: 0 },
  cardsHGap: { type: 'string | number', default: 0 },
} satisfies {
  startNode: PropDef<string>;
  endNode: PropDef<string>;
  startOrder: PropDef<string | number>;
  endOrder: PropDef<string | number>;
  startGroup: PropDef<string | number>;
  endGroup: PropDef<string | number>;
  endDisplace: PropDef<string | number>;
  startDisplace: PropDef<string | number>;
  heightDisplace: PropDef<string | number>;
  cardWidth: PropDef<string | number>;
  cardHeight: PropDef<string | number>;
  cardsVGap: PropDef<string | number>;
  cardsHGap: PropDef<string | number>;
};

export { edgePropDefs };
