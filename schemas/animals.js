import z from 'zod';

const animalSchema = z.object({
    name: z.string({
        invalid_type_error: 'Animal name must be a string',
        required_error: 'Animal name is required.'
    }),
    genre: z.array(
        z.enum(['Mamífero', 'Vivíparo']),
        {
            required_error: 'Animal genre is required.',
            invalid_type_error: 'Animal genre must be an array of enum Genre'
        }
    ),
    scientific_name: z.string(),
    sex_determination: z.string(),
    habitat: z.string(),
    diet: z.string(),
    average_lifespan: z.string(),
    conservation_status: z.string(),
    geographic_range: z.string(),
    behavior: z.string(),
    physical_characteristics: z.object({
        size: z.string(),
        weight: z.string(),
        color: z.string()
    }),
    reproduction: z.object({
        gestation_period: z.string(),
        average_birth_size: z.string(),
        reproductive_maturity: z.string()
    }),
    interesting_facts: z.array(z.string()),
    image: z.string().url({
        message: 'Image must be a valid URL'
    })
})

export function validateAnimal(input) {
    return animalSchema.safeParse(input)
}

export function validateParcialAnimal(input) {
    return animalSchema.partial().safeParse(input)
}