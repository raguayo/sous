/* global beforeEach afterEach */

const db = require("../server/db");

beforeEach(async () => db.sync());

afterEach(async () => db.sync({ force: true }));
