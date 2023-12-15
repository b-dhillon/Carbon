import { Camera } from "./Camera";
import { Model } from "./ModelRF";
import { Universe } from "./Universe";

interface ThreePageConfig {
  id: string,
  title?: string,
  camera?: Camera
}

type SectionModels = Model[];


export class ThreePage {

  constructor() {
    this.id = ThreePage._lastId++;
  };
  
  private static _lastId = 0;
  readonly id: number;

  title: string | undefined;
  camera: Camera | undefined;
  universe: Universe | undefined;
  modelsOfEntirePage: Model[][] = [];


  bigBang(id: string, starCount: number, radius: number): void {
    this.universe = {
      id: id,
      starCount: starCount,
      radius: radius,
    };
  }
}
