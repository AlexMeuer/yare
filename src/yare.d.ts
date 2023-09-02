type Shape = "circles" | "squares" | "triangles";
type Vector = [number, number];

declare class Entity {
  readonly id: string;
  readonly position: Vector;
  readonly energy: number;
  readonly energy_capacity: number;
}

declare class Structure extends Entity {
  readonly size: number;
  readonly collision_radius: number;
  readonly structure_type: "base" | "outpost" | "star";
}

declare class Base extends Structure {
  readonly structure_type: "base";
  readonly shape: Shape;
  readonly control: string;
  readonly sight: {
    readonly friends_beamable: string[];
    readonly enemies_beamable: string[];
    readonly friends: string[];
    readonly enemies: string[];
    readonly structures: string[];
  };
  readonly hp: 0 | 1;
  readonly color: string; //"rgba(128,140,255,1)" etc
  readonly current_spirit_cost: number;
}

declare class Outpost extends Structure {
  readonly structure_type: "outpost";
  readonly control: string;
  readonly range: number;
  readonly last_energized: string;
  readonly sight: {
    readonly enemies: string[];
  };
}

declare class Star extends Structure {
  readonly structure_type: "star";
  readonly last_energized: string;
  readonly active_in: number; //?
  readonly active_out: number; //?
}

declare class Spirit extends Entity {
  readonly player_id: string;
  readonly shape: Shape;
  readonly size: number;
  readonly last_energized: string;
  readonly color: string; //"rgba(128,140,255,1)" etc.
  readonly mark: string;
  readonly sight: {
    readonly friends_beamable: string[];
    readonly enemies_beamable: string[];
    readonly friends: string[];
    readonly enemies: string[];
    readonly structures: string[];
  };
  readonly merged: string[];
  readonly qcollisions: string[]; //?
  readonly hp: 0 | 1;
  readonly move_speed: number; //might be a multiple of 20? starts at 1

  set_mark(mark: string): void;
  shout(message: string): void;
  move(destination: Vector): void;
  energize(target: Entity | string): void;
  merge(target: Spirit): void;
  // divide(): void;
  jump(target: Vector): void;
  // explode(): void;
}

declare class SquareSpirit extends Spirit {
  lock(): void;
  unlock(): void;
}

declare class Graphics {
  set style(style: string);
  set linewidth(width: number);
  line(start: Vector, end: Vector): void;
  circle(position: Vector, radius: number): void;
  rect(topLeft: Vector, bottomRight: Vector): void;
}

declare const memory: Record<string, unknown>;
declare const spirits: Record<string, Spirit>;
declare const my_spirits: Spirit[];
declare const stars: Record<string, Star>;
declare const star_a2c: Star;
declare const star_p89: Star;
declare const star_zxq: Star;
declare const star_nua: Star;
declare const bases: Record<string, Base>;
declare const outposts: Record<string, Outpost>;
declare const outpost: Outpost;
declare const outpost_mdo: Outpost;
declare const this_player_id: string;
declare const base_zxq: Base;
declare const base_a2c: Base;
declare const base_p89: Base;
declare const base_nua: Base;
declare const players: {
  readonly p1: string;
  readonly p2: string;
};
declare const tick: number;
declare const graphics: Graphics;
