export class Room {
  id: number;
  name: string;
  location: string;
  capacities = new Array<LayoutCapacity>();

  static fromHttp(room: Room) {
    const newRoom= new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;
    newRoom.capacities = new Array<LayoutCapacity>();
    for(const layout of room.capacities) {
      newRoom.capacities.push(LayoutCapacity.fromHttp(layout));
    }
    return newRoom;
  }

  static toHttp(room: Room) {
    const layouts = new Array<LayoutCapacity>();
    for (const layout of room.capacities) {
      layouts.push(LayoutCapacity.toHttp(layout))
    }
    const httpRoom = {
      id: room.id, name: room.name, location: room.location, capacities : layouts
    };
    return httpRoom;
  }
}

export class LayoutCapacity {
  layout: Layout;
  capacity: number;

  static fromHttp(lc: LayoutCapacity) {
    const newLc = new LayoutCapacity();
    newLc.capacity = lc.capacity;
    newLc.layout = Layout[lc.layout];
    return newLc;
  }

  static toHttp(lc: LayoutCapacity) : LayoutCapacity {
    const layout = Object.keys(Layout).find(key => Layout[key] === lc.layout);
    const newLc = {
      layout: layout,
      capacity: lc.capacity
    };
    return <LayoutCapacity>newLc;
  }

}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD =   'Board Meeting'
}

