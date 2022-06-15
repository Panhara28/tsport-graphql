export async function buildTree(data: any, id?: number, docs?: any) {
  const documents = [
    { id: 1, title: 'Title 1', document_category_id: 1 },
    { id: 2, title: 'Title 2', document_category_id: 2 },
  ];
  const hash: { [key: number]: any } = {
    0: {
      id: 0,
      category_name: 'data',
      documents: [],
      children: [],
    },
  };

  // Create all the hash
  for (const item of data) {
    const node: any = {
      id: item?.id,
      category_name: item?.category_name as string,
      documents: [],
      children: [],
    };
    hash[item.id] = node;
  }

  // Attach all the children
  for (const item of data) {
    if (item.parent_id) {
      if (hash[item.parent_id]) {
        const d = await docs.load(item.id);

        hash[item.id]?.documents.push(d);

        hash[item.parent_id]?.documents.push(d[0]);

        hash[item.parent_id].children.push(hash[item.id]);
      }
    } else {
      const d = await docs.load(item.id);

      hash[0].children.push(hash[item.id]);

      d.filter(x => x.document_category_id === item.id).map(x => {
        hash[item.id].documents.push(x);
      });
    }
  }

  // buildPath("", hash[0].children);

  if (id) {
    return hash[id];
  }

  return hash[0];
}
