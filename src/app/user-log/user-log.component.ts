import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserLog } from '../interfaces/userLog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActionsService } from '../services/actions.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss'],
})
export class UserLogComponent implements OnInit {
  // userLogList: UserLog[] = [];
  categories: string[] = this.actions.categories;
  departments: string[] = this.actions.departments;
  objects: string[] = this.actions.objects;
  users: string[] = this.actions.users;
  fastSearch: string[] = this.actions.fastSearch;

  constructor(private api: ApiService, private actions: ActionsService) {}
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
        this.actions.allUserLogs = [...res];
        //this.userLogList = this.api.allUserLogs;
        //console.log(this.userLogList);
        console.log(this.actions.allUserLogs);
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
