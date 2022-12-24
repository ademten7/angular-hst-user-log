import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
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

  userLogForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.userLogForm = this.formBuilder.group({
      category: ['', Validators.required],
      department: ['', Validators.required],
      user: ['', Validators.required],
      object: ['', Validators.required],
      action: ['', Validators.required],
      date: Date.now(),
    });
  }
  addUserLog() {
    // console.log(this.userLogForm.value);
    if (this.userLogForm.valid) {
      this.api.postUserLog(this.userLogForm.value).subscribe({
        next: (res) => {
          this.userLogForm.reset();
          this.dialogRef.close('save');
        },
        error: (err) => {
          alert('Fehler beim Hinzufügen der Action');
        },
      });
    }
  }
}
