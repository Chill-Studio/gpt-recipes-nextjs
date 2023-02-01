/* @todo Chakra translatable text */

import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconProps } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

interface Props extends IconProps {
  id?: string;
  heading?: boolean;
}

export function ButtonBack(p: Props) {
  const router = useRouter();
  const navigateToIngredients = useCallback(() => {
    router.back();
  }, [router]);

  return <ArrowBackIcon fontSize={20} onClick={navigateToIngredients} />;
}
