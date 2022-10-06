import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambiarPassword } from '../../modelo/cambiar-password/cambiar-password';
import { EmailDTO } from '../../modelo/cambiar-password/email-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  public baseURL=environment.baseUrl+"/api/email/send-html";
  public urlCambiarPassword=environment.baseUrl+"/api/cambiar-password";

  constructor(public httpClient: HttpClient) { }

  public sendEmail(emailDTO:EmailDTO):Observable<any>{
    return this.httpClient.post<any>(this.baseURL,emailDTO);
  }

  public cambiarPassword(cambiarPassword:CambiarPassword):Observable<any>{
    return this.httpClient.post<any>(this.urlCambiarPassword,cambiarPassword);
  }
}
