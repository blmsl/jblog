import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Project } from './project';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ProjectService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should get all projects from backend',
    inject([ProjectService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        data: [
          {
            name: 'test',
            title: 'test project',
            summary: 'test summary',
            info: 'some info',
            link: 'http://some.location/here',
            resourcesUrl: 'http://some.location/'
          },
          {
            name: 'test2',
            title: 'test project2',
            summary: 'test2 summary',
            info: 'some info2',
            link: 'http://some.location/here/2',
            resourcesUrl: 'http://some.location/2'
          }
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getProjects(0).subscribe((projects: Project[]) => {
        expect(projects.length).toBe(2);

        expect(projects[0].name).toBe('test');
        expect(projects[0].title).toBe('test project');
        expect(projects[0].summary).toBe('test summary');
        expect(projects[0].info).toBe('some info');
        expect(projects[0].link).toBe('http://some.location/here');
        expect(projects[0].resourcesUrl).toBe('http://some.location/');

        expect(projects[1].name).toBe('test2');
        expect(projects[1].title).toBe('test project2');
        expect(projects[1].summary).toBe('test2 summary');
        expect(projects[1].info).toBe('some info2');
        expect(projects[1].link).toBe('http://some.location/here/2');
        expect(projects[1].resourcesUrl).toBe('http://some.location/2');
      });
    })
  );
});
