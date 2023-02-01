import { ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useContext, useMemo, useState } from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';
import { ModalRecipe } from './../components/ModalRecipe/ModalRecipe';
import { ROUTES } from './../routes/index';
import { Recipe } from '#/api/openai';
import { RecipesCtxt } from './../contexts/recipes-context';
import { T } from '#/components/T/T.component';
import { getFromStorage } from '#/services/local-storage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/navigation';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default function Home() {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const router = useRouter();
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>();
  const { recipes } = useContext<{ recipes: Recipe[] }>(RecipesCtxt);
  const [inputValue, setInputValue] = useState('');
  const filteredList =
    inputValue !== ''
      ? recipes.filter((r) =>
          r.title.toLowerCase().includes(inputValue.toLowerCase()),
        )
      : recipes;

  console.log(filteredList);
  const header = (
    <Flex>
      <VStack alignItems="flex-start" w="70%">
        <T heading as="h1" size="4xl" id="IAtable" />
        <T
          pt={'5'}
          as="p"
          color="gray.400"
          id="Génère des recettes a partir de ce que tu as dans le frigo"
        />
      </VStack>
    </Flex>
  );

  const navigateToIngredients = useCallback(() => {
    router.push(ROUTES.selectIngredients);
  }, [router]);

  const openRecipe = (index: number) => () => {
    setCurrentRecipe(recipes[index]);
    openModal();
  };
  function renderFilteredRecipeList() {
    return (
      <List height={'100%'} overflowY="auto">
        {filteredList.map((recipe: Recipe, i: number) => {
          return (
            <ListItem
              onClick={openRecipe(i)}
              style={{
                backgroundColor: '#F6F8FC',
                alignItems: 'center',
                paddingLeft: 15,
                display: 'flex',
              }}
              key={recipe.title + i}
              fontWeight="bold"
              h={70}
              m="15px 0px"
            >
              {recipe.title}
            </ListItem>
          );
        })}
      </List>
    );
  }

  const renderSearch = () => {
    return (
      <InputGroup mt="10">
        <InputLeftElement
          pt="5"
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          <SearchIcon />
        </InputLeftElement>
        <Input
          pt={'1'}
          h={'55px'}
          placeholder="Chercher dans mes recettes..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </InputGroup>
    );
  };
  return (
    <>
      <Flex h="100vh" w="100%" justifyContent={'center'} padding={'80px 30px'}>
        <Flex justifyContent={'space-evenly'} direction={'column'}>
          <Box>{header}</Box>
          {renderSearch()}
          {renderFilteredRecipeList()}
          <Button
            rightIcon={<ArrowForwardIcon fontSize={25} />}
            colorScheme="purple"
            h={79}
            variant="solid"
            onClick={navigateToIngredients}
          >
            Choisir ingrédients
          </Button>
        </Flex>
      </Flex>
      <Image
        style={{ position: 'absolute', top: 50, right: 0 }}
        src="/images/burger.png"
        width={90}
        height={90}
        alt="Picture of the author"
      />
      <ModalRecipe
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        recipe={currentRecipe as any}
        footer={
          <>
            <Button
              onClick={() => {
                closeModal();
              }}
              variant="ghost"
            >
              Fermer
            </Button>
          </>
        }
      />
    </>
  );
}
