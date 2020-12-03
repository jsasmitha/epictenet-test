import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { element } from 'protractor';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  @ViewChild('fileInput') el: ElementRef;
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  misMatcher = new MismatchStateMatcher();
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  passwordType: string = 'password';
  passwordConfirmType: string = 'password';
  passwordShow: boolean = false;
  passwordConfirmShow: boolean = false;
  hobbiesList = ["Singing", "Dancing", "Reading", "Cooking", "Drawing", "Writting"]
  imageUrl: any = 'assets/img/download.png';
  editFile: boolean = true;
  removeUpload: boolean = false;
  public userSettings5: any = {
    geoTypes: ['cities']
  };

  constructor(fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.form = fb.group({
      emailId: ["", [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      passwords: fb.group({
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      }, { validator: this.passwordConfirming }),
      phone: ["", [Validators.required]],
      gender: ["male", [Validators.required]],
      hobbies: ["", [Validators.required]],
      iAgree: [true, Validators.required],
      city: ["", Validators.required],
      file: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.form.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  toggleShow() {
    console.log(this.form)
    this.passwordShow = !this.passwordShow;
    console.log("clicked"); //undefined
    if (this.passwordShow) {
      this.passwordType = 'text';
    }
    else {
      this.passwordType = 'password';
    }
  }

  toggleConfirmShow() {
    this.passwordConfirmShow = !this.passwordConfirmShow;
    console.log("clicked"); //undefined
    if (this.passwordConfirmShow) {
      this.passwordConfirmType = 'text';
    }
    else {
      this.passwordConfirmType = 'password';
    }
  }

  passwordConfirming(c: AbstractControl): { passwordMismatch: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
      return { passwordMismatch: true };
    }
  }

  autoCompleteCallback(data: any): any {
    data.data ? this.form.get('city').setValue(data.data.vicinity) : this.form.get('city').setValue('');
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));

  }
}

export class MismatchStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
