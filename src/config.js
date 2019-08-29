export const systemList = [{
    name: '底盘系统',
    id: 1,
    child: [{
        name: '动力系统',
        id: 2
      },
      {
        name: '传动系统',
        id: 3
      },
      {
        name: '行驶系统',
        id: 4

      },
      {
        name: '转向系统',
        id: 5
      },
      {
        name: '制动系统',
        id: 6
      },
      {
        name: '车身系统',
        id: 7
      },
      {
        name: '电气系统',
        id: 8
      }
    ]
  },
  {
    name: '上装系统',
    id: 2,
    child: []
  },
  {
    name: '下装系统',
    id: 3,
    child: []
  }
]

// 开发模式: 1, 上线改为 2
export const DEV_MODEL = 2