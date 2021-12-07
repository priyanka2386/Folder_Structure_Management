import { element } from 'protractor';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NodeModel } from '../../nodemodel/nodemodel';

@Component({
  selector: 'app-newFolderFile',
  templateUrl: './newFolderFile.component.html',
  styleUrls: ['./newFolderFile.component.css']
})
export class NewFolderFileComponent implements OnInit {
  // below is used to get data from parent
  @Input() element: string;
  @Input() type: string;
  // below are event emitter to transfer data child-parent
  @Output() myFoldername: EventEmitter<{ name: string, type: 'folder' | 'file' | 'unset' | null, element: NodeModel }> = new EventEmitter();
  @Output() closeevent: EventEmitter<{ val: boolean }> = new EventEmitter();
  folderName: string;
  constructor() { }

  ngOnInit() {
    if (!this.type) {
      this.type = 'folder';
    }
  }

  //this method are used for create folder/file and emit to the parent
  createFolder(type, element) {
    if (this.folderName) {
      this.myFoldername.emit({ name: this.folderName, type: type, element: element });
    }
  }

  //this method are used for close opened folder/file form
  close() {
    this.closeevent.emit({ val: true });
  }

}
