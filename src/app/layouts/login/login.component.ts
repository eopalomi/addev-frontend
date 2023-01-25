import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

interface Usuario {
  user?: string;
  password?: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  icoLoading: string = '';
  widthLogin!: string;
  topSpacing!: string;
  loading: boolean = false;
  usuario: Usuario ={ user: '', password: '' };

  constructor(
    private messageService: MessageService,
    private router: Router,
    private auth: AuthService
  ) { this.usuario.user = '';}

  ngOnInit(): void {
    if (window.innerWidth <= 768){
      this.widthLogin = '85%';
      this.topSpacing = '5';
    } else if (window.innerWidth <= 1440) {
      this.widthLogin = '420px';
      this.topSpacing = '8';
    }  else {
      this.widthLogin = '451px';
      this.topSpacing = '15';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= 768){
      this.widthLogin = '85%';
      this.topSpacing = '5';
    } else if (window.innerWidth <= 1440) {
      this.widthLogin = '420px';
      this.topSpacing = '8';
    } else {
      this.widthLogin = '451px';
      this.topSpacing = '15';
    }
  }

  
  login(form: NgForm) {
    
    if (form.invalid) { 
      // this.openSnackBar('Ingrese el usuario y contraseña', 'ERROR'); 
      return; 
    };

    this.icoLoading = 'pi pi-spin pi-spinner';
    this.loading = true;
    
    this.auth.login(this.usuario).subscribe(resp => {
        console.log("login resp", resp.nombreUsuario);
        
        this.router.navigateByUrl('/main');
      }, (err) => {
        // this.openSnackBar('Usuario y/o Contraseña invalida', 'ERROR');
        this.messageService.add({severity:'error', summary: 'ERROR', detail: 'Usuario y/o Contraseña inválida'});

        console.log("error de login", err);
        
        this.icoLoading = '';
        this.loading = false;
      }
    );
  }

}
