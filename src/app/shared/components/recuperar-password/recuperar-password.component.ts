import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';
import { CambiarPassword } from '../../modelo/cambiar-password/cambiar-password';
import { EmailPasswordService } from '../../servicio/cambio-password/email-password.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  banderaPassword=false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  newPassword= new CambiarPassword();

  constructor(
    public emailPasswordService:EmailPasswordService,
    public alertService:AlertService,
    public router:Router,
    public activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.newPassword.tokenPassword=this.activatedRouter.snapshot.params.tokenPassword;
  }

  onChangePassword(password:CambiarPassword):void{
    if(this.newPassword.password != this.newPassword.confirmarPassword || this.newPassword.password=="" || this.newPassword.confirmarPassword==""){
      this.alertService.error("Las contraseñas no coinciden",this.options);
      return;
    }
    this.newPassword.tokenPassword=this.activatedRouter.snapshot.params.tokenPassword;

    this.emailPasswordService.cambiarPassword(password).subscribe(
      data=>{
        this.alertService.success(data.mensaje,this.options);
        this.router.navigate(['/login']);
      },
      err =>{
        this.alertService.error(err.error.mensaje,this.options);
      }
    );
  }

  validarContrasena(){
    let password=this.newPassword.password;

  var passw=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*¡¿#?&./()=])[A-Za-z\d$@!%*¡¿#?&./()=]{8,15}[^'\s]/;
      if(password.match(passw)){
        this.banderaPassword=true;
      }else{
      this.banderaPassword=false;}
  }

}
