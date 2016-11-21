import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})

export class LogComponent implements OnInit {
  log: any;

  constructor() {
    this.log = '<sample log message>\n<sample log message 2>';
  }

  ngOnInit() {
  }

}
