import { element } from 'protractor';
import { Component } from '@angular/core';
import { NodeModel } from './file-explorer/nodemodel/nodemodel';
import { Observable } from 'rxjs/Observable';
import { FileService } from './service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public fileElements: Observable<NodeModel[]>;

  constructor(public fileService: FileService) { }
  currentRoot: NodeModel;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit() {
    this.updateNodeModelQuery();
  }

  // used for add file and folder into ngmodel object
  addFolder(folder: { name: string, type: 'folder' | 'file' | 'unset' | null, element: NodeModel }) {
    let isFolderVal = true;
    if (folder.type == 'file') {
      isFolderVal = false;
    }
    this.fileService.add({ type: folder.type, isFolder: isFolderVal, name: folder.name, parent: folder.element.id ? folder.element.id : 'root', 'isSubFile': false, 'isSubFolder': false });
    this.updateNodeModelQuery();
  }

  // used for remove file and folder from ngmodel object
  removeElement(element: NodeModel) {
    this.fileService.delete(element.id);
    this.updateNodeModelQuery();
  }

  // used for update ngmodel object to display file-folder button
  elementEditSubFile(event: { element: NodeModel; isSubFile: boolean }) {
    this.fileService.updateSubFileVariable(event.element.id, event.isSubFile);
    this.updateNodeModelQuery();
  }

  // used for update ngmodel object to display file - folder component
  elementEditSubFileFolder(event: { element: NodeModel; isSubFile: boolean; isSubFolder: boolean; }) {
    this.fileService.updateSubFileFolderVariable(event.element.id, event.isSubFile, event.isSubFolder);
    this.updateNodeModelQuery();
  }

  // used for update ngmodel object value
  updateNodeModelQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }
}
