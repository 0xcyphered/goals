import * as React from 'react';
import classNames from 'classnames';
import { edgePropDefs } from './props';
import { Card, Flex, Box, Text } from '@radix-ui/themes';

import type { GetPropDefTypes } from '@radix-ui/themes';

type EdgeElement = React.ElementRef<'div'>;
type EdgeOwnProps = GetPropDefTypes<typeof edgePropDefs>;
interface MapEdgeProps
  extends React.ComponentPropsWithoutRef<'div'>,
    EdgeOwnProps {}
const MapEdge = React.forwardRef<EdgeElement, MapEdgeProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      startNode = edgePropDefs.startNode.default,
      endNode = edgePropDefs.endNode.default,
      ...edgeProps
    } = props;
    const cardWidth = numberTypeReturner(edgeProps.cardWidth);
    const cardHeight = numberTypeReturner(edgeProps.cardHeight);
    const cardsVGap = numberTypeReturner(edgeProps.cardsVGap);
    const cardsHGap = numberTypeReturner(edgeProps.cardsHGap);
    const startGroup = numberTypeReturner(edgeProps.startGroup);
    const startOrder = numberTypeReturner(edgeProps.startOrder);
    const endOrder = numberTypeReturner(edgeProps.endOrder);
    const endDisplace = numberTypeReturner(edgeProps.endDisplace);
    const startDisplace = numberTypeReturner(edgeProps.startDisplace);
    const heightDisplace = numberTypeReturner(edgeProps.heightDisplace);

    const delta = (endOrder - startOrder) * (cardsHGap + cardWidth);
    const startDisplaceValue = (startDisplace * cardWidth * 2) / 5;
    const endDisplaceValue = (endDisplace * cardWidth * 3) / 16;
    const width =
      Math.abs(delta) +
      (delta > 0
        ? endDisplaceValue - startDisplaceValue
        : startDisplaceValue - endDisplaceValue);
    const leftDisplace = delta > 0 ? startDisplaceValue : endDisplaceValue;
    return (
      <Box
        className={classNames('absolute', className)}
        style={{
          top: cardHeight + startGroup * (cardsVGap + cardHeight),
          left:
            (delta > 0 ? startOrder : endOrder) * (cardsHGap + cardWidth) +
            cardWidth / 2 +
            leftDisplace,
          width,
          height: cardsVGap,
        }}
        ref={forwardedRef}
        {...edgeProps}
      >
        <Box
          className={classNames(
            'w-1/2',
            'absolute',
            'top-[1px]',
            delta === 0 ? 'right-[-1px]' : delta > 0 ? 'left-0' : 'right-0',
            'border',
            'border-gray-400',
            delta === 0 ? '' : delta > 0 ? 'rounded-bl' : 'rounded-br',
            delta > 0 ? 'border-l-gray-400' : 'border-r-gray-400',
            delta > 0 ? 'border-r-0' : 'border-l-0',
            delta > 0 ? 'border-l-1' : 'border-r-1',
            'border-b-gray-400',
            'border-b-1',
            'border-t-transparent',
            'border-t-0',
          )}
          style={{
            height: `${heightDisplace}%`,
          }}
        />
        <Box
          className={classNames(
            'w-1/2',
            'absolute',
            'bottom-0',
            delta > 0 ? 'right-0' : 'left-0',
            'border',
            'border-gray-400',
            delta === 0 ? '' : delta > 0 ? 'rounded-tr' : 'rounded-tl',
            delta > 0 ? 'border-l-gray-400' : 'border-r-gray-400',
            delta > 0 ? 'border-l-0' : 'border-r-0',
            delta > 0 ? 'border-l-1' : 'border-r-1',
            'border-t-gray-400',
            'border-t-1',
            'border-b-transparent',
            'border-b-0',
          )}
          style={{
            height: `${100 - heightDisplace}%`,
          }}
        />
        <Box
          className={classNames(
            'w-0',
            'h-0',
            'absolute',
            delta === 0
              ? 'left-[-6px]'
              : delta > 0
              ? 'right-[-6px]'
              : 'left-[-6px]',
            'bottom-[0px]',
            'border',
            'border-b-gray-400',
            'border-t-transparent',
            'border-x-transparent',
            'border-t-0',
            'border-r-[6px]',
            'border-b-[10px]',
            'border-l-[6px]',
            'rotate-180',
            'origin-center',
          )}
        />
      </Box>
    );
  },
);
MapEdge.displayName = 'MapEdge';

export { MapEdge };
export type { MapEdgeProps };

function numberTypeReturner(a: string | number | undefined): number {
  return typeof a === 'number' ? a : typeof a === 'string' ? parseInt(a) : 0;
}
