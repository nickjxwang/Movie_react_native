import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
} from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb'

let { width, height } = Dimensions.get('window')
const SearchScreen = () => {
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    let movieName = 'Ant-man and the Wasp: Quantumania'

    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: false,
                language: 'en-US',
                page: '1',
            }).then(data => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false)
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className='flex-1 bg-neutral-800'>
            <View className='flex-row items-center justify-between mx-3 mb-4 border rounded-full border-neutral-500'>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='flex-1 pb-1 pl-6 text-base font-semibold tracking-wider text-white'
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className='p-2 m-1 rounded-full bg-neutral-500'
                >
                    <XMarkIcon size='20' color='white' />
                </TouchableOpacity>
            </View>

            {loading ? (
                <Loading />
            ) : results.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className='space-y-3'
                >
                    <Text className='ml-1 font-semibold text-white'>
                        Results ({results.length})
                    </Text>
                    <View className='flex-row flex-wrap justify-between'>
                        {results.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() =>
                                        navigation.push('Movie', item)
                                    }
                                >
                                    <View className='mb-4 space-y-2'>
                                        <Image
                                            className='rounded-3xl'
                                            // source={require('../assets/images/moviePoster2.png')}
                                            source={{
                                                url:
                                                    image185(
                                                        item?.poster_path
                                                    ) || fallbackMoviePoster,
                                            }}
                                            style={{
                                                width: width * 0.44,
                                                height: height * 0.3,
                                            }}
                                        />
                                        <Text className='ml-1 text-neutral-300'>
                                            {item?.title.length > 20
                                                ? item?.title.slice(0, 20) +
                                                  '...'
                                                : item?.title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </View>
                </ScrollView>
            ) : (
                <View className='flex-row justify-center'>
                    <Image
                        source={require('../assets/images/movieTime.png')}
                        className='w-96 h-96'
                    />
                </View>
            )}
        </SafeAreaView>
    )
}
export default SearchScreen
