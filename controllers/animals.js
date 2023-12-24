import { validateAnimal, validateParcialAnimal } from '../schemas/animals.js';
import { AnimalModel } from "../models/local-file-system/animal.js";

export class AnimalController {
    static async getAll(req, res) {
        const { genre } = req.query
        const animals = await AnimalModel.getAll({ genre })

        res.json(animals)
    }
    static async getById(req, res) {
        const { id } = req.params
        const animal = await AnimalModel.getById({ id })
        if (animal) return res.json(animal)
        res.status(404).json({ message: "Animal not Found" })
    }
    static async create(req, res) {
        const result = validateAnimal(req.body)

        if (!result.success) {
            return res.status(422).json({ error: JSON.parse(result.error.message) })
        }

        const newAnimal = await AnimalModel.create({ input: result.data })

        res.status(201).json(newAnimal)
    }
    static async delete(req, res) {
        const { id } = req.params

        const result = await AnimalModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: "Animal not found" })
        }

        return res.json({ message: "Animal deleted" })
    }
    static async update(req, res) {
        const result = validateParcialAnimal(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updatedAnimal = await AnimalModel.update({ id, input: result.data })

        return res.json(updatedAnimal)
    }
}