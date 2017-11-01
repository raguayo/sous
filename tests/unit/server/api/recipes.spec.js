/* global describe beforeEach it before after */

const { expect } = require("chai");
const request = require("supertest");
const sinon = require("sinon");
const app = require("../../../../server");
const mockAxios = require("../../../mockAdapter");
const {
  validateIngredientProperties,
  validateRecipeProperties,
} = require('./utils/validatePost');
const peapodModule = require("../../../../peapod/mapToPeapod");
const {
  Recipe,
  User,
  Ingredient,
  PeapodIngredient,
} = require("../../../../server/db/models");

const sampleAPIData = require("./utils/sampleAPIData");

describe("Recipes API", () => {
  describe("/api/recipes", () => {
    describe("/:url", () => {
      describe("POST /:url", () => {
        let agent;
        let recipe;
        const newRecipeUrl =
        "http://www.melskitchencafe.com/the-best-fudgy-brownies/";
        let stub;
        const formattedUrlForRecipeAPI = newRecipeUrl
        .replace(":", "%3A")
        .replace("/", "%2F");
        const formattedUrlForPost = newRecipeUrl
          .replace(":", "%3A")
          .split("/")
          .join("%2F");

        beforeEach("mock api", () => {
          mockAxios
            .onGet(`/recipes/extract?forceExtraction=false&url=${formattedUrlForRecipeAPI}`)
            .replyOnce(200, sampleAPIData);
        });

        before("stub mapToPeapod", () => {
          const createPeapodIngWrapper = () => {
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
            .callsFake(createPeapodIngWrapper());
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
          it("posts new recipes", async () => {
            const res = await agent
            .post("/api/recipes/chrome")
            .send({
              isFromChromeExt: true,
              recipe: sampleAPIData,
              inGroceryList: "false"
            })
            .expect(201);
            validateRecipeProperties(res, expect);
            validateIngredientProperties(res, expect);
          });

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
            const res = await agent
              .post(`/api/recipes/${formattedUrlForPost}`)
              .expect(201);

            validateRecipeProperties(res, expect);
            validateIngredientProperties(res, expect);
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

        describe("error handling", () => {
          it("responds descriptively if recipe API malfunctions", async () => {
            mockAxios.reset();
            mockAxios
              .onGet(`/recipes/extract?forceExtraction=false&url=${formattedUrlForRecipeAPI}`)
              .networkError();
            const res = await agent.post(`/api/recipes/${formattedUrlForPost}`)
              .expect(500);
            expect(res.error).to.be.an.object;
            expect(res.error.text).to.equal('Network Error');
          });

          it("responds descriptively if peapod API malfunctions", async () => {


            // const res = await agent.post(`/api/recipes/${formattedUrlForPost}`).expect(500);
            // expect(res.error).to.be.an.object;
            // expect(res.error.text).to.equal('Network Error');
          })
        });
      });
    });
  });
});
