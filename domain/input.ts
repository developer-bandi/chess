const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

// createInterface() 메소드를 이용해 객체를 만들고, rl이라는 변수에 저장
const rl = readline.createInterface({ input, output });

class Input {
  private promiseQuery(query: string) {
    return new Promise<string>((resolve, reject) => {
      rl.question(query, (answer: string) => {
        resolve(answer);
      });
    });
  }

  possibleMoveQuery() {
    return this.promiseQuery(
      "가능한 이동경로를 보고자하는 말의 위치를 공백으로 구분하여 입력해주세요(예: 1 2)\n"
    );
  }

  realMoveQuery() {
    return this.promiseQuery("이동하고자 하는 칸을 입력해주세요(예:2 2)\n");
  }

  resultsQuery() {
    return this.promiseQuery("결과를 공백으로 구분하여 넣어주세요\n");
  }

  closeInput() {
    rl.close();
  }
}

export default new Input();
