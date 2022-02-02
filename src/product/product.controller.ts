import { Body,Controller,Get,Post,Param, ParseIntPipe,Query } from '@nestjs/common';
import { string } from 'joi';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){

    }

    @Get()
    async all(){
        return this.productService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.productService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: ProductDto){
        return this.productService.create(dto);
    }

    // @Get(":name")
    // async getByName(@Param('name') name:string){
    //     return this.productService.getByName(name);
    // }

    // @Get("/find")
    // async getByName(@Body() name:string){
    //     // console.log(`${obj.name}`);
    //     // const nameB:{name:string} =name
    //     return this.productService.getByName(name);
    // }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.productService.getByName(name);
    }

    // @Get()
    // index(
    //     @Query('name') name:string
    // )
    // // async all(@Body() name:any){
    //     {
    //     if (name === null || name === undefined){
    //         return this.productService.all();
    //     }else{
    //         console.log(name);
    //         return this.productService.getByName(name);
    //     }
    // }
}
