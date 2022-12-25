import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserLog } from '../interfaces/userLog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss'],
})
export class UserLogComponent implements OnInit {
  constructor(private api: ApiService) {}
  // userLogList: UserLog[] = [];
  displayedColumns: string[] = [
    'Nr.',
    'Datum',
    'Kategorien',
    'Mandant',
    'Benutzer',
    'Objekt',
    'Aktionen',
    'Edit/Delete',
  ];
  dataSource!: MatTableDataSource<UserLog>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllUserLog();
  }
  getAllUserLog() {
    this.api.getUserLogs().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.api.allUserLogs = [...res];
        //this.userLogList = this.api.allUserLogs;
        //console.log(this.userLogList);
        console.log(this.api.allUserLogs);
      },
      error: (err) => {
        alert('Fehler beim Abruf von Aktionen!!!');
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
}
