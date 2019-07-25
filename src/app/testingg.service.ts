import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestinggService {
  get windowRef() {
    return window
  }
}
