import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
  async create(createAuthDto: CreateAuthDto) {
    const user = new this.authModel(createAuthDto)
    return user.save()
  }

  async findAll(): Promise<Auth[]> {
    const res = await this.authModel.find()
    return res
  }

  async findOne(id: any) {
    const user = await this.authModel.findById(id)
    if (!user) return null

    return user
  }

  async update(id: any, updateAuthDto: UpdateAuthDto) {
    const user = await this.authModel.findById(id)
    if (!user) throw new Error("Update Failed! User not found.")

    const updateUser = await this.authModel.updateOne({ _id: id }, { $set: updateAuthDto })
    return updateUser
  }

  async remove(id: any) {
    const user = await this.authModel.findById(id)
    if (!user) throw new Error('User not found!')

    return this.authModel.deleteOne({_id: id})
  }
}
