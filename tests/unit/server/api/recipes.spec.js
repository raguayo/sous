/* global describe beforeEach it afterEach before */

import axios from "axios";

const { expect } = require("chai");
const request = require("supertest");
// const agentRequest = require("superagent");
const db = require("../../../../server/db");
const app = require("../../../../server");

const {
  Recipe,
  User,
  Ingredient,
  IngredientQuantity,
  PeapodIngredient,
  SavedRecipe,
  GrocerlyListRecipe
} = require("../../../../server/db/models");

// const Recipe = db.model('recipe');
// const Ingredient = db.model('ingredient');

describe("Recipes API", () => {
  afterEach(async () => db.sync({ force: true }));

  describe("/api/recipes", () => {
    describe("/:url", () => {
      describe("POST /:url", () => {
        let agent;
        let recipe;
        before('mock api', async () => {

        });

        beforeEach('create seed data', async () => {
          recipe = await Recipe.create({
            title: "Test Recipe",
            recipeUrl: "testrecipe.com"
          });
          const ingredients = await Promise.all([
            Ingredient.create({ name: "carrots" }),
            Ingredient.create({ name: "celery" })
          ]);
          const prevUser = {
            name: 'Previous User',
            email: 'prev@prev.com',
            password: 'prev'
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
            const res = await agent.post('/api/recipes/chrome')
              .send({
                isFromChromeExt: true,
                recipe: recipe.dataValues,
                inGroceryList: 'false',
              })
              .expect(201);
            expect(res.body).to.be.an("object");
            expect(res.body.savedRecipe).to.be.an("array");
            expect(res.body.savedRecipe).to.be.an("array");
            expect(res.body.savedRecipe[0].title).to.be.equal("Test Recipe");
            expect(res.body.savedRecipe[0].ingredients).to.be.an("array");
            expect(res.body.savedRecipe[0].ingredients[0].name).to.be.equal(
              "carrots" || "celery"
            );
          });
        });

        describe("requests from web app", () => {
          it("posts new recipes");

          it("finds existing recipes", async () => {
            const url = "testrecipe.com";
            const res = await agent.post(`/api/recipes/${url}`).expect(201);
            expect(res.body).to.be.an("object");
            expect(res.body.savedRecipe).to.be.an("array");
            expect(res.body.savedRecipe).to.be.an("array");
            expect(res.body.savedRecipe[0].title).to.be.equal("Test Recipe");
            expect(res.body.savedRecipe[0].ingredients).to.be.an("array");
            expect(res.body.savedRecipe[0].ingredients[0].name).to.be.equal(
              "carrots" || "celery"
            );
          });
        });
      });
    });
  });
});
