const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});
const openai = new OpenAIApi(configuration);
export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}
export class RecipeAPI {
  static async generateRecipe(ingredientList: string[]) {
    const response = (
      await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Créé recette détaillée avec ingrédients entre guillets "${ingredientList.join(
          ',',
        )}".Format json en séparant, le titre dans une clé title, ingrédients dans clé 'ingredients' et les instructions dans clé 'instructions'.`,
        temperature: 0.5,
        max_tokens: 500,
      })
    ).data;

    return JSON.parse(
      response.choices[0].text
        .replace(/(\r\n|\n|\r)/gm, '')
        .trim()
        .replace(/  +/g, ' '),
    ) as Recipe;

    // return "\n\nRecette de gâteau aux oeufs, farine, pépites de chocolat et beurre\n\nIngrédients :\n- 3 oeufs\n- 200 g de farine\n- 100 g de pépites de chocolat\n- 100 g de beurre\n\nPréparation :\n1. Préchauffer le four à 180°C.\n2. Dans un saladier, mélanger le beurre ramolli avec le sucre jusqu'à obtenir une texture crémeuse.\n3. Ajouter les oeufs un à un et mélanger à nouveau.\n4. Ajouter la farine et mélanger jusqu'à ce que la pâte soit homogène.\n5. Ajouter les pépites de chocolat et mélanger à nouveau.\n6. Verser la pâte dans un moule beurré et fariné et enfourner pour 25 minutes.\n7. Une fois cuit, laisser refroidir avant de déguster.";
  }
}
//oeufs,farine,banane, beurre, chocolat,lait
const t = {
  id: 'cmpl-6dLtzc1v0cFip8ugYMQPyjVUqcDSL',
  object: 'text_completion',
  created: 1674837003,
  model: 'text-davinci-003',
  choices: [
    {
      text: '\n\n{\n    "title": "Gâteau banane chocolat",\n    "ingredients": [\n        "2 oeufs",\n        "200g de farine",\n        "2 bananes",\n        "100g de beurre",\n        "100g de chocolat noir",\n        "100ml de lait"\n    ],\n    "instructions": [\n        "Préchauffez votre four à 180°C.",\n        "Écrasez les bananes à l\'aide d\'une fourchette et réservez.",\n        "Dans un saladier, mélangez le beurre et le sucre jusqu\'à obtenir une texture crémeuse.",\n        "Ajoutez les oeufs un à un et mélangez.",\n        "Incorporez la farine et mélangez jusqu\'à obtenir une pâte homogène.",\n        "Ajoutez les bananes écrasées et mélangez.",\n        "Faites fondre le chocolat noir au bain-marie ou au micro-ondes.",\n        "Ajoutez le chocolat fondu à la pâte et mélangez.",\n        "Versez le lait et mélangez jusqu\'à obtenir une pâte homogène.",\n        "Versez la pâte dans un moule à gâteau et enfournez pour 30 minutes.",\n        "Vérifiez la cuisson à l\'aide d\'un couteau.",\n        "Laissez refroidir avant de déguster."\n    ]\n}',
      index: 0,
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 58,
    completion_tokens: 409,
    total_tokens: 467,
  },
};
