import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateKey, TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private readonly RETRY_MAX = 3;
  private readonly RETRY_DELAY_MS = 2000;
  constructor(private http: HttpClient, private state: TransferState,@Inject(PLATFORM_ID) private platformId: object,) {

  }


  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000').pipe(
      map(response => response.data)
      ,shareReplay(1)
    );
  }

  async getData1()  {
let res = await this.GetDataService()
return res
  }

  async GetDataService(){
  let res = await this.http.get<any>('http://localhost:3000/api').toPromise()
  return res
}

 async getData2() {
  const PHOTOS_KEY = makeStateKey('photos');
  const photos = this.state.get(PHOTOS_KEY, null);
  if (photos) {
    return photos
  } else {
    await this.http.get<any>('http://localhost:3000/api').pipe(
      tap(data => {
        this.state.set(PHOTOS_KEY,data)
      })
    ).toPromise();
    return this.state.get(PHOTOS_KEY,null);
  }
}


getById(id:number){
   this.http.get<any>('http://localhost:3000/api/'+id).toPromise()
}
async getById1(id:number) {
  const PHOTOS_KEY = makeStateKey('photos_'+id);
  const photos = this.state.get(PHOTOS_KEY, null);
  if (photos) {
    return photos;
  } else {
    const response = await this.http.get<any>('http://localhost:3000/api/'+id).toPromise();
    this.state.set(PHOTOS_KEY,response);
    return response;
  }
}

async getById3(id:number) {
  const PHOTOS_KEY = makeStateKey('photos_'+id);
  const photos = this.state.get(PHOTOS_KEY, null);
  console.log('photos',photos);
  if (photos) {
    return photos
  } else {
    await this.http.get<any>('http://localhost:3000/api/'+id).pipe(
      tap(data => {
        this.state.set(PHOTOS_KEY,data)
      })
    ).toPromise();
    return this.state.get(PHOTOS_KEY,null);
  }
}

getById4(id: number): Observable<any> {
  const PHOTOS_KEY: StateKey<string> = makeStateKey(`photos_${id}`);
  const isBrowser = isPlatformBrowser(this.platformId);

  if (isBrowser) {
    const photos = this.state.get<any>(PHOTOS_KEY, null);
    if (photos) {
      return of(photos);
    }
  }

  return this.http.get<any>(`https://jsonplaceholder.typicode.com/photos/${id}`).pipe(
    tap((response) => {
      if (isBrowser) {
        this.state.set(PHOTOS_KEY, response);
      }
    })
  );
}




}
