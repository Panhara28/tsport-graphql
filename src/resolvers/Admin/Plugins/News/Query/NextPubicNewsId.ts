import ContextType from 'src/graphql/ContextType';

export const NextPublicNewsId = async (_, { prevId }: { prevId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const [query] = await knex.raw(
    `SELECT 
        id AS next_id 
      FROM 
        news 
      WHERE id < :prev_id AND 
      status="PUBLISHED" 
      ORDER BY id DESC LIMIT 1;`,
    { prev_id: prevId },
  );

  return query[0].next_id;
};
