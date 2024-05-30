import { RegisterService } from './../Services/SignUp/register.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { mustMatch, emailcom } from '../Validators/MyCustomValidators';
import { RedirectCommand } from '@angular/router';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarUsuarioComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private SignUp: RegisterService
  ) {
    this.userForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email, emailcom('email')]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        rol: ['normal'],
      },
      {
        validators: mustMatch('password', 'confirmPassword'),
        updateOn: 'change',
      }
    );
  }
  closeModal() {
    const closeButton = this.elementRef.nativeElement.querySelector(
      '[data-bs-dismiss="modal"]'
    );
    this.renderer.listen(closeButton, 'click', () => {});
  }

  ngOnInit(): void {}

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  Submit(): void {
    this.userForm.updateValueAndValidity();
    if (this.userForm.valid) {
      const dataUser = [
        {
          username: this.userForm.controls['name'].value,
          password: this.userForm.controls['password'].value,
          correo: this.userForm.controls['email'].value,
          rol: this.userForm.controls['rol'].value,
        },
      ];

      this.SignUp.SingUp(JSON.parse(JSON.stringify(dataUser)));
    } else {
      this.userForm.markAllAsTouched();
      alert('Por favor, corrige los errores en el formulario.');
    }
    this.changeDetector.detectChanges();
  }
}
