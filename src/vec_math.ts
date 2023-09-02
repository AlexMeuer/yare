/** Simple function for comparing distances */
export const dist_sq = (coor1: Vector, coor2: Vector): number => {
  let a = coor1[0] - coor2[0];
  let b = coor1[1] - coor2[1];
  return a * a + b * b;
};

export const dist = (coor1: Vector, coor2: Vector): number => {
  return Math.sqrt(dist_sq(coor1, coor2));
};

export const sum = (coor1: Vector, coor2: Vector): Vector => {
  return [coor1[0] + coor2[0], coor1[1] + coor2[1]];
};

export const diff = (coor1: Vector, coor2: Vector): Vector => {
  return [coor1[0] - coor2[0], coor1[1] - coor2[1]];
};

export const norm = (coor: Vector): Vector => {
  const mag = Math.sqrt(coor[0] * coor[0] + coor[1] * coor[1]);
  return [coor[0] / mag, coor[1] / mag];
};

export const scale = (coor: Vector, scalar: number): Vector => {
  return [coor[0] * scalar, coor[1] * scalar];
};

export const midpoint = (coor1: Vector, coor2: Vector): Vector => {
  return [(coor1[0] + coor2[0]) / 2, (coor1[1] + coor2[1]) / 2];
};
