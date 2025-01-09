import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Menu } from "./entities/menu.entity";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {}
  // Method to Add a new Menu
  create(menuData: Partial<Menu>): Promise<Menu> {
    const menu = this.menuRepository.create(menuData);
    return this.menuRepository.save(menu);
  }
 // Method to fetch all Menus
  findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }
  //Method to find a screens by their role
  findByRole(role: string) {
    return this.menuRepository.findOne({ where: { role } });
  }
}
