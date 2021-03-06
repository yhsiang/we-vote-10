const initialState = {
    /* 從 url 對應的議題資料 */
    "marriage-equality" : {
      "title" : "婚姻平權",
      "titleEng" : "marriageEquality",
      "question" : "你是否支持同性婚姻合法化？",
      "statement" : "同性婚姻合法化",
      "slideshows" : [1,2,3,4,5,6,7,8,9,10]
    },
    "recall" : {
      "title" : "罷免",
      "titleEng" : "recall",
      "question" : "你是否支持下修罷免門檻？",
      "statement" : "下修罷免門檻",
      "slideshows" : [11,12,13,14,15,16,17]
    },
    "referendum" : {
      "title" : "公投",
      "titleEng" : "referendum",
      "question" : "你支持公投門檻下修嗎?",
      "statement" : "下修公投門檻",
      "slideshows" : [18,19]
    } 
   
}


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case INCREMENT:
    //   const {count} = state;
    //   return {
    //     count: count + 1
    //   };
    default:
      return state;
  }
}

