import { Audit } from './audit';

export class PostTag extends Audit {
  index: number;
  id: string;
  name: string;
  active: boolean;
  constructor(data: any) {
    super(data);
    this.index = data?.index;
    this.id = data?.id;
    this.name = data?.name;
    this.active = data?.active != undefined && data?.active;
  }
}
