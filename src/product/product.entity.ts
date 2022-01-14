import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity("producto")
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 10,nullable: false, unique:true})
    name: string;

    @Column({type: 'float',nullable: false, unique:false})
    precio: number;
}