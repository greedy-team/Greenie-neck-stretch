import planet1 from "../jjang.png";
import planet2 from "../himne.png";
import planet3 from "../cando.png";
import moon from "../moon1.png";
import rocket from "../rocket.png";
import cloud1 from "../10.png";
import cloud2 from "../20.png";
import cloud3 from "../30.png";
import cloud4 from "../40.png";

export const SCENE_OBJECTS = [
  { src: planet1, alt: "planet", topOffset: 0, side: "left", width: 400 },
  { src: rocket, alt: "rocket", topOffset: 1000, side: "right", width: 400 },
  { src: planet2, alt: "planet", topOffset: 2000, side: "left", width: 400 },
  { src: planet3, alt: "planet2", topOffset: 3000, side: "right", width: 400 },
  { src: moon, alt: "planet2", topOffset: 4000, side: "left", width: 400 },
  { src: cloud4, alt: "rocket", topOffset: 6000, side: "left", width: 450 },
  { src: cloud3, alt: "planet", topOffset: 7000, side: "right", width: 450 },
  { src: cloud2, alt: "planet2", topOffset: 8000, side: "left", width: 450 },
  { src: cloud1, alt: "planet2", topOffset: 9000, side: "right", width: 450 },
];
