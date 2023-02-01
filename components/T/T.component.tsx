/* @todo Chakra translatable text */

import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

import { useTranslation } from 'next-i18next';

export interface Props extends TextProps {
  id?: string;
  heading?: boolean;
}

export function T(p: Props & HeadingProps) {
  const { t } = useTranslation();
  const { id, heading, ...otherProps } = p;
  const text = id ? t(id) : p.children;
  return heading ? (
    <Heading {...(otherProps as HeadingProps)}>{text}</Heading>
  ) : (
    <Text {...(otherProps as TextProps)}>{text}</Text>
  );
}
