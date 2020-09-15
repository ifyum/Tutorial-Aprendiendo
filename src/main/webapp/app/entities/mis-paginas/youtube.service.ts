import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';

import { IPlayList} from 'app/shared/model/youtube.model';




@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private resourceUrl = SERVER_API_URL + 'www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  playList(response: IPlayList): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + '/playlist', response, {observe: 'response'});
  }

  i
}
