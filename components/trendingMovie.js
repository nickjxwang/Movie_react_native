import { View, Text, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './MovieCard'
import { useNavigation } from '@react-navigation/native'

let { width, height } = Dimensions.get('window')
const TrendingMovie = ({ data }) => {
    const navigation = useNavigation()
    const handlerClick = () => {
        navigation.navigate('Movie', item)
    }

    return (
        <View className='mb-8'>
            <Text className='mx-4 mb-5 text-xl text-white'>Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => (
                    <MovieCard item={item} handlerClick={handlerClick} />
                )}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}
export default TrendingMovie
