const cfgSchema = {
  other: {
    title: '其他设置',
    cfg: {
      renderScale: {
        title: '渲染精度',
        type: 'number',
        desc: '可选值50~200，建议100。设置高精度会提高图片的精细度，但因图片较大可能会影响渲染与发送速度',
        def: 100
      }
    }
  }
}

export default cfgSchema
