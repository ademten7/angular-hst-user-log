import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLog } from '../interfaces/userLog';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL: string = 'http://localhost:3000/userLogList';
  allUserLogs: any = [];
  categories: string[] = [
    'Alarm Manager',
    'System',
    'Betriebsstundenzähler',
    'Analyse',
  ];
  departments: string[] = [
    'DB Archive',
    'Projektierung',
    'Planung',
    'Personalabteilung',
    'Finanzabteilung',
  ];
  objects: string[] = [
    'Attendance',
    'Login',
    'Aktualisieren',
    'Projektierung',
    'Exportieren',
    'Löschen',
    'Attendance',
    'Bearbeiten',
  ];
  users: string[] = [
    'Thomas Hauptmann',
    'Julia Krüger',
    'Hendrik Fleitman',
    'Celine Müller',
    'Lea Flitz',
    'Carla Maximilian',
    'Leo Schneider',
    'Hendrik Fleitman',
  ];

  constructor(private http: HttpClient) {}
  postUserLog(action: UserLog) {
    return this.http.post(this.API_URL, action);
  }
  getUserLogs() {
    return this.http.get(this.API_URL);
  }
  putUserLog(action: UserLog, id: number) {
    return this.http.put(this.API_URL + id, action);
  }
  deleteUserLog(id: number) {
    this.http.delete(this.API_URL + id);
  }
}
