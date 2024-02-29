import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './schemas/hero.schema';

@Injectable()
export class HeroService {
  constructor(@InjectModel(Hero.name) private heroModel: Model<Hero>) {}

  async findAll(): Promise<Hero[]> {
    const res = await this.heroModel.find();
    return res;
  }

  async findOne(id: any): Promise<Hero> {
    const res = await this.heroModel.findById(id);
    if (res) return res;

    return null;
  }

  create(hero: CreateHeroDto) {
    const createHero = new this.heroModel(hero);
    return createHero.save();
  }

  async update(id: any, hero: UpdateHeroDto) {
    let values = await this.heroModel.findById(id);
    if (values) {
      const value = await this.heroModel.updateOne({ _id: id }, { $set: hero });
      return value;
    }

    return null;
  }

  async delete(id: any) {
    let values = await this.heroModel.findById(id);

    if (values) {
      const deleteValue = await this.heroModel.deleteOne({ _id: id });
      return deleteValue;
    }

    return null;
  }
}
