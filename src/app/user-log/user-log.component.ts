import { Component, OnInit } from '@angular/core';
import { UserLog } from '../interfaces/userLog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss'],
})
export class UserLogComponent implements OnInit {
  constructor(private api: ApiService) {}
  userLogList: UserLog[] = [];

  ngOnInit(): void {
    this.getAllUserLog();
  }
  getAllUserLog() {
    this.api.getUserLogs().subscribe({
      next: (res: any) => {
        this.api.allUserLogs = [...res];
        this.userLogList = this.api.allUserLogs;
        console.log(this.userLogList);

        console.log(this.api.allUserLogs);
      },
      error: (err) => {
        alert('Fehler beim Abruf von Aktionen!!!');
      },
    });
  }
}
