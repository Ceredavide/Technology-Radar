const Technology = require("../../models/Technology");
const CATEGORIES = require("../../constants/CATEGORIES")

describe("Technology Model Validation", () => {
    it("should validate a technology with all required fields", () => {
        const techData = {
            name: "Valid Technology Name",
            category: { 
                name: Object.keys(CATEGORIES)[0], 
            },
            description: "Valid description"
        };

        const technology = new Technology(techData);

        const validationError = technology.validateSync();

        expect(validationError).toBeUndefined();
    });

    it("should fail validation when required fields are missing", () => {
        
        const techData = {};

        const technology = new Technology(techData);
        const validationError = technology.validateSync();

        expect(validationError).toBeDefined();
        expect(validationError.errors["name"]).toBeDefined();
        expect(validationError.errors["category.name"]).toBeDefined();
        expect(validationError.errors["description"]).toBeDefined();
    });

});
