import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  @HttpCode(200)
  async index(@Res() response) {
    const result = await this.heroService.findAll();
    return response.json({
      message: 'Data ditemukan',
      data: result,
    });
  }

  @Get(':id')
  @HttpCode(200)
  async show(@Param('id') id: any, @Res() res) {
    try {
      const response = await this.heroService.findOne(id);
      return res.json({
        message: 'OK',
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  @Post('store')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async store(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Put('update/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async update(
    @Param('id') id: any,
    @Body() updateHeroDto: UpdateHeroDto,
    @Res() res,
  ) {
    await this.heroService.update(id, updateHeroDto).then((ok) => {
      return res.json({
        message: 'OK',
        updateCount: ok.modifiedCount,
      });
    });
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async delete(@Param('id') id: any, @Res() res) {
    await this.heroService.delete(id).then((ok) => {
      return res.json({
        message: 'OK',
        deleteCount: ok,
      });
    });
  }
}
