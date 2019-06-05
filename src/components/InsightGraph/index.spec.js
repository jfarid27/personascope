import { generateNodes } from '.';

describe('Insight Graph', () => {
  describe('GenerateNodes', () => {
    describe('when given rowData', () => {
      const rowData = [
        { Action: 'foo', SessionID: 1 },
        { Action: 'bar', SessionID: 1 },
        { Action: 'cat', SessionID: 2 },
        { Action: 'bar', SessionID: 2 },
      ];
      const result = generateNodes(rowData);
      it('should generate a node list with the right ids', () => {
        const ids = result.map(i => i.id);
        const expected = ['foo', 'bar', 'cat'];
        expected.map(id => expect(ids).toContain(id));
        expect(ids.length).toBe(3);
      });
    });
  });
});
