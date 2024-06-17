import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class peticionInterceptor implements HttpInterceptor{

  constructor(private router:Router){}
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL'+req.url)

    let peticion=req.clone({
      setHeaders:{
        'Accept':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiZ3VhdGl0YUBnb2t1LmNvbSIsImlkIjoxLCJpYXQiOjE3MTg1ODk1OTIsImV4cCI6MTcxODU5MzE5Mn0.sZL-tPkJ3iGRryI30qsmAwGF_CaxPwwVUlqlVZ-Zyu4'
      }
    })
    return handler.handle(peticion).pipe(tap(()=>{},
  
    (error:any)=>{
      console.log("ERRORRRRRRR")
      if (error instanceof HttpErrorResponse){
        if(error.status!== 401){
          return
        }
        this.router.navigate(["auth/login"])
      }
    }
  ))
  }
}
 