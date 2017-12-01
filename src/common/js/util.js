export function shuffle(arr) {
    //slice()方法不传参数，将返回数组的一个浅拷贝
    //防止影响传入的 arr 原数据
    //同样实现的，还有concat()方法
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = Math.floor(Math.random() * (i + 1))
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}