import { GetDataService } from './../service/get-data.service';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  listData:any
  constructor(private activatedRoute: ActivatedRoute,private service:GetDataService ,private title: Title, private meta: Meta) {}
  ngOnInit(): void {
     this.activatedRoute.paramMap.subscribe((p:any)=>this.loadData(p.params.id))


  }
  async loadData(id:number){
    // console.log('window.location.href',window.location.href);
     this.service.getById1(id).then((response)=>{

        this.listData = response
      this.title.setTitle(this.listData?.title);
      this.meta.addTags([
        { name: 'keywords', content: this.listData?.title },
        { name: 'description', content: this.listData?.title },
        { name: 'og:title', content: this.listData?.title},
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: 'URL ของเว็บไซต์' },
        { name: 'og:image',content: 'https://images.unsplash.com/photo-1626314928277-1d373ddb6428?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60' },
        { name: 'og:description', content: this.listData?.title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: this.listData?.title },
        { name: 'twitter:title', content: this.listData?.title },
        { name: 'twitter:description', content: this.listData?.title },
        { name: 'twitter:image', content: 'https://images.unsplash.com/photo-1626314928277-1d373ddb6428?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60' },
      ]);


     })

}

}
