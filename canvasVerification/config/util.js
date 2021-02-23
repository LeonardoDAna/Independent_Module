export default {
    fmtNumber2CN(num) {
      return "零壹贰叁斯伍陆柒捌玖拾"[num];
    },
    fmtNumber2EN(num) {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num];
    },
    fmtSubjectType(num) {
      return ['单选题','多选题','判断题','论述题'][num]
    },
    fmtTandF(num){
      return ['错','对'][num]
    },
    fmtDuoXuan(arr){
      return arr.toString()
    }
  }