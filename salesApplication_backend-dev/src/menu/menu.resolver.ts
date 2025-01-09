import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { MenuService } from "./menu.service";
import { MenuType } from "./dto/menu.dto";

@Resolver("Menu")
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  // Query to fetch all menus
  @Query(() => [MenuType])
  async getMenu() {
    try {
      const menuResult = [];
      const getMenu = await this.menuService.findAll();
      if (getMenu.length != 0 || getMenu.length != null) {
        getMenu.forEach((element) => {
          menuResult.push({
            menuId: element.menuId ? element.menuId : "",
            role: element.role ? element.role : "",
            screens: element.screens ? element.screens : "",
          });
        });
      }
      return menuResult;
    } catch (error) {
      return error;
    }
  }

  // Query to fetch a particular menu by their role
  @Query(() => MenuType)
  getScreenByRole(@Args("role") role: string) {
    try {
      return this.menuService.findByRole(role);
    } catch (error) {
      return error;
    }
  }

  // Mutation to add a new menu
  @Mutation(() => MenuType)
  async createMenu(
    @Args("role") role: string,
    @Args("screens") screens: string
  ) {
    try {
      return this.menuService.create({
        role,
        screens,
      });
    } catch (error) {
      return error;
    }
  }
}
