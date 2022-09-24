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
            (x.color as string).trim().toLowerCase() === c.trim().toLowerCase() &&
            (x.size as string).trim().toLowerCase() === s.trim().toLowerCase(),
        );
      items.push({
        id: findImage ? (findImage.id ? findImage.id : null) : null,
        color: c.trim(),
        size: s.trim(),
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
        qty: findImage ? findImage.qty : 0,
      });
    }
  }

  return items;
}
