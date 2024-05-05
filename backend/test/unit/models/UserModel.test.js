const User = require("../../../models/User");

describe("User Model Validation", () => {
    it("should validate a user with all required fields", () => {
        const userData = {
            email: "test@backend.ch",
            password: "password",
            company: "HSLU"
        };

        const user = new User(userData);

        const validationError = user.validateSync();

        expect(validationError).toBeUndefined();
    });

    it("should generate an error when required fields are missing", () => {
        const userData = {
        };

        const user = new User(userData);

        const validationError = user.validateSync();

        expect(validationError).toBeDefined();
        expect(validationError.errors["email"]).toBeDefined();
        expect(validationError.errors["password"]).toBeDefined();
    });
});
