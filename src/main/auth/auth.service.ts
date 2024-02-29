import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const saveUser = await this.authModel
      .create({
        ...createAuthDto,
        password: await bcrypt.hash(createAuthDto.password, 10),
      })
      .catch((err) => {
        throw new ConflictException('Email sudah terdaftar');
      });

    return saveUser;
  }

  async findAll() {
    const res = await this.authModel.find().select('-password');
    return res;
  }

  async findOne(id: any) {
    const user = await this.authModel.findById(id);
    if (!user) return null;

    return user;
  }

  async update(id: any, updateAuthDto: UpdateAuthDto) {
    const user = await this.authModel.findById(id);
    if (!user) throw new NotFoundException('Update Failed! User not found.');

    const updateUser = await this.authModel.updateOne(
      { _id: id },
      { $set: updateAuthDto },
    );
    return updateUser;
  }

  async remove(id: any) {
    const user = await this.authModel.findById(id);
    if (!user) throw new Error('User not found!');

    return this.authModel.deleteOne({ _id: id });
  }

  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.authModel.find({ email: signInDto.email });
    if (user[0] === undefined)
      throw new UnauthorizedException('Email atau password salah');

    const isMatch = await bcrypt.compare(signInDto.password, user[0].password);
    if (!isMatch) throw new UnauthorizedException('Email atau Password salah');

    const payload = { sub: user[0]._id, email: user[0].email };
    const token = await this.jwtService.signAsync(payload);
    //send data to ws gateway
    // this.eventsGateway.onNotifyLogin(payload)

    return token;
  }
}
