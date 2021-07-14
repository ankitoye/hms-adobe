import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  data: any[] = [
    { hospitalName: 'KIMS', contactNumber: '9632587410' },
    { hospitalName: 'CSI Mission Hospital', contactNumber: '9685321470' }
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
    this.data.forEach(formData => {
      this.addRow(formData);
    });
  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(formData?: any): FormGroup {

    return this.fb.group({
      hospitalName: [
        formData ? formData.hospitalName : '',
        Validators.required
      ],
      contactNumber: [
        formData ? formData.contactNumber : '',
        [Validators.required, Validators.maxLength(10)]
      ],
      isEditable: [true]
    });
  }

  addRow(formData?: any) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm(formData));
  }

  deleteRow(index: number) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter(row => row.touched)
      .map(row => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }
}
