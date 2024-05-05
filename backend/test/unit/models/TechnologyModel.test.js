const mongoose = require('mongoose');
const Technology = require('../../../models/Technology');

describe('Technology Model Validation', () => {
  it('requires name field', async () => {
    const techWithoutName = new Technology({
      description: 'Some description',
      category: 'Backend',
      ring: 'Adopt',
    });
    await expect(techWithoutName.validate()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('requires description field', async () => {
    const techWithoutDescription = new Technology({
      name: 'React',
      category: 'Frontend',
      ring: 'Adopt',
    });
    await expect(techWithoutDescription.validate()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('checks for valid category against enum values', async () => {
    const techWithInvalidCategory = new Technology({
      name: 'Vue.js',
      description: 'A progressive JavaScript framework',
      category: 'InvalidCategory',
      ring: 'Adopt',
    });
    await expect(techWithInvalidCategory.validate()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('allows empty ring but validates if provided', async () => {
    const techWithNoRing = new Technology({
      name: 'Angular',
      description: 'A platform for building mobile and desktop web applications.',
      category: 'Tools',
      user: '60f0f6f6d1a8f1e3f8b1c7b9',
    });

    const techWithInvalidRing = new Technology({
      name: 'Svelte',
      description: 'Cybernetically enhanced web apps.',
      category: 'Frontend',
      ring: 'Unknown'
    });

    await expect(techWithNoRing.validate()).resolves.not.toThrow();
    await expect(techWithInvalidRing.validate()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});
