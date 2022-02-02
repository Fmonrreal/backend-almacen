import { Injectable, NotFoundException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Like, Repository } from 'typeorm';
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

    // async getOne(id: number): Promise<ProductEntity>{
    //     const producto = await this.productRepository.findOne(id);
    //     if(!producto){
    //         throw new NotFoundException({message: "No existe el producto"});
    //     }
    //     return producto;
    // }

    // async getByName(name: string): Promise<ProductEntity[]>{
    //     const listByName = await this.productRepository.find({where: {name: Like(`%${name}%`)}});
    //     console.log(name);
    //     console.log(listByName);
    //     if(!listByName.length){
    //         throw new NotFoundException({message: "No existe el producto"});
    //     }
    //     return listByName;
    // }

    async getByName(name): Promise<ProductEntity[]>{
        const nameB = name;
        // const name2 =nameB.name;
        // const obj = JSON.parse(name)
        const listByName = await this.productRepository.find({where: {name: Like(`%${nameB.name}%`)}});
        console.log(name);
        // console.log(nameB.name);
        // console.log(listByName);
        if(!listByName.length){
            throw new NotFoundException({message: "No existe el producto"});
        }
        return listByName;
    }

    async create(dto: ProductDto): Promise<any>{
        const producto = this.productRepository.create(dto);
        try{
            await this.productRepository.save(producto);
            return {message: "producto creado"};
        }catch (error) {
                // check error.code
                console.log(error.code);
                if (error.code === 'ER_DUP_ENTRY') {
                  throw new ConflictException('EL nombre del producto ya existe');
                }
                throw new InternalServerErrorException(
                  error
                );
              }
    }
}

// try {
//     await this.save(user);
//   } catch (error) {
//     // check error.code
//     console.log(error.code);
//     if (error.code === 'ER_DUP_ENTRY') {
//       throw new ConflictException('Email already exists');
//     }
//     throw new InternalServerErrorException(
//       error
//     );
//   }