import { generatedID } from './id';
import { table_product_stock } from './tables';

export function generateSku(color: string[], size: string[], product: any): table_product_stock[] {
  const items: table_product_stock[] = [];

  for (const c of color) {
    for (const s of size) {
      const findImage = (product.picture as any[])
        .filter(x => !x.isMain)
        .find(
          x =>
            (x.color as string).toLowerCase() === c.toLowerCase() &&
            (x.size as string).toLowerCase() === s.toLowerCase(),
        );
      items.push({
        id: findImage ? (findImage.id ? findImage.id : null) : null,
        color: c,
        size: s,
        barcode: findImage
          ? findImage.barcode
            ? findImage.barcode
            : `${product.id}${c
                .trim()
                .charAt(0)
                .toUpperCase()}${s
                .trim()
                .charAt(0)
                .toUpperCase()}${new Date().getTime()}${generatedID(4)}`
          : `${product.id}${c
              .trim()
              .charAt(0)
              .toUpperCase()}${s
              .trim()
              .charAt(0)
              .toUpperCase()}${new Date().getTime()}${generatedID(4)}`,
        image: findImage ? findImage.name : '',
        product_id: product.id,
        stock: findImage ? findImage.stock : 0,
      });
    }
  }

  return items;
}
