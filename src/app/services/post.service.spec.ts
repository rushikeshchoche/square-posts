declare const expect: jest.Expect;

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });

    service = TestBed.inject(PostService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', async () => {
    const postRequestSpy = jest.spyOn(httpClient, 'get');
    service.getPosts().subscribe();
    expect(postRequestSpy).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    );
  });
});
