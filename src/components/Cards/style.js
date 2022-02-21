import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
const { width: ScreenW, height: ScreenH } = Dimensions.get('window')

export const Container = styled.View`
    flex: 1;
` 

export const LimitScroll = styled.View`
    width: ${ScreenW}px;
    height: 100px;
    background: black;
    background-color: black;
    flex-direction: column;
    padding: 10px;
    overflow: scroll;
    align-items: center;
`

export const MainViewText = styled.ScrollView`
`
export const MainText = styled.Text`
    color: white;
    text-align: center;
    font-size: 16px;
`
export const MainViewName = styled.View`
    width: ${ScreenW}px;
    height: 30px;
    justify-content: center;
    align-items: center;
    background: black;
    background-color: black;
    flex-direction: row;
`