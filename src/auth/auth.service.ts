import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
  async create(createAuthDto: CreateAuthDto) {
    const checkEmail = await this.authModel.find({
      email: createAuthDto.email
    }).select('-password')

    if (checkEmail) throw new ConflictException('Email is already exist')
    
    const saveUser = await this.authModel.create({
      ...createAuthDto,
      password: await hash(createAuthDto.password, 10)
    })
    return saveUser
  }

  async findAll() {
    const res = await this.authModel.find().select('-password')
    return res
  }

  async findOne(id: any) {
    const user = await this.authModel.findById(id)
    if (!user) return null

    return user
  }

  async update(id: any, updateAuthDto: UpdateAuthDto) {
    const user = await this.authModel.findById(id)
    if (!user) throw new NotFoundException("Update Failed! User not found.")

    const updateUser = await this.authModel.updateOne({ _id: id }, { $set: updateAuthDto })
    return updateUser
  }

  async remove(id: any) {
    const user = await this.authModel.findById(id)
    if (!user) throw new Error('User not found!')

    return this.authModel.deleteOne({_id: id})
  }
}
