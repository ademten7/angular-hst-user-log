import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
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
  fastSearch: string[] = [
    'Alarm Manager',
    'System',
    'Betriebsstundenzähler',
    'Analyse',
    'DB Archive',
    'Projektierung',
    'Planung',
    'Personalabteilung',
    'Finanzabteilung',
    'Attendance',
    'Login',
    'Aktualisieren',
    'Projektierung',
    'Exportieren',
    'Löschen',
    'Attendance',
    'Bearbeiten',
    'Thomas Hauptmann',
    'Julia Krüger',
    'Hendrik Fleitman',
    'Celine Müller',
    'Lea Flitz',
    'Carla Maximilian',
    'Leo Schneider',
    'Hendrik Fleitman',
  ];

  constructor() {}
}
