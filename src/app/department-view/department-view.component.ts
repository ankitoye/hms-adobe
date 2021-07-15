import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent implements OnInit {
  departmentTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  currentHospitalName: string
  data: any[] = [
    { "departmentName": "nephrology", "head": "Dr. A P Kulashekhar", "contactNumber": "9876543210", "hospitalName": "KIMS" },
    { "departmentName": "neurology", "head": "Dr.B Raj Kumar", "contactNumber": "9876543210", "hospitalName": "KIMS" },
    { "departmentName": "cardiology", "head": "Dr. L Sri Devi", "contactNumber": "9876543210", "hospitalName": "KIMS" },
    { "departmentName": "ENT", "head": "Dr. K Ram Prasad", "contactNumber": "9876543210", "hospitalName": "CSI Mission Hospital" },
    { "departmentName": "opthalmology", "head": "Dr. J Sirisha", "contactNumber": "9876543210", "hospitalName": "CSI Mission Hospital" }
  ];
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.currentHospitalName = this.route.snapshot.queryParams.hospitalName
  }

  ngOnInit(): void {
    this.touchedRows = [];
    this.departmentTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.data.forEach(formData => {
      if (this.currentHospitalName !== formData.hospitalName) return
      this.addRow(formData);
    });
    this.addRow();

  }

  ngAfterOnInit() {
    this.control = this.departmentTable.get('tableRows') as FormArray;
  }

  initiateForm(formData?: any): FormGroup {

    return this.fb.group({
      departmentName: [
        formData ? formData.departmentName : '',
        Validators.required
      ],
      head: [
        formData ? formData.head : '',
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
    const control = this.departmentTable.get('tableRows') as FormArray;
    control.push(this.initiateForm(formData));
  }

  deleteRow(index: number) {
    const control = this.departmentTable.get('tableRows') as FormArray;
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
  }

  saveUserDetails() {
    console.log(this.departmentTable.value);
  }

  get getFormControls() {
    const control = this.departmentTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.departmentTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter(row => row.touched)
      .map(row => row.value);
    console.log(this.touchedRows);
  }
}
