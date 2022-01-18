export const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    order: { type: 'number' },
    userId: { type: ['string', 'null'], default: null },
    boardId: { type: 'string' },
    columnId: { type: 'string', nullable: true, default: null },
  },
};
