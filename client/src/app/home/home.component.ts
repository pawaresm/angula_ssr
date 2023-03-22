import { isPlatformBrowser } from '@angular/common';
import { GetDataService } from './../service/get-data.service';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  listData: any
  isLoading = false
  constructor(private service: GetDataService, @Inject(PLATFORM_ID) private platformId: object, private title: Title, private meta: Meta) {
    // if(    isPlatformBrowser(platformId)){
    //   let res = window.location.href
    // }

  }
  ngOnInit(): void {



    this.loadData()


    // title: กำหนดชื่อหน้าเว็บไซต์ แนะนำให้มีความสั้นและกระชับไม่เกิน 60 ตัวอักษร
    // description: อธิบายเนื้อหาหน้าเว็บไซต์ แนะนำให้มีความยาวไม่เกิน 155 ตัวอักษร
    // keywords: ระบุคำสำคัญที่เกี่ยวข้องกับหน้าเว็บไซต์ แนะนำให้ใช้ไม่เกิน 10 คำ และไม่เติมคำที
    this.title.setTitle('MY HOME');
    this.meta.addTags([
      { name: 'keywords', content: 'MY HOME keywords' },
      { name: 'description', content: 'MY HOME' },
      { name: 'og:title', content: 'ชื่อเว็บไซต์' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'URL ของเว็บไซต์' },
      { name: 'og:image', content: 'https://images.unsplash.com/photo-1626314928277-1d373ddb6428?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60' },
      { name: 'og:description', content: 'คำอธิบายเว็บไซต์' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ชื่อผู้ใช้ Twitter' },
      { name: 'twitter:title', content: 'ชื่อเว็บไซต์' },
      { name: 'twitter:description', content: 'คำอธิบายเว็บไซต์' },
      { name: 'twitter:image', content: 'https://images.unsplash.com/photo-1626314928277-1d373ddb6428?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60' },
    ]);

  }
  async loadData() {
    //  this.service.getData1().then((res)=>{
    //   console.log('res',res);
    //   this.listData = res.slice(0,10)
    // })
    this.isLoading = true



    let res1 = await this.managementData()
    this.listData = res1
    setTimeout(() => {
      this.isLoading = false
    }, 1000);

  }
  async managementData() {
    let data = []

    let res: any = await this.service.getData2()

    for await (const iterator of res) {
      data.push({ ...iterator })
    }
    return data
  }
}
