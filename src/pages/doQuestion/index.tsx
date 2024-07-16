import {View} from '@tarojs/components'
import {AtButton, AtRadio} from "taro-ui";
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import './index.scss'
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/questions.json";


/**
 * 做题
 */
export default () => {

  //当前题目序号从1开始
  const [current, setCurrent] = useState<number>(1);
  //当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  //当前答案
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  //回答列表
  const [answerList] = useState<string[]>([]);

  const questionOptions: any = currentQuestion.options.map((option) => {
    return {
      label: `${option.key}. ${option.value}`,
      value: option.key,
    };
  });
  //序号变化时，切换题目
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className='doQuestionPage'>
      <View className='at-article__h2 title'> {current},{currentQuestion.title}</View>

      <AtRadio options={questionOptions} value={currentAnswer} onClick={(value) => {
        setCurrentAnswer(value);
        //记录回答
        answerList[current - 1] = value;
      }}
      />
      {(current < questions.length &&
        <AtButton type='primary'
          circle className='controlBtn'
          disabled={!currentAnswer}
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>)}
      {(current >= questions.length && <AtButton type='primary' disabled={!currentAnswer} circle className='controlBtn'
        onClick={() => {
          //跳转到结果页
          Taro.navigateTo({
            url: '/pages/result/index',
          })
        }}
      >
        查看结果
      </AtButton>)}
      {current > 1 && (
        <AtButton
          size='normal'
          className='controlBtn'
          circle
          onClick={() => {
            setCurrent(current - 1);
          }}
        >
          上一题
        </AtButton>
      )}
      <GlobalFooter></GlobalFooter>
    </View>
  )
}

