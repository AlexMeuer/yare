import { diff, dist, dist_sq, midpoint, norm, scale, sum } from "./vec_math";

// Marking whether my base is at the top starting position or bottom
var my_base = base_zxq;
var enemy_base = base_a2c;
var my_star = star_zxq;
var enemy_star = star_a2c;

if (base_a2c.control == this_player_id) {
  my_base = base_a2c;
  enemy_base = base_zxq;
}

if (
  dist_sq(star_a2c.position, my_base.position) <
  dist_sq(star_zxq.position, my_base.position)
) {
  my_star = star_a2c;
  enemy_star = star_zxq;
}

const dumbHarvestBehaviour = (spirit: Spirit) => {
  if (spirit.energy === spirit.energy_capacity) {
    spirit.move(my_base.position);
    spirit.energize(my_base);
  } else {
    spirit.move(my_star.position);
    spirit.energize(spirit);
  }
};

const lockedHarvestBehaviour = (
  spirits: readonly SquareSpirit[],
  star: Star,
  base: Base = my_base,
) => {
  // Calculate the vector from the base to the star.
  const base_to_star = diff(star.position, base.position);

  // Calculate the normalized direction vector.
  const direction = norm(base_to_star);

  // Calculate and position the bots along the chain.

  const spacing = 300; // A locked SquareSpirit has a range of 300.

  // TODO: use division to place spirits along the line between start and end (omitting both start and end points)
  //
  //
  //
  spirits.forEach((spirit, index) => {
    const offset = index * (spacing / (1 / spirits.length)) + spacing / 2;
    const point = sum(base.position, scale(direction, offset));
    const distToPoint = dist(point, spirit.position);

    const key = `locked_harvest_${spirit.id}`;

    if (distToPoint <= 10) {
      spirit.lock();
    } else {
      spirit.unlock();
      spirit.move(point);
    }

    const state =
      memory[key] || spirit.energy === spirit.energy_capacity
        ? "charging"
        : "harvesting";

    spirit.shout(`State: ${state}`);

    if (state === "charging") {
      spirit.energize(base);
      if (spirit.energy <= 20) {
        memory[key] = "harvesting";
      }
    } else if (state === "harvesting") {
      spirit.energize(star);
      if (spirit.energy > spirit.energy_capacity - 10) {
        memory[key] = "charging";
      }
    } else {
      spirit.shout(`Unknown state: ${state}`);
    }
  });

  // if (spirit.position === point) {
  //   spirit.shout("Locking!");
  //   spirit.lock();
  // } else {
  //   spirit.shout("Moving to midpoint!");
  //   spirit.move(point);
  // }
  // if (spirit.energy === spirit.energy_capacity) {
  //   spirit.shout("Charging!");
  //   spirit.energize(my_base);
  // } else {
  //   spirit.shout("Harvesting!");
  //   spirit.energize(my_star);
  // }
};

const my_alive_spirits = my_spirits
  .filter((spirit) => spirit.hp > 0)
  .map((s) => s as SquareSpirit);

let i = 0;
const make_squad = (size: number | undefined) => {
  const squad = my_alive_spirits.slice(i, size && i + size);
  if (size) {
    i += size;
  }
  return squad;
};

const near_harvest_squad = make_squad(3);
const rest = make_squad(undefined);

lockedHarvestBehaviour(
  near_harvest_squad as unknown as readonly SquareSpirit[],
  my_star,
);

rest.forEach((spirit) => {
  dumbHarvestBehaviour(spirit);
});

// my_spirits.forEach((spirit, index) => {
//   if (my_spirits.length < 10) {
//     dumbHarvestBehaviour(spirit);
//     // lockedHarvestBehaviour(spirit as SquareSpirit);
//     return;
//   }
//   if (index > 10 && spirit.energy === spirit.energy_capacity) {
//     if (index < 20 && outpost.energy < outpost.energy_capacity) {
//       spirit.move(outpost.position);
//       spirit.energize(outpost);
//       spirit.set_mark("outpost");
//     } else if (index < 30 && base_nua.energy < outpost.energy_capacity) {
//       spirit.move(base_nua.position);
//       spirit.energize(base_nua);
//       spirit.set_mark("base_nua");
//     }
//   } else {
//     if (spirit.energy == spirit.energy_capacity) {
//       spirit.set_mark("charging");
//     }
//     if (spirit.energy == 0) {
//       spirit.set_mark("harvesting");
//     }
//
//     if (spirit.mark == "charging") {
//       spirit.move(my_base.position);
//       spirit.energize(my_base);
//     }
//     if (spirit.mark == "harvesting") {
//       spirit.move(my_star.position);
//       spirit.energize(spirit);
//     }
//
//     // Rather bad code to deal with attackers. Improve it!
//     if (my_base.sight.enemies.length > 0) {
//       //spirit objects are accessed by spirits['id']
//       let enemy = spirits[my_base.sight.enemies[0]];
//       spirit.move(enemy.position);
//       spirit.energize(enemy);
//     }
//   }
//
//   // the last action (move, energize, ...) will overwrite any previous ones
//   // in the same tick
// });
