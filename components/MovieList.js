import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
} from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'

let { width, height } = Dimensions.get('window')

const MovieList = ({ title, data, hideSeeAll }) => {
    let movieName = 'Ant-man and the Wasp: Quantumania'
    const navigation = useNavigation()
    return (
        <View className='mb-8 space-y-4'>
            <View className='flex-row items-center justify-between mx-4'>
                <Text className='text-xl text-white'>{title}</Text>
                <TouchableOpacity>
                    {!hideSeeAll && (
                        <Text style={styles.text} className='text-xl'>
                            See All
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item)}
                        >
                            <View className='mr-4 space-y-1'>
                                <Image
                                    source={require('../assets/images/moviePoster2.png')}
                                    className='rounded-3xl'
                                    style={{
                                        width: width * 0.33,
                                        height: height * 0.22,
                                    }}
                                />
                                <Text className='ml-1 text-neutral-300'>
                                    {movieName.length > 14
                                        ? movieName.slice(0, 14) + '...'
                                        : movieName}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
        </View>
    )
}
export default MovieList
