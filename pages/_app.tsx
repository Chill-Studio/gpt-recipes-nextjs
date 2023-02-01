import 'styles/globals.css';
import 'styles/font.css';

import { useEffect, useState } from 'react';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import Head from 'next/head';
import { Recipe } from '#/api/openai';
import { RecipesCtxt } from '../contexts/recipes-context';
import { appWithTranslation } from 'next-i18next';
import { getFromStorage } from '#/services/local-storage';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setList();
  }, []);
  const setList = () => {
    const recipesStr = getFromStorage('recipes');
    if (recipesStr && recipesStr !== '{}') {
      const recipes = JSON.parse(recipesStr).list;
      setRecipes(recipes);
    }
  };

  const head = (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
      />
      <meta name="description" content="Description" />
      <meta name="keywords" content="Keywords" />
      <title>Next.js PWA Example</title>

      <link rel="manifest" href="/manifest.json" />
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      <meta name="theme-color" content="#317EFB" />
    </Head>
  );
  return (
    <>
      {head}
      <ColorModeScript initialColorMode={'light'} />
      <ChakraProvider theme={theme}>
        <RecipesCtxt.Provider value={{ recipes, setRecipes } as any}>
          <Component {...pageProps} />
        </RecipesCtxt.Provider>
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
