import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  Header,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Header('Content-Type', 'application/json')
  async create(@Body() createAuthDto: CreateAuthDto, @Res() res) {
    return this.authService.create(createAuthDto).then((ok) => {
      return res.status(201).json({
        ok
      })
    }).catch((err) => {
      return res.status(400).json({
        message: 'Email is already exist'
      })
    })
  }

  @Get()
  @HttpCode(200)
  async findAll(@Res() res) {
    const users = await this.authService.findAll();
    return res.json({
      message: 'OK',
      data: users,
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: any, @Res() res) {
    try {
      const result = await this.authService.findOne(id)
      return res.json({
        message: "OK",
        data: result
      })
    } catch (error) {
      res.json({
        message: error.message
      })
    }
  }

  @Patch('update/:id')
  @Header("Content-Type", "application/json")
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto, @Res() res) {
    try {
      const response = await this.authService.update(id, updateAuthDto)
      res.json({
        message: 'OK',
        updateCount: response.modifiedCount
      })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const response = await this.authService.remove(id)
      res.json({
        message: "OK",
        deleteCount: response.deletedCount
      })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}
