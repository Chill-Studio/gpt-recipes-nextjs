/* @todo Chakra translatable text */

import {
  Box,
  Button,
  Flex,
  IconProps,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
} from '@chakra-ui/react';

import { Recipe } from '#/api/openai';
import { T } from '../T/T.component';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  recipe: Recipe;
  footer: JSX.Element;
}

export function ModalRecipe({
  isModalOpen,
  closeModal,
  recipe,
  footer,
}: Props) {
  const overlayBlur = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <Modal
      scrollBehavior={'inside'}
      isCentered
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      {overlayBlur()}
      <ModalContent>
        <ModalHeader>Recette générée</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="0" m="0" whiteSpace={'pre-line'}>
            <T heading>{recipe?.title}</T>
            <br />
            <br />
            <UnorderedList>
              {recipe?.ingredients?.map((ing, i) => (
                <ListItem key={ing + i} as="li">
                  <T>{ing}</T>
                </ListItem>
              ))}
            </UnorderedList>

            <br />
            <br />
            <UnorderedList>
              {recipe?.instructions?.map((inst, i) => (
                <ListItem key={'instruc' + i} as="li">
                  <T>{inst}</T>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
/*
<Button colorScheme="purple" mr={3} onClick={onClickKeep}>
            Garder
          </Button>
          <Button
            onClick={() => {
              router.push('/');
              closeModal();
            }}
            variant="ghost"
          >
            Rejeter
          </Button>

          */
