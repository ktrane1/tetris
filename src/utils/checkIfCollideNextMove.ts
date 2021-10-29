export default function checkIfCollideNextMove(
  m: number[][],
  startRow: number,
  startColumn: number
) {
  const rowLen = m.length;
  const columnLen = m[0].length;
  const mClone = m.map((s) => s.slice());
  let result = false;

  const checkBelow = (r: number, c: number) => {
    if (!mClone[r]) return;
    if (!mClone[r][c]) return;
    if (r < 0 || r >= rowLen) return;
    if (c < 0 || c >= columnLen) return;
    if (mClone[r][c] === 0) return;
    if (mClone[r][c] === 2) return;

    if (r + 1 >= rowLen || m[r + 1][c] === 2) {
      result = true;
    }
    mClone[r][c] = 0;

    checkBelow(r + 1, c);
    checkBelow(r - 1, c);
    checkBelow(r, c + 1);
    checkBelow(r, c - 1);
    return;
  };

  checkBelow(startRow, startColumn);
  return result;
}
