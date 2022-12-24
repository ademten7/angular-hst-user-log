import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  categories: string[] = [
    'Alarm Manager',
    'System',
    '	Betriebsstundenzähler',
    'Analyse',
  ];
  departments: string[] = [
    'DB Archive',
    'Projektierung',
    'Planung',
    '	Personalabteilung',
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

  constructor() {}

  ngOnInit(): void {}
}
