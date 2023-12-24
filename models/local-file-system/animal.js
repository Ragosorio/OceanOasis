import { randomUUID } from 'node:crypto';
import { readJSON } from "../../utils/utils.js"

const animals = readJSON("../animals.json")

export class AnimalModel {
    static async getAll({ genre }) {
        if (genre) {
            return animals.filter(
                animal => animal.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return animals
    }

    static async getById({ id }) {
        const animal = animals.find(animal => animal.id === id)
        return animal
    }

    static async create({ input }) {
        const newAnimal = {
            id: randomUUID(),
            ...input
        }

        animals.push(newAnimal)
        return newAnimal
    }

    static async delete({ id }) {
        const animalIndex = animals.findIndex(animal => animal.id === id)

        if (animalIndex === -1) return false

        animals.splice(animalIndex, 1)
        return true
    }

    static async update({ id, input }) {
        const animalIndex = animals.findIndex(animal => animal.id === id)

        if (animalIndex === -1) return false

        animals[animalIndex] = {
            ...animals[animalIndex],
            ...input
        }

        return animals[animalIndex]
    }
}