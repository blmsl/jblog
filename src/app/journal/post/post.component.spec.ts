import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TextParsingService } from '../../shared/text-parsing.service';
import { MockTextParsingService } from '../../shared/mocks/mock-text-parsing.service';

import { PostComponent } from './post.component';

const mockPostData = {
  postId: 1,
  date: Date.now(),
  title: 'post title',
  content: '<p>Example post content with an emoji :smile: . Yay!</p>',
  tags: ['one', 'two']
};

describe('PostComponent', () => {
  const mockTextParsingService = new MockTextParsingService();

  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PostComponent ],
      providers: [
        { provide: TextParsingService, useValue: mockTextParsingService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.data = mockPostData;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render content correctly', () => {
    expect(compiled.querySelector('article h2').textContent.trim()).toBe('post title');
    expect(component.hasTags()).toBeTruthy();

    const output = compiled.querySelector('.content-area').textContent.trim();
    expect(output).toContain('Example post content with an emoji :smile: . Yay! was parsed');
  });
});
