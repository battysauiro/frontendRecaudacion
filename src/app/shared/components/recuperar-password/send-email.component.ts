import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alerts/alert.service';
import { EmailDTO } from '../../modelo/cambiar-password/email-dto';
import { EmailPasswordService } from '../../servicio/cambio-password/email-password.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  emailDTO= new EmailDTO();

  constructor(
    public emailPasswordService:EmailPasswordService,
    public alertService:AlertService
  ) { }

  ngOnInit(): void {
  }

  onSendEmail(email:EmailDTO):void{
    this.emailPasswordService.sendEmail(email).subscribe(
      data=>{
        this.alertService.success(data.mensaje,this.options);
      },
      err =>{
        this.alertService.error(err.error.mensaje,this.options);
      }
    );
  }

}
