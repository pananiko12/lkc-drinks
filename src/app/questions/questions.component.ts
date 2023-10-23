import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questionData:any;
  url: string ="";
  avatarChosen: any;
  question: string="";
  answer1: string="";
  answer2: string="";
  answer3: string="";
  questionStep: number=1;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute ){
  }

  ngOnInit(){
    this.fetchQuestions();
  }

  private fetchQuestions(){
    this.avatarChosen=this.route.snapshot.params['id'];
    if(this.avatarChosen==1){
      this.url="/assets/questionsSmoke.json"
    }else if(this.avatarChosen==2){
      this.url="/assets/questionsWildBird.json"
    }else if(this.avatarChosen==3){
      this.url="/assets/questionsWonders.json"
    }else{
      this.url="/assets/questionsLadies.json"
    }
    this.http.get(this.url).subscribe(res => {
      this.questionData = res;
      this.question=this.questionData[0].question;
      this.answer1=this.questionData[0].answer1;
      this.answer2=this.questionData[0].answer2;
      this.answer3=this.questionData[0].answer3;
      for(let q of this.questionData){
        console.log(q.question);
      }
      console.log(this.questionData);
    });
  }
  nextQuestion(id: number){
    this.question=this.questionData[id].question;
    this.answer1=this.questionData[id].answer1;
    this.answer2=this.questionData[id].answer2;
    this.answer3=this.questionData[id].answer3;
  };
  submitAnswer(id: number){
    if(this.questionStep<6){
      console.log("question step: "+this.questionStep);
      this.nextQuestion(this.questionStep);
    }else{
      this.router.navigate(['/reports'])
    }
      this.questionStep=this.questionStep+1;
  }
}
