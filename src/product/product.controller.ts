import { Body,Controller,Get,Post,Param, ParseIntPipe } from '@nestjs/common';
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

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.productService.getOne(id);
    }

    @Post()
    async create(@Body() dto: ProductDto){
        return this.productService.create(dto);
    }    
}
