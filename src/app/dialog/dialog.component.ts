import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionsService } from '../services/actions.service';
import { UserLog } from '../interfaces/userLog';

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
  actionBtn: string = 'Save';
  dialogTitle: string = 'Neue Aktion Hinzufügen';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private actions: ActionsService,
    @Inject(MAT_DIALOG_DATA) public editData: UserLog,
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
    //to pass the edit values on form
    if (this.editData) {
      this.actionBtn = 'Bearbeiten';
      this.dialogTitle = 'Aktualisieren der Aktion';
      this.userLogForm.controls['category'].setValue(this.editData.category);
      this.userLogForm.controls['department'].setValue(
        this.editData.department
      );
      this.userLogForm.controls['user'].setValue(this.editData.user);
      this.userLogForm.controls['object'].setValue(this.editData.object);
      this.userLogForm.controls['action'].setValue(this.editData.action);
    }
  }
  addUserLog() {
    // console.log(this.userLogForm.value);
    if (!this.editData) {
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
    } else {
      this.updateUserLog();
    }
  }
  updateUserLog() {
    this.api.putUserLog(this.userLogForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.userLogForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Fehler beim Bearbeiten der Action');
      },
    });
  }
}
