import { Injectable } from "@nestjs/common";
import { Hero } from "./interfaces/hero.interface";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { UpdateHeroDto } from "./dto/update-hero.dto";

@Injectable()
export class HeroService {
    private readonly heroes: Hero[] = [
        {
            id: 1,
            name: "Rizky",
            position: "backend engineer"
        },
    ]

    findAll(): Hero[] {
        return this.heroes
    }

    findOne(id: any) {
        const values = this.heroes.find(hero => hero.id === parseInt(id))
        if (values) return values

        return null
    }

    create(hero: CreateHeroDto) {
        this.heroes.push(hero)
    }

    update(id: any, hero: UpdateHeroDto) {
        let values = this.heroes.find(hero => hero.id === parseInt(id))
        if (values) {
            values.name = hero.name
            values.position = hero.position

            return values
        }

        return null
    }

    delete(id: any) {
        let values = this.heroes.findIndex(hero => hero.id === parseInt(id))

        if (values !== -1) {
            this.heroes.splice(values, 1)
            return 1
        }

        return null
    }
}