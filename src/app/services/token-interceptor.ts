// import {Injectable} from '@angular/core'
// import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { TokenService } from './token.service';

// // @Injectable()
// // export class TokenInterceptor implements HttpInterceptor{
// //     constructor(private tokenService:TokenService){}
    
// //     intercept(req:HttpEvent<any>,next:HttpHandler):
// //        Observable<HttpEvent<any>>{
// //            return next.handle(req);
// //        }
// // }


// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//         constructor(private tokenService:TokenService){}

//   intercept(req: HttpRequest<any>, next: HttpHandler):
//     Observable<HttpEvent<any>> {
// //    return next.handle(req);
//   const headersConfig={
//       'Content-Type':'application/json',
//       'Accept':'application/json'
//   }


//   const token=this.tokenService.GetToken();

//   if(token)
//   {
//       headersConfig['Authorization']=`beader ${token}`;
  
//   }

//   const _req=req.clone({
//       setHeaders:headersConfig
//   })

//   return next.handle(_req);
// }
// }


import { TokenService } from './token.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    const token = this.tokenService.GetToken();
    if (token) {
      headersConfig['Authorization'] = `beader ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req);
  }
}