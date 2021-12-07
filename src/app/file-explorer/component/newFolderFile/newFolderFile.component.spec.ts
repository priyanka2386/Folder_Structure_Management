/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewFolderFileComponent } from './newFolderFile.component';

describe('NewFolderFileComponent', () => {
  let component: NewFolderFileComponent;
  let fixture: ComponentFixture<NewFolderFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewFolderFileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFolderFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
