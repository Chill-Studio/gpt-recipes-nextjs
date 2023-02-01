/* @todo Chakra translatable text */

import { Flex, IconProps } from '@chakra-ui/react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Spinner as SpinnerChakra } from '@chakra-ui/spinner';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

interface Props {}

export function Spinner(p: Props) {
  return (
    <Flex
      position={'absolute'}
      zIndex={100}
      top={0}
      left={0}
      bg="#0000001a"
      height={'100vh'}
      width="100%"
      justifyContent={'center'}
      alignItems="center"
    >
      <SpinnerChakra
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}
