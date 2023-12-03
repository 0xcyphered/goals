import * as React from 'react';
import classNames from 'classnames';
import { cardPropDefs } from './props';
import { Card, Flex, Box, Text } from '@radix-ui/themes';

import type { GetPropDefTypes } from '@radix-ui/themes';

type CardElement = React.ElementRef<'div'>;
type CardOwnProps = GetPropDefTypes<typeof cardPropDefs>;
interface MapCardProps
  extends React.ComponentPropsWithoutRef<'div'>,
    CardOwnProps {}
const MapCard = React.forwardRef<CardElement, MapCardProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      title = cardPropDefs.title.default,
      ...cardProps
    } = props;
    const x: number =
      typeof cardProps.x === 'number'
        ? cardProps.x
        : typeof cardProps.x === 'string'
        ? parseInt(cardProps.x)
        : 0;

    const y: number =
      typeof cardProps.y === 'number'
        ? cardProps.y
        : typeof cardProps.y === 'string'
        ? parseInt(cardProps.y)
        : 0;

    return (
      <Box
        className={classNames(
          'bg-bg-transparent',
          'rounded-xl',
          'w-[290px]',
          'h-[76px]',
          'text-white',
          'absolute',
          'p-3',
          className,
        )}
        style={{
          left: x,
          top: y,
        }}
        ref={forwardedRef}
        {...cardProps}
      >
        <Flex gap="3" align="center">
          <Box>
            <Text as="div" size="1" weight="medium">
              {title}
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  },
);
MapCard.displayName = 'MapCard';

export { MapCard };
export type { MapCardProps };
