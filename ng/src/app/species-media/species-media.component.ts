import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {PhotoOutPut} from "./species-media";
import {SpeciesMediaService} from "./species-media.service";

@Component({
  selector: 'app-species-media',
  templateUrl: './species-media.component.html',
  styleUrls: ['./species-media.component.scss']
})
export class SpeciesMediaComponent implements OnInit, OnChanges {

  speciesPhotos: PhotoOutPut[];

  @Input()
  searchName : string;

  @Input()
  userId : string;

  constructor(config: NgbCarouselConfig, private service: SpeciesMediaService, private sanitizer : DomSanitizer) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const searchName = changes['searchName'].currentValue || changes['searchName'].previousValue;
    const userId = changes['userId'].currentValue || changes['userId'].previousValue;
    const tagsArr = searchName.toString().split(" "); //split name into tags array: ["lille","flagspætte"]
    this.service.getByUser(userId,tagsArr).subscribe((data : PhotoOutPut[]) => {
      data.forEach(ph => {
        ph.picture = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + ph.base64Str);
      });
      this.speciesPhotos = data;
    });

  }

}
