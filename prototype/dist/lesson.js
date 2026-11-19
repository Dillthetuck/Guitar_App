/* Standard tuning. Rows run from the thinnest string to the thickest. */
(function (root) {
  const names = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  const strings = [
    {name:'high E', open:'E', pitch:4, number:1},
    {name:'B', open:'B', pitch:11, number:2},
    {name:'G', open:'G', pitch:7, number:3},
    {name:'D', open:'D', pitch:2, number:4},
    {name:'A', open:'A', pitch:9, number:5},
    {name:'low E', open:'E', pitch:4, number:6}
  ];
  const order = [5,4,3,2,1,0];
  const note = (row, fret) => names[(strings[row].pitch + fret) % 12];
  const target = row => (12 - strings[row].pitch) % 12;
  const landmark = row => [3,5,7].reduce((best,f) => Math.abs(f-target(row)) < Math.abs(best-target(row)) ? f : best,3);
  const api = {strings,order,note,target,landmark};
  if (typeof module !== 'undefined') module.exports = api;
  root.FretLesson = api;
})(typeof window === 'undefined' ? globalThis : window);
