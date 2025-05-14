import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class UserInfoPage implements OnInit {
  userForm!: FormGroup
  submitted = false
  formData: any = {}

  constructor (private fb: FormBuilder) {}

  ngOnInit () {
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
      dependants: [0, [Validators.required, Validators.min(0)]],
      idCopy: [null],
      marriageCertificate: [null],
      otherDocs: [null],
    })
  }
  
  onFileChange (event: Event, controlName: string): void {
    const target = event.target as HTMLInputElement
    if (controlName === 'otherDocs') {
      const files = target.files
      if (files) {
        const names = Array.from(files).map(f => f.name)
        this.formData.otherDocsNames = names
        this.userForm.patchValue({
          otherDocs: files
        })
      }
    } else {
      const file = (target.files?.[0])
      if (file) {
        const nameProp = `${controlName}Name`
        this.formData[nameProp] = file.name
        this.userForm.patchValue({
          [controlName]: file
        })
      }
    }
  }
  
  onSubmit(): void {
    console.log('onSubmit called - valid?', this.userForm.valid)
    if (this.userForm.valid) {
      this.submitted = true
      this.formData = { ...this.formData, ...this.userForm.value }
    }
  }

  private generateHtmlString(data: any): string {
    return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>General User Information</title>
    </head>
    <body>
      <h1>General User Information</h1>
  
      <p><strong>Name:</strong> ${data.name} ${data.surname}</p>
      <p><strong>ID Number:</strong> ${data.idNumber}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone Number:</strong> ${data.phoneNumber}</p>
      <p><strong>Address:</strong> ${data.address}, ${data.city}, ${data.province}, ${data.postalCode}</p>
  
      <p><strong>Age:</strong> ${data.age}</p>
      <p><strong>Sex:</strong> ${data.sex}</p>
      <p><strong>Overall Health:</strong> ${data.overallHealth}</p>
      <p><strong>Work Experience:</strong> ${data.workExperience}</p>
      <p><strong>Dependants:</strong> ${data.dependants}</p>
  
      ${
        data.idCopyName
          ? `<p><strong>ID Copy:</strong> ${data.idCopyName}</p>`
          : ''
      }
      ${
        data.marriageCertName
          ? `<p><strong>Marriage Certificate:</strong> ${data.marriageCertName}</p>`
          : ''
      }
      ${
        data.otherDocsNames
          ? `<p><strong>Other Documents:</strong> ${data.otherDocsNames.join(', ')}</p>`
          : ''
      }
    </body>
  </html>
    `;
  }

  exportToHtml(): void {
    const html = this.generateHtmlString(this.formData)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'user-info.html'
    a.click()
    URL.revokeObjectURL(url)
  }
}

