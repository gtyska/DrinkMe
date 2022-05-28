import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  articles: Article[] = [];

  constructor(
    private articlesService: ArticlesService) {
  }


  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    this.articlesService.getArticles().subscribe(
      data => {
        this.articles = data;
        console.log(this.articles);
      }
    )
  }
}
