class InputError {
  checkInputIsTwoNumberWithSpace(input: string) {
    const inputToArray = input.split(" ").map(Number);
    if (inputToArray.find(isNaN)) return "숫자만 입력해주세요";
    if (inputToArray.length !== 2) return "2개의 숫자를 입력해주세요";
    return inputToArray;
  }
}

export default InputError;
