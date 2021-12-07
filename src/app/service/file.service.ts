import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { NodeModel } from '../file-explorer/nodemodel/nodemodel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface IFileService {
  add(fileElement: NodeModel);
  delete(id: string);
  queryInFolder(folderId: string): Observable<NodeModel[]>;
  get(id: string): NodeModel;
}

@Injectable()
export class FileService implements IFileService {
  private map = new Map<string, NodeModel>();

  constructor() { }

  // used for add folder/file
  add(fileElement: NodeModel) {
    fileElement.id = v4();
    this.map.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }

  // used for delete folder/file
  delete(id: string) {
    this.map.delete(id);
  }

  // used for dataset to tree structure
  private querySubject: BehaviorSubject<NodeModel[]>;
  queryInFolder(folderId: string) {
    const result: NodeModel[] = [];
    const resultAll: NodeModel[] = [];
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element));
      }
      resultAll.push(this.clone(element));
    });

    result.forEach(ele => {
      let updatedElement = this.updateChild(ele, resultAll);
      if (updatedElement) {
      }
    });
    result
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  // used for recursive child
  updateChild(parentEle, AllEle) {
    if (parentEle) {
      let childEle = AllEle.filter(x => x.parent == parentEle.id);
      if (childEle.length > 0) {
        parentEle.children = childEle;
        childEle.forEach(element => {
          this.updateChild(element, AllEle);
        });
      }
    }
    return parentEle;
  }

  // used for display file and folder button
  updateSubFileVariable(id: string, isSubFile: boolean) {
    let element = this.map.get(id);
    element = Object.assign(element, { isSubFile: isSubFile });
    this.map.set(element.id, element);
  }

  // used to display filefolder component
  updateSubFileFolderVariable(id: string, isSubFile: boolean, isSubFolder: boolean) {
    let element = this.map.get(id);
    element = Object.assign(element, { isSubFile: isSubFile, isSubFolder: isSubFolder });
    this.map.set(element.id, element);
  }

  // used for get file/folder element from id
  get(id: string) {
    return this.map.get(id);
  }

  // used for to make new element ngmodel clone
  clone(element: NodeModel) {
    return JSON.parse(JSON.stringify(element));
  }
}
