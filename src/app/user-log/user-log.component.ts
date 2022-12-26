import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLog } from '../interfaces/userLog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActionsService } from '../services/actions.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import * as _ from 'lodash';
import { writeFileXLSX } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss'],
})
export class UserLogComponent implements OnInit {
  userLogList: UserLog[] = [];
  categories: string[] = this.actions.categories;
  departments: string[] = this.actions.departments;
  objects: string[] = this.actions.objects;
  users: string[] = this.actions.users;
  fastSearch: string[] = this.actions.fastSearch;
  fileName: string = 'Aktionen.xlsx';
  filteredDepartment: string = '';
  filteredUser: string = '';
  filteredObject: string = '';
  filteredStartDate: string = '';
  filteredEndDate: string = '';
  filteredFastChoose: string = '';

  displayedColumns: string[] = [
    'Nr.',
    'Datum',
    'Kategorien',
    'Mandant',
    'Benutzer',
    'Objekt',
    'Aktionen',
    'Bearbeiten/Löschen',
  ];
  dataSource!: MatTableDataSource<UserLog>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private actions: ActionsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUserLog();
  }
  getAllUserLog() {
    this.api.getUserLogs().subscribe({
      next: (res: any) => {
        this.userLogList = res; //to keep filter data
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.actions.allUserLogs = this.dataSource.filteredData;

        console.log(this.dataSource);
      },
      error: (err) => {
        alert('Fehler beim Abruf von Aktionen!!!');
      },
    });
  }
  openDialog(): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        //to get data without refresh the page
        if (val === 'save') {
          this.getAllUserLog();
        }
      });
  }
  editUserLog(row: UserLog) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        //to get data without refresh the page
        if (val === 'update') {
          this.getAllUserLog();
        }
      });
  }

  deleteUserLog(id: number) {
    this.api.deleteUserLog(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.getAllUserLog();
      },
      error: (err) => {
        alert('Error while deleting Product!!!');
      },
    });
  }

  // to filter user Logs
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUserLogFilter() {
    let filteredData = [...this.userLogList];
    if (this.filteredDepartment) {
      filteredData = filteredData.filter((item) => {
        return item.department === this.filteredDepartment;
      });
    }
    if (this.filteredUser) {
      filteredData = filteredData.filter(
        (item) => item.user === this.filteredUser
      );
    }
    if (this.filteredObject) {
      filteredData = filteredData.filter(
        (item) => item.object === this.filteredObject
      );
    }
    if (this.filteredFastChoose) {
      filteredData = filteredData.filter(
        (item) =>
          item.user === this.filteredFastChoose ||
          item.object === this.filteredFastChoose ||
          item.department === this.filteredFastChoose
      );
    }
    this.dataSource = new MatTableDataSource(filteredData);
  }

  onUserLogFilterClear() {
    this.filteredDepartment = '';
    this.filteredUser = '';
    this.filteredObject = '';
    this.filteredStartDate = '';
    this.filteredEndDate = '';
    this.filteredFastChoose = '';

    this.dataSource = new MatTableDataSource(this.userLogList);
  }

  // onChangeFilter($event: any) {
  //   let filteredData = _.filter(this.userLogList, (item) => {
  //     return item.department.toLowerCase() === $event.value.toLowerCase();
  //   });
  //   this.dataSource = new MatTableDataSource(filteredData);
  // }

  //print table
  printTable() {
    window.print();
  }
  //export to excel
  exportExcel() {
    let element = document.getElementById('excel-table');

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFileXLSX(wb, this.fileName);
  }
}
