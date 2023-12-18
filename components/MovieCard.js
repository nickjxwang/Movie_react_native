import {
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    Image,
} from 'react-native'
import { image500 } from '../api/moviedb'

let { width, height } = Dimensions.get('window')

const MovieCard = ({ item, handlerClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handlerClick(item)}>
            <Image
                // source={`require('../assets/images/moviePoster1.png')`}
                source={{ url: image500(item.poster_path) }}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
    )
}
export default MovieCard
