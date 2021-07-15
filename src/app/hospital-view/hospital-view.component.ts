import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss']
})
export class HospitalViewComponent implements OnInit {
  hospitalTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  data: any[] = [
    { hospitalName: 'KIMS', contactNumber: '9632587410' },
    { hospitalName: 'CSI Mission Hospital', contactNumber: '9685321470' }
  ];
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.hospitalTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.data.forEach(formData => {
      this.addRow(formData);
    });
    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.hospitalTable.get('tableRows') as FormArray;
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
      isEditable: [false]
    });
  }

  addRow(formData?: any) {
    const control = this.hospitalTable.get('tableRows') as FormArray;
    control.push(this.initiateForm(formData));
  }

  deleteRow(index: number) {
    const control = this.hospitalTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  viewDepartments(group: FormGroup) {
    console.log(group.value)
    this.router.navigate(["/departments"], {
      queryParams: { hospitalName: group.value.hospitalName }
    })
  }

  saveUserDetails() {
    console.log(this.hospitalTable.value);
  }

  get getFormControls() {
    const control = this.hospitalTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.hospitalTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter(row => row.touched)
      .map(row => row.value);
    console.log(this.touchedRows);
  }
}
