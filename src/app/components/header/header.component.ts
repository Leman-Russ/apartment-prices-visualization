import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() fileChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput;

  constructor(private snackBar: MatSnackBar) { }

  onFileChange(event: any) {
    this.uploadJsonFile();
  }

  uploadJsonFile() {
    let fileBrowser = this.fileInput.nativeElement,
        reader = new FileReader();    
    if (fileBrowser.files[0].name.split('.').pop() == "json") {
      reader.readAsText(fileBrowser.files[0]);
      reader.onload = () => {
        this.fileChange.emit(JSON.parse(reader.result));
      }
    } else {
      this.openSnackBar("Selected file is not .json");
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }

}
