import { View, Text, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'
import { theme } from '../theme'

let { width, height } = Dimensions.get('window')
const Loading = () => {
    return (
        <View
            style={{ height, width }}
            className='absolute flex-row items-center justify-center'
        >
            <Progress.CircleSnail
                thickness={12}
                size={160}
                color={theme.background}
            />
        </View>
    )
}

export default Loading
