/* global describe beforeEach it afterEach before after assert */

import mockAxios from "../../../mockAdapter";
import * as peapodModule from "../../../../peapod/mapToPeapod";

const { expect } = require("chai");
const request = require("supertest");
const sinon = require("sinon");
const db = require("../../../../server/db");
const app = require("../../../../server");

const {
  Recipe,
  User,
  Ingredient,
  PeapodIngredient,
} = require("../../../../server/db/models");

const sampleAPIData = require("./sampleAPIData");

describe("Recipes API", () => {
  afterEach(async () => db.sync({ force: true }));

  describe("/api/recipes", () => {
    describe("/:url", () => {
      describe("POST /:url", () => {
        let agent;
        let recipe;
        const newRecipeUrl =
          "http://www.melskitchencafe.com/the-best-fudgy-brownies/";
        let stub;

        before("mock api", () => {
          const formattedUrl = newRecipeUrl
            .replace(":", "%3A")
            .replace("/", "%2F");
          mockAxios
            .onGet(`/recipes/extract?forceExtraction=false&url=${formattedUrl}`)
            .reply(200, sampleAPIData);
        });

        before("stub mapToPeapod", () => {
          const incrementIdWrapper = () => {
            let counter = 0;
            return () => {
              counter += 1;
              return PeapodIngredient.findOrCreate({
                where: {
                  prodId: counter
                },
                defaults: {
                  name: "test",
                  price: 2.2,
                  size: 12
                }
              });
            };
          };
          stub = sinon
            .stub(peapodModule, "mapToPeapod")
            .callsFake(incrementIdWrapper());
        });

        after("restore stub", () => {
          stub.restore();
        });

        beforeEach("create seed data", async () => {
          recipe = await Recipe.create({
            title: "Test Recipe",
            recipeUrl: "testrecipe.com"
          });
          const ingredients = await Promise.all([
            Ingredient.create({ name: "carrots" }),
            Ingredient.create({ name: "celery" })
          ]);
          const prevUser = {
            name: "Previous User",
            email: "prev@prev.com",
            password: "prev"
          };
          const loggedInUser = {
            name: "Tester McTestson",
            email: "tester@test.com",
            password: "test"
          };
          const createdPrevUser = await User.create(prevUser);
          await User.create(loggedInUser);
          await recipe.addIngredients(ingredients);
          await createdPrevUser.addSavedRecipe(recipe);
          agent = request.agent(app);
          return agent.post("/auth/login").send(loggedInUser);
        });

        describe("requests from chrome extension", () => {
          it("posts new recipes");

          it("finds existing recipes", async () => {
            const res = await agent
              .post("/api/recipes/chrome")
              .send({
                isFromChromeExt: true,
                recipe: recipe.dataValues,
                inGroceryList: "false"
              })
              .expect(201);
            expect(res.body).to.be.an("object");
            expect(res.body.savedRecipe).to.be.an("array");
            expect(res.body.savedRecipe).to.be.an("array");
            expect(res.body.savedRecipe[0].title).to.be.equal("Test Recipe");
            expect(res.body.savedRecipe[0].ingredients).to.be.an("array");
            expect(res.body.savedRecipe[0].ingredients[0].name).to.be.oneOf([
              "carrots",
              "celery"
            ]);
          });
        });

        describe("requests from web app", () => {
          it("posts new recipes", async () => {
            const formattedUrl = newRecipeUrl
              .replace(":", "%3A")
              .split("/")
              .join("%2F");
            const res = await agent
              .post(`/api/recipes/${formattedUrl}`)
              .expect(201);

            // SETUP RECIPES
            expect(res.body).to.be.an("object");
            expect(res.body.savedRecipe).to.be.an("array");
            const recipeFromPost = res.body.savedRecipe[0];

            // expect recipe information
            expect(recipeFromPost.title).to.include("Fudgy Brownies");

            // expect savedrecipeFromPost join information
            expect(recipeFromPost.savedrecipe).to.be.an("object");
            expect(recipeFromPost.savedrecipe.isFavorite).to.equal(null);
            expect(recipeFromPost.savedrecipe.userId).to.equal(2);
            expect(recipeFromPost.savedrecipe.recipeId).to.equal(2);

            // SETUP INGREDIENTS
            expect(recipeFromPost.ingredients).to.be.an("array");
            expect(recipeFromPost.ingredients[0]).to.be.an("object");
            const ingredientFromPost = recipeFromPost.ingredients[0];

            // expect eager loading ingredient and peapodIngredient information
            expect(ingredientFromPost.name).to.equal("butter");
            expect(typeof ingredientFromPost.peapodIngredient).to.equal(
              "object"
            );
            expect(ingredientFromPost.peapodIngredient.name).to.equal("test");

            // expect quantity join information
            expect(ingredientFromPost.ingredientQuantity).to.be.an("object");
            expect(ingredientFromPost.ingredientQuantity.quantity).to.equal(10);
            expect(ingredientFromPost.ingredientQuantity.recipeId).to.equal(2);
            expect(ingredientFromPost.ingredientQuantity.ingredientId).to.equal(3);
          });

          it("finds existing recipes", async () => {
            const url = "testrecipe.com";
            const res = await agent.post(`/api/recipes/${url}`).expect(201);
            expect(res.body).to.be.an("object");
            expect(res.body.savedRecipe).to.be.an("array");
            expect(res.body.savedRecipe[0].title).to.be.equal("Test Recipe");
            expect(res.body.savedRecipe[0].ingredients).to.be.an("array");
            expect(res.body.savedRecipe[0].ingredients[0].name).to.be.oneOf([
              "carrots",
              "celery"
            ]);
          });
        });
      });
    });
  });
});
