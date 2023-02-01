import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { Recipe, RecipeAPI } from '#/api/openai';
import { getFromStorage, saveToStorage } from '#/services/local-storage';
import { useContext, useState } from 'react';

import { ButtonBack } from '#/components/ButtonBack/ButtonBack';
import { GetStaticProps } from 'next';
import { ModalRecipe } from './../components/ModalRecipe/ModalRecipe';
import { RecipesCtxt } from './../contexts/recipes-context';
import Router from 'next/router';
import { T } from '#/components/T/T.component';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/navigation';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default function SelectIngredients() {
  const router = useRouter();
  const { setRecipes, recipes } = useContext<any>(RecipesCtxt);
  const [recipeFound, setRecipeFound] = useState<Recipe>();
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  async function findRecipe(e: any) {
    setIsLoading(true);
    const recipe = await RecipeAPI.generateRecipe(ingredientList);
    setRecipeFound(recipe);
    openModal();
    setIsLoading(false);
  }

  function onClickKeep() {
    const strStoredRecipes = getFromStorage('recipes');
    if (strStoredRecipes && strStoredRecipes !== '{}') {
      const storedRecipes = JSON.parse(strStoredRecipes as any);
      storedRecipes.list.push(recipeFound);
      saveToStorage('recipes', JSON.stringify(storedRecipes));
      setRecipes([...recipes, recipeFound]);
    } else {
      const toSave = {
        list: [recipeFound],
      };
      saveToStorage('recipes', JSON.stringify(toSave));
      setRecipes([...recipes, recipeFound]);
    }
    router.push('/');
  }
  function renderIngredientList() {
    return (
      <List height={'100%'} overflowY="auto">
        {ingredientList.map((ingredient, i) => {
          return (
            <ListItem
              style={{
                backgroundColor: '#F6F8FC',
                alignItems: 'center',
                paddingLeft: 15,
                display: 'flex',
              }}
              key={ingredient + i}
              fontWeight="bold"
              h={70}
              m="15px 0px"
            >
              {ingredient}
            </ListItem>
          );
        })}
      </List>
    );
  }

  const onInputChange = (e: any) => {
    const text = e.target.value;
    const ingredientArray = text.split(',').filter((el: string) => el !== '');
    setIngredientList(ingredientArray);
    setInputValue(text);
  };

  return (
    <Flex direction="column" h="100vh" padding={'50px 30px'}>
      {/*isLoading && <Spinner />*/}
      <Box>
        <HStack justify={'space-evenly'}>
          <ButtonBack />
          <T heading size="lg" id="Choisi tes ingrédients" />
          <div />
        </HStack>
      </Box>
      <Flex height="100%" direction={'column'}>
        <>
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
              placeholder="Oeufs, Farine, Lait, Pépites de chocolats"
              value={inputValue}
              onChange={onInputChange}
            />
            <InputRightElement pt="5">
              <CloseIcon
                onClick={() => {
                  setInputValue('');
                  setIngredientList([]);
                }}
              />
            </InputRightElement>
          </InputGroup>

          {renderIngredientList()}
          <Button
            colorScheme={'purple'}
            rightIcon={<CheckIcon fontSize={25} />}
            h="70"
            isLoading={isLoading}
            variant="solid"
            isDisabled={ingredientList.length < 2}
            onClick={findRecipe}
          >
            On est bon
          </Button>
        </>
      </Flex>
      <ModalRecipe
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        recipe={recipeFound as any}
        footer={
          <>
            <Button colorScheme="purple" mr={3} onClick={onClickKeep}>
              Garder
            </Button>
            <Button
              onClick={() => {
                closeModal();
              }}
              variant="ghost"
            >
              Rejeter
            </Button>
          </>
        }
      />
    </Flex>
  );
}

/*




        */
