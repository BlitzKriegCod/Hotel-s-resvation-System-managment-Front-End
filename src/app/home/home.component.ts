import { Component } from '@angular/core';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private modalService: NgbModal) {}


  openRegistrationModal() {

    const modalRef = this.modalService.open(RegistrarUsuarioComponent);
    // Puedes personalizar el tamaño del modal si es necesario
    modalRef.componentInstance.size =
      'lg';
  }
  openLoginModal() {

    const modalRef = this.modalService.open(LoginComponent);
    // Puedes personalizar el tamaño del modal si es necesario
    modalRef.componentInstance.size =
      'lg';
    
  }
  

  
}

