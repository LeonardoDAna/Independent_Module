import waterMark from './1.md'
import CSSFuture from './css.md'
import test from './test.md'

const list = [
    {
        id: 1,
        path: waterMark,
        name: 'Canvas水印',
        updateTime: '2025-01-22',
        description: '使用Canvas实现添加水印',
        tags: ['js', 'canvas']
    },
    {
        id: 2,
        path: CSSFuture,
        name: 'CSS的未来',
        updateTime: '2025-08-24',
        description: '探索CSS未来的方向',
        tags: ['css']
    },
    {
        id: 3,
        path: test,
        name: '测试md',
        updateTime: '2025-08-24',
        description: '测试',
        tags: []
    },
]

export default list