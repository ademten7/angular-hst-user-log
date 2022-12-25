import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActionsService } from '../services/actions.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  categories: string[] = this.actions.categories;
  departments: string[] = this.actions.departments;
  objects: string[] = this.actions.objects;
  users: string[] = this.actions.users;

  userLogForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private actions: ActionsService,
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
