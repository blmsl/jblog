import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { PostData } from '../post-data';

import { TextParsingService } from '../../shared/text-parsing.service';

/**
 * The individual post component that is used to render post data
 */
@Component({
  selector: 'jblog-post',
  templateUrl: './post.component.html',
  styleUrls: [
    './post.component.scss'
  ]
})
export class PostComponent implements AfterViewInit {

  /**
   * The post data to render
   */
  @Input() public data: PostData;

  /**
   * Constructor
   */
  constructor(
    private domSanitizer: DomSanitizer,
    private parser: TextParsingService,
    private element: ElementRef
  ) {}

  ngAfterViewInit() {
    if (!this.data) {
      return;
    }

    const contentArea = this.element.nativeElement.querySelector('.content-area');
    contentArea.innerHTML = this.getParsedContent();
  }

  /**
   * Returns whether a post has tags
   */
  public hasTags(): boolean {
    return this.data && this.data.tags.length > 0;
  }

  /**
   * Returns whether a post is older than a certain number of years
   */
  public ageInYearsGreaterThan(years: number): boolean {
    if (!this.data || years <= 0) {
      return false;
    }

    const postDate = new Date(this.data.date * 1000);
    const comparisonDate = new Date();
    const offsetMsec = comparisonDate.getTime() - 1000 * 60 * 60 * 24 * 365 * years;
    comparisonDate.setTime(offsetMsec);
    return postDate < comparisonDate;
  }

  /**
   * Returns the parsed post content
   */
  public getParsedContent() {
    if (!this.data) {
      return '';
    }

    const parsed = this.parser.parse(this.data.content);
    return parsed;
    // return this.domSanitizer.bypassSecurityTrustHtml(parsed);
  }

}
