import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";

const BOLD_REGEX = /\*\*(\S.*?\S)\*\*/g;
const ITALIC_REGEX = /\*([^*\s].*?[^*\s])\*/g;
const UNDERLINE_REGEX = /__(\S.*?\S)__/g;
const COLOR_REGEX = /{(\S.*?\S)}(\w+)/g;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  _script = '';
  displayRows: Array<string>;

  get script() {
    return this._script;
  }

  set script(value) {
    this._script = value;
    console.log('parsing');
    this.parseScript(value);
  }

  ngOnInit() {
    this.displayRows = [];
  }

  parseScript(text) {
    let rows = text.split('-');
    this.displayRows = rows.map(row => {
                          let _row = row
                            .replace(BOLD_REGEX, '<b>$1</b>')
                            .replace(UNDERLINE_REGEX, '<u>$1</u>')
                            .replace(ITALIC_REGEX, '<i>$1</i>');

                          const res = COLOR_REGEX.exec(_row);

                          console.log(res);

                          if(!isNullOrUndefined(res) && !isNullOrUndefined(res[2])) {
                            _row = _row.replace(COLOR_REGEX, `<span class="$2">$1</span>`);
                          }

                          return _row;
                        }).filter(row => row.length > 0);

    // let regexed = BOLD_REGEX.exec(text);
    // console.log("TEXT: ", regexed);
  }
}
