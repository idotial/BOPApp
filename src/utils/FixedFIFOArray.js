//@flow
export default class FIFORing {
  list: Array<any> = []
  size: number
  constructor(array: Array<any>, size: number) {
    this.list = array
    this.size = size
  }

  push = (element: any) => {
    this.list.push(element)
    if (this.list.length > this.size) {
      this.list.shift()
    }
  }

  copyElementAt = (index: number) => {
    if (index < this.list.length) {
      return JSON.parse(JSON.stringify(this.list[index])) //给state使用，尽量用copy
    }
  }

  getArrayCopy = () => {
    return JSON.parse(JSON.stringify(this.list));
  }

  getArrayCopyFromIndexWithInterval = (interval:number, index:number=0) => {
    var arr = []
    if (index < this.list.length) {
      arr.push(this.list[index])
      index+=interval
    }
    return JSON.parse(JSON.stringify(arr));
  }

  clear = () => {
    this.list.length = 0
  }
}
