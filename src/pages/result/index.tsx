import {View, Image} from '@tarojs/components'
import Taro from "@tarojs/taro";
import { AtButton} from 'taro-ui'
import headerBg from "../../assets/headerBg.jpg"
import './index.scss'
import GlobalFooter from "../../components/GlobalFooter";
import questionResult from "../../data/question_results.json";
/**
 * 测试结果页
 */
export default () => {
  const result = questionResult[0];

  return (
    <View className='resultPage'>
      <View className='at-article__h1 title'>MBTI 性格测试</View>
      <View className='at-article__h2 subTitle' >
        {result.resultDesc}
      </View>
      <AtButton type='primary' circle className='enterBtn'
        onClick={()=>{
        Taro.reLaunch({
          url: 'pages/index/index',
        })
      }}
      >
        返回主页
      </AtButton>
      <Image
        className='headerBg'
        src={headerBg}
      />
      <GlobalFooter></GlobalFooter>
    </View>
  )
}

