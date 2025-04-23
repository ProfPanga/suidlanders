import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, CommonModule, ReactiveFormsModule]
})
export class UserInfoPage implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  formData: any = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      idNumber: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      overallHealth: ['', Validators.required],
      workExperience: ['', Validators.required],
      dependants: [0, ['', Validators.required, Validators.min(0)]],
      idCopy: [null],
      marriageCertificate: [null],
      otherDocs: [null],
    });
  }
  
  onFileChange(event: Event, controlName: string) {
    const target = event.target as HTMLInputElement;
    if (controlName === 'otherDocs') {
      const files = (target.files)
      if (files) {
        const names = Array.from(files).map(f => f.name);
        this.formData.otherDocsNames = names;
        this.userForm.patchValue({
          otherDocs: files
        });
      }
    } else {
      const file = (target.files?.[0]);
      if (file) {
        const nameProp = `${controlName}Name`;
        this.formData[nameProp] = file.name;
        this.userForm.patchValue({
          [controlName]: file
        });
      }
    }
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      this.submitted = true;
      this.formData = { ...this.formData, ...this.userForm.value }
    }
  }
  exportToHtml() {
    // Placeholder
  }
}

