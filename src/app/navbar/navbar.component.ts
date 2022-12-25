import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '30%',
    });
    // .afterClosed()
    // .subscribe((val) => {
    //   //to get data without refresh the page
    //   if (val === 'save') {
    //     this.getData.getData();
    //   }
    // });
  }
}
