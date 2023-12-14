import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
    Image,
} from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'

let { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-3'

const MovieScreen = () => {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [isFavorite, setIsFavorite] = useState(false)
    const [cast, setCast] = useState([1, 2, 3, 4, 5])
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5])
    let movieName = 'Ant-man and the Wasp: Quantumania'

    useEffect(() => {}, [item])
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'
        >
            <View className='w-full'>
                <SafeAreaView
                    className={
                        'absolute z-20 flex-row items-center justify-between w-full px-4' +
                        topMargin
                    }
                >
                    <TouchableOpacity
                        style={styles.background}
                        className='p-1 rounded-xl'
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeftIcon
                            size='28'
                            strokeWidth={2.5}
                            color='white'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <HeartIcon
                            size='35'
                            color={isFavorite ? theme.background : 'white'}
                        />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Image
                        source={require('../assets/images/moviePoster2.png')}
                        style={{ width, height: height * 0.55 }}
                    />
                    <LinearGradient
                        colors={[
                            'transparent',
                            'rgba(23, 23, 23, 0.8)',
                            'rgba(23, 23, 23, 1)',
                        ]}
                        style={{ width, height: height * 0.4 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className='absolute bottom-0'
                    />
                </View>
            </View>

            <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
                <Text className='text-3xl font-bold tracking-widest text-center text-white'>
                    {movieName}
                </Text>
                <Text className='text-base font-semibold text-center text-neutral-400'>
                    Released • 2020 • 170 min
                </Text>
                <View className='flex-row justify-center mx-4 space-x-2'>
                    <Text className='text-base font-semibold text-center text-neutral-400'>
                        Action •
                    </Text>
                    <Text className='text-base font-semibold text-center text-neutral-400'>
                        Thrill •
                    </Text>
                    <Text className='text-base font-semibold text-center text-neutral-400'>
                        Comedy
                    </Text>
                </View>
                <Text className='mx-4 tracking-wide text-neutral-400'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Enim ipsum vitae accusantium molestiae qui porro ea quos
                    libero, esse eaque iusto totam mollitia, laborum possimus?
                    Sit, nostrum. Sint, cumque ut!
                </Text>
            </View>

            <Cast navigation={navigation} cast={cast} />

            <MovieList
                title='Similar Movies'
                hideSeeAll={true}
                data={similarMovies}
            />
        </ScrollView>
    )
}
export default MovieScreen