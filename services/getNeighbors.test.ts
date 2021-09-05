import type {
  BoardType,
  Row,
} from '../types/Board.types.ts';
import { assertEquals  } from "https://deno.land/std/testing/asserts.ts";
import { getNeighbors,getNeighborsAlive } from './getNeighbors.ts';
Deno.test('getNeighbors', () => {
  const board: BoardType = [
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ];

  const neighbors: Row = getNeighbors(board, [0, 1]);

  assertEquals(getNeighborsAlive(neighbors), 1);
});

Deno.test('getNeighbors', () => {
    const board: BoardType = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];

    const neighbors: Row = getNeighbors(board, [1, 1]);

    assertEquals(getNeighborsAlive(neighbors), 2);
  });

Deno.test('getNeighbors', () => {
    const board: BoardType = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];

    const neighbors: Row = getNeighbors(board, [2, 1]);


    assertEquals(getNeighborsAlive(neighbors), 1);
  });