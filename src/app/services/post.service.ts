import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostInterface } from '../types/post.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostInterface[]> {
    const url = `${environment.apiUrl}/posts`;
    return this.http.get<PostInterface[]>(url);
  }
}
