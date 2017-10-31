import {
  findOrCreateIngredientsAndAssociations,
} from '../utils/postRecipeHelpers';

const router = require("express").Router();
const axios = require("axios");
const { Recipe, SavedRecipe } = require("../db/models");
const Promise = require("bluebird");

module.exports = router;

router.param("url", async (req, res, next, url) => {
  if (url === "chrome") {
    req.recipe = req.body.recipe;
    req.inGroceryList = req.body.inGroceryList === "true";
    next();
  } else {
    try {
      let recipe = await Recipe.findOne({ where: { recipeUrl: url } });
      if (!recipe) {
        const formattedUrl = url.replace(":", "%3A").replace("/", "%2F");
        const apiResponse = await axios.get(
          `/recipes/extract?forceExtraction=false&url=${formattedUrl}`,
          {
            baseURL: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com",
            headers: { "X-Mashape-Key": process.env.RECIPE_API_KEY }
          },
        );
        recipe = apiResponse.data;
      }
      req.recipe = recipe;
      next();
    } catch (err) {
      next(err);
    }
  }
});

router.get("/", (req, res, next) => {
  req.user
    .getSavedRecipes()
    .then(recipesWithFlag => res.json(recipesWithFlag))
    .catch(next);
});

router.get("/:url", (req, res, next) => {
  res.json(req.recipe);
});

router.post("/:url", async (req, res, next) => {
  const inGroceryList = req.inGroceryList ? req.inGroceryList : true;
  let ingredientAssc = null;

  try {
    if (req.recipe.extendedIngredients) {
      // if the recipe is from the API, then we need to add it to the database
      const { title, sourceUrl, imageUrls, servings } = req.recipe;
      const newRecipe = await Recipe.create({
        recipeUrl: sourceUrl,
        title,
        imageUrl: imageUrls[0],
        numServings: servings
      });

      // Find or create the ingredients and relevant associations
      ingredientAssc = findOrCreateIngredientsAndAssociations(
        req,
        next,
        req.recipe.extendedIngredients,
        newRecipe,
      );

      // And set req.recipe to the created recipe instance
      req.recipe = newRecipe;
    }

    // Make the associations with the user
    const savedRecipeAssc = req.user.addSavedRecipe(req.recipe.id);
    const groceryListAssc = inGroceryList ?
      req.user.addGroceryListRecipe(req.recipe.id) :
      null;

    // Ensure all the associations finish before proceeding
    await Promise.all([ingredientAssc, savedRecipeAssc, groceryListAssc]);

    // Get the recipes with all the association information included
    const [savedRecipe, groceryListRecipe] = await Promise.all([
      req.user.getSavedRecipes(),
      inGroceryList ? req.user.getGroceryListRecipes() : null,
    ]);

    // Respond with eagerly loaded recipe json
    res.status(201).json({ savedRecipe, groceryListRecipe });
  } catch (err) {
    next(err);
  }
});

router.put("/:id/favorite", (req, res, next) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  SavedRecipe.findOne({ where: { userId, recipeId } })
    .then((recipe) => {
      if (recipe.isFavorite) {
        return recipe.update({ isFavorite: false });
      }
      return recipe.update({ isFavorite: true });
    })
    .then(() => req.user.getSavedRecipes({ where: { id: recipeId } }))
    .then((recipe) => {
      res.json(recipe[0]);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        next(new Error("Recipe not found"));
      }
      return recipe.update(req.body);
    })
    .then(updatedRecipe => res.send(updatedRecipe))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  req.user
    .removeSavedRecipe(req.params.id)
    .then(() => req.user.removeGroceryListRecipe(req.params.id))
    .then(() => res.sendStatus(204))
    .catch(next);
});
