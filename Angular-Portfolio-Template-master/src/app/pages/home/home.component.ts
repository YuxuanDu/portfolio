import { DataApiService } from './../../services/http/data-api.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  skills;
  featuredProjects;
  workExperience;
  profile;

  showMobileImages = false;

  constructor(
    public dataApi: DataApiService
  ) { }

  @HostListener('window:resize', ['$event'])
  onresize(event): void {
    console.log('WINDOW_RESIZE_EVENT', event);
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    window.innerWidth <= 768
      ? this.showMobileImages = true
      : this.showMobileImages = false;
  }

  async ngOnInit(): Promise<void> {
    this.checkWindowSize();


    this.skills = await this.dataApi.getTopSkills();
    console.log('SKILLS', this.skills);

    this.featuredProjects = await this.dataApi.getFeaturedProjects();
    console.log('PROJECTS', this.featuredProjects);

    this.workExperience = await this.dataApi.getWorkHistory();
    console.log('WORK', this.workExperience);


    this.profile = await this.dataApi.getProfile();
    console.log('PROFILE', this.profile);

  }

  async downloadResume(): Promise<void> {
    window.open('/assets/media/files/resume.pdf', '_blank');
  }

}
