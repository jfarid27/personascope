import { find } from 'lodash';
import { generateNodes, generateLinks } from '.';

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
      const expected = [
        { id: 'foo', counts: 1 },
        { id: 'bar', counts: 2 },
        { id: 'cat', counts: 1 },
      ];
      it('should generate a node list with the right ids', () => {
        const ids = result.map(i => i.id);
        const matchingId = node => n => n.id === node.id;
        expected.map(node => expect(ids).toContain(node.id));
        expected.map(node => expect(find(result, matchingId(node)).counts).toBe(node.counts));
        expect(result.length).toBe(3);
      });
    });
  });
  describe('GenerateLinks', () => {
    describe('when given rowData', () => {
      const rowData = [
        { Action: 'foo', SessionID: 1 },
        { Action: 'bar', SessionID: 1 },
        { Action: 'cat', SessionID: 2 },
        { Action: 'bar', SessionID: 2 },
        { Action: 'cat', SessionID: 3 },
        { Action: 'bar', SessionID: 3 },
      ];
      const result = generateLinks(rowData);
      const expected = [
        { source: 'foo', target: 'bar', counts: 1 },
        { source: 'cat', target: 'bar', counts: 2 },
      ];
      it('should generate a node list with the right ids', () => {
        const matchingEdge = edge => n => (n.source === edge.source && n.target === edge.target);
        expected.map(
          edge => expect(
            find(result, matchingEdge(edge)).counts,
          ).toBe(edge.counts),
        );
        expect(result.length).toBe(2);
      });
    });
  });
});
