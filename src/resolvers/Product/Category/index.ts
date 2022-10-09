import { table_product_category } from 'src/generated/tables';
import { CategoryByIDResolver } from './CategoryByIDResolver';
import { CategoryListResolver } from './CategoryListResolver';
import { CreateCategoryResolver } from './CreateCategoryResolver';
import { UpdateCategoryResolver } from './UpdateCategoryResolver';

export function LoadCategoryParent(id: number, category: table_product_category[]): any {
  return category
    .filter(c => c.parent === id)
    .map((c: table_product_category) => {
      return {
        ...c,
        src: c.image,
        parents: LoadCategoryParent(
          c.id || 0,
          category.filter(x => x.parent !== 0 || x.parent !== id),
        ),
        children: LoadCategoryParent(
          c.id || 0,
          category.filter(x => x.parent !== 0 || x.parent !== id),
        ),
      };
    });
}

export const CategoryResolver = {
  Query: {
    categoryList: CategoryListResolver,
    category: CategoryByIDResolver,
  },
  Mutation: {
    createCategory: CreateCategoryResolver,
    updateCategory: UpdateCategoryResolver,
  },
};
