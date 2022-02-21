import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const { width: ScreenW, height: ScreenH } = Dimensions.get('window')

export const Container = styled.View`
    flex: 1;
    background-color: black;
`

export const Header = styled.View`
    height: 70px;
    width: 100%;
    background-color: red;
`
export const Main = styled.View`
    flex: 1;
    background-color: #1e1e1e;
`
export const Footer = styled.View`
    height: 45px;
    width: 100%;
    background-color: blue;
`
