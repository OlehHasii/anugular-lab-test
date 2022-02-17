import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGamesComponent } from './library-games.component';

describe('LibraryGamesComponent', () => {
  let component: LibraryGamesComponent;
  let fixture: ComponentFixture<LibraryGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
