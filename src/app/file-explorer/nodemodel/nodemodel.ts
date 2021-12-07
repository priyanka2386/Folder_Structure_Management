export class NodeModel {
  id?: string;
  type: 'folder' | 'file' | 'unset' | null;
  isFolder: boolean;
  name?: string;
  children?: NodeModel[];
  parent: string;
  isSubFile: boolean;
  isSubFolder: boolean;
}
