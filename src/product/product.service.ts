import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) 
        private readonly productRepository: Repository<ProductEntity>,
    ){}

    async all(): Promise<ProductEntity[]>{ 
        const list = await this.productRepository.find();
        if(!list.length){
            throw new NotFoundException({message: "la lista esta vacia"});
        }
        return list;
    }

    async getOne(id: number): Promise<ProductEntity>{
        const producto = await this.productRepository.findOne(id);
        if(producto){
            throw new NotFoundException({message: "No existe el producto"});
        }
        return producto;
    }

    async create(dto: ProductDto): Promise<any>{
        const producto = this.productRepository.create(dto);
        await this.productRepository.save(producto);
        return {message: "producto creado"};
    }
}

