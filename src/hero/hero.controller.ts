import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Redirect, Req, Res } from "@nestjs/common";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { UpdateHeroDto } from "./dto/update-hero.dto";
import { HeroService } from "./hero.service";
import { Hero } from "./interfaces/hero.interface";

let heroes = [
    {
        id: 1,
        name: "Rizky",
        position: "backend engineer"
    },
]

@Controller("hero")
export class HeroController {
    constructor(private heroService: HeroService) { }
    
    @Get("index")
    @HttpCode(200)
    async index(@Res() response) {
        response.json({
            message: 'Data ditemukan',
            data: this.heroService.findAll()
        })
    }

    @Get("index/:id")
    @HttpCode(200)
    async show(@Param('id') id: any, @Res() res) {
        try {
            return res.json({
                message: "OK",
                data: this.heroService.findOne(id)
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    @Post("store")
    @Header("Content-Type", "application/json")
    @HttpCode(201)
    async store(@Req() req, @Body() createHeroDto: CreateHeroDto, @Res({ passthrough: true }) res) {
        this.heroService.create(createHeroDto)
        res.json(createHeroDto)
    }

    @Put("update/:id")
    @Header("Content-Type", "application/json")
    @HttpCode(201)
    async update(@Param('id') id: any, @Body() updateHeroDto: UpdateHeroDto, @Res() res) {
        this.heroService.update(id, updateHeroDto)
        return res.json({ message: 'OK', data: updateHeroDto })
    }

    @Delete("delete/:id")
    @HttpCode(200)
    async delete(@Param('id') id: any, @Res() res) {
        this.heroService.delete(id)
        res.json({
            message: "OK",
            deleteCount: 1
        })
    }

    @Get("docs")
    @Redirect("https://docs.nestjs.com/")
    docs(@Res() res) {
        res.status(301)
    }
}