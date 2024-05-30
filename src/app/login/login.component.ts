import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/Login/login.service';
@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userAuthForm: FormGroup;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private Login: LoginService
  ) {
    this.userAuthForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
        ],
      ],

      rol: ['normal'],
    });
  }
  closeModal() {
    const closeButton = this.elementRef.nativeElement.querySelector(
      '[data-bs-dismiss="modal"]'
    );
    this.renderer.listen(closeButton, 'click', () => {});
  }

  ngOnInit(): void {}

  get name() {
    return this.userAuthForm.get('name');
  }

  get password() {
    return this.userAuthForm.get('password');
  }

  Submit(): void {
    this.userAuthForm.updateValueAndValidity();
    if (this.userAuthForm.valid) {
      const dataUserAuth = [
        {
          username: this.userAuthForm.controls['name'].value,
          password: this.userAuthForm.controls['password'].value,

          rol: this.userAuthForm.controls['rol'].value,
        },
      ];

      this.Login.Login(JSON.parse(JSON.stringify(dataUserAuth)));
    } else {
      this.userAuthForm.markAllAsTouched();
      alert('Por favor, corrige los errores en el formulario.');
    }
    this.changeDetector.detectChanges();
  }
}
