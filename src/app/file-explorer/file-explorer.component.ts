import { element } from 'protractor';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NodeModel } from './nodemodel/nodemodel';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {
  isNewDig: any = false;
  changeText: boolean;
  type: any;
  selectedName: any;
  constructor(public dialog: MatDialog) {
    this.changeText = false;
  }

  // below is used to get data from parent
  @Input() fileElements: NodeModel[];
  // below are event emitter to transfer data child-parent
  @Output() folderAdded = new EventEmitter<{ name: string, type: 'folder' | 'file' | 'unset' | null, element: NodeModel }>();
  @Output() elementRemoved = new EventEmitter<NodeModel>();
  @Output() elementEditSubFile = new EventEmitter<{ element: NodeModel; isSubFile: boolean; }>();
  @Output() elementEditSubFileFolder = new EventEmitter<{ element: NodeModel; isSubFile: boolean; isSubFolder: boolean; }>();


  //used to get newly created folder/file name
  getFolderName(data, element) {
    if (!data.element) {
      data.element = NodeModel;
    }
    this.folderAdded.emit({ name: data.name, type: data.type, element: data.element });
    this.isNewDig = false;
    //console.warn(element);
    if (element != undefined) {
      element.isSubFolder = !element.isSubFolder;
      element.isSubFile = element.isSubFile;
      this.elementEditSubFileFolder.emit({ element: element, isSubFile: element.isSubFile, isSubFolder: element.isSubFolder });
    }

    //set json values to textarea
    setTimeout(() => {
      var pretty = JSON.stringify(this.fileElements, undefined, 2);
      var ugly = (<HTMLInputElement>document.getElementById('jsonTextArea')).value;
      (<HTMLInputElement>document.getElementById('jsonTextArea')).value = pretty;
    }, 300);


  }

  //used to close component for created folder/file name
  getCloseEvent(data, element) {
    this.isNewDig = false;
    element.isSubFolder = !element.isSubFolder;
    element.isSubFile = element.isSubFile;
    this.elementEditSubFileFolder.emit({ element: element, isSubFile: element.isSubFile, isSubFolder: element.isSubFolder });
  }

  // used to display file and folder button
  displayBTN(element: NodeModel) {
    element.isSubFile = !element.isSubFile;
    this.elementEditSubFile.emit({ element: element, isSubFile: element.isSubFile });
  }

  // used to display file/folder create component
  createSubFolder(type, element) {
    this.type = type;
    element.isSubFolder = !element.isSubFolder;
    element.isSubFile = !element.isSubFile;
    this.elementEditSubFileFolder.emit({ element: element, isSubFile: element.isSubFile, isSubFolder: element.isSubFolder });
  }

  // used for delete element
  deleteElement(element: NodeModel) {
    this.elementRemoved.emit(element);
    //set json values to textarea
    setTimeout(() => {
      var pretty = JSON.stringify(this.fileElements, undefined, 2);
      if (this.fileElements.length > 0) {
        var ugly = (<HTMLInputElement>document.getElementById('jsonTextArea')).value;
        (<HTMLInputElement>document.getElementById('jsonTextArea')).value = pretty;
      }

    }, 300);
  }

  // used for display root file / folder create component
  openFolderFileComponent() {
    this.isNewDig = true;
  }

}
