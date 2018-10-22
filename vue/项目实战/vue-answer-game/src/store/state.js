const state = {
    allTime: 0, // 答题总共耗时
    timer: null, // 计时器
    answerArr: [], // 用户的答案索引
    itemNum: 1, // 当前是第几题
    questionList: [ // 题库
        { 
            title: '什么人始终不敢洗澡？',
            choose: ['泥人', '和尚', '稻草人', '猿人'],
            answer: 0, // 标准答案
            itemIndex: 1 // 当前题目索引
        },
        { 
            title: '口吃的人最吃亏的是？',
            choose: ['饭', '讨价还价', '骂街', '打国际长途电话'],
            answer: 3, // 标准答案
            itemIndex: 2 // 当前题目索引
        },
        { 
            title: '海明威在移居到哪个国家以后创作了小说《老人与海》？',
            choose: ['印尼', '古巴', '美国', '中东'],
            answer: 1, // 标准答案
            itemIndex: 3 // 当前题目索引
        },
        { 
            title: '中国最早的啤酒厂和啤酒品牌都来自哪个城市？',
            choose: ['青岛', '黑龙江', '哈尔滨', '大连'],
            answer: 2, // 标准答案
            itemIndex: 4 // 当前题目索引
        }
    ]
}

export default state